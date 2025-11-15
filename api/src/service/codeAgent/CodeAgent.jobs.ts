import { ExperimentEntity } from '@/db/experiment.db';
import { VariantEntity, variantsTable } from '@/db/variant.db';
import { CodeAgentEntity, codeAgentsTable } from '@/db/codeAgent.db';
import { inngestClient } from '@/lib/inngest-client';
import { CodeAgentService } from '@/service/codeAgent/CodeAgent.service';
import { db } from '@/lib/client';
import { generateId, Id } from '@/lib/id';
import { env } from '@/lib/env';
import { eq } from 'drizzle-orm';

export interface ImplementVariantJobData {
  experimentId: Id<'experiment'>;
  suggestion: string;
  repoUrl: string;
  goal: string;
}

const IMPLEMENT_VARIANT_JOB_ID = 'implement-variant';

export const implementVariantJob = inngestClient.createFunction(
  { id: IMPLEMENT_VARIANT_JOB_ID, concurrency: 3 },
  { event: 'variant/implement' },
  async ({ event, step }) => {
    const { experimentId, suggestion, repoUrl, goal } =
      event.data as ImplementVariantJobData;

    console.log(
      `Starting variant implementation for experiment ${experimentId}: ${suggestion}`
    );

    // Step 1: Create new sandbox for variant
    const sandboxResult = await step.run('create-variant-sandbox', async () => {
      console.log(`Creating variant sandbox for experiment ${experimentId}`);

      const result = await CodeAgentService.createVariantSandbox(
        repoUrl,
        experimentId,
        suggestion
      );

      console.log(`Variant sandbox created: ${result.sandboxId}`);
      return result;
    });

    // Step 2: Create variant entity in database
    const variant = await step.run('create-variant-entity', async () => {
      console.log('Creating variant entity in database');

      const newVariant: VariantEntity = {
        id: generateId('variant'),
        createdAt: new Date().toISOString(),
        experimentId,
        daytonaSandboxId: sandboxResult.sandboxId,
        publicUrl: sandboxResult.previewUrl,
        type: 'experiment',
        suggestion,
        analysis: null,
      };

      await db.insert(variantsTable).values(newVariant);

      console.log(`Variant entity created: ${newVariant.id}`);
      return newVariant;
    });

    // Step 3: Generate implementation prompt and create code agent
    const codeAgentResult = await step.run('create-code-agent', async () => {
      console.log('Generating implementation prompt for Claude Code');

      const implementationPrompt =
        CodeAgentService.generateImplementationPrompt(suggestion, goal);

      const codeAgent = await CodeAgentService.createCodeAgent({
        experimentId,
        variantId: variant.id,
        daytonaSandboxId: sandboxResult.sandboxId,
        suggestion,
        implementationPrompt,
      });

      console.log(`Code agent created: ${codeAgent.id}`);
      return {
        codeAgent,
        implementationPrompt,
      };
    });

    // Step 4: Spawn Claude Code agent to implement changes
    const claudeSession = await step.run('spawn-claude-agent', async () => {
      console.log(
        `Spawning Claude Code agent in sandbox ${sandboxResult.sandboxId}`
      );

      const apiUrl = env.CODE_AGENT_CALLBACK_URL;

      if (!apiUrl) {
        throw new Error(
          'CODE_AGENT_CALLBACK_URL is not configured. Please set an externally reachable URL for the API so Claude Code agents can report results.'
        );
      }

      console.log(`Using callback URL: ${apiUrl}`);
      console.log(`Claude prompt: ${codeAgentResult.implementationPrompt.substring(0, 200)}...`);

      const result = await CodeAgentService.spawnClaudeCodeAgent(
        sandboxResult.sandboxId,
        codeAgentResult.codeAgent.id,
        suggestion,
        goal,
        apiUrl
      );

      console.log(`Claude session initiated: ${result.claudeSessionId}`);
      return result;
    });

    // Step 5: Monitor Claude Code implementation
    const implementationResult = await step.run(
      'monitor-implementation',
      async () => {
        console.log(
          `Monitoring Claude Code agent: ${codeAgentResult.codeAgent.id}`
        );
        console.log('Waiting for Claude Code script to complete...');

        // Poll the database to check if the script has updated the code agent
        // The script running in the sandbox will POST results to /code-agent/:id/results
        const result = await CodeAgentService.monitorClaudeProgress(
          codeAgentResult.codeAgent.id,
          9 * 60 * 1000 // 9 minutes timeout (tripled from 3 minutes)
        );

        if (result.status === 'failed') {
          console.error(`Implementation failed: ${result.error}`);
          throw new Error(`Claude Code implementation failed: ${result.error}`);
        }

        console.log(`Implementation completed: ${result.summary}`);
        console.log(
          `Files modified: ${result.filesModified?.join(', ') || 'none'}`
        );
        return result;
      }
    );

    console.log(
      `Variant implementation completed for experiment ${experimentId}`
    );
    console.log(`Variant ID: ${variant.id}, URL: ${sandboxResult.previewUrl}`);

    // TODO: Next step would be to trigger browser agent test on this new variant
    // await inngestClient.send({
    //   name: 'agent/test-variant',
    //   data: { variantId: variant.id, goal, url: previewResult.previewUrl }
    // });
  }
);

/**
 * Helper function to trigger variant implementation
 */
export const triggerVariantImplementation = async (
  data: ImplementVariantJobData
) => {
  await inngestClient.send({
    name: 'variant/implement',
    data,
  });
};
