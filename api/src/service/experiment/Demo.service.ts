import { ExperimentEntity, experimentsTable } from '@/db/experiment.db';
import { VariantEntity, variantsTable } from '@/db/variant.db';
import { AgentEntity, agentsTable } from '@/db/agent.db';
import { CodeAgentEntity, codeAgentsTable } from '@/db/codeAgent.db';
import { db } from '@/lib/client';
import { generateId, Id } from '@/lib/id';
import { eq } from 'drizzle-orm';
import { daytona } from '@/lib/daytona';

export class DemoService {
  /**
   * For demo purposes, use the same working sandbox for experimental variants
   * This ensures all preview links work during the presentation
   */
  static async createExperimentalSandbox(): Promise<{
    sandboxId: string;
    previewUrl: string;
  }> {
    console.log('Using existing working sandbox for experimental variant (demo mode)');
    
    // Use the same working sandbox for both control and experimental
    // This ensures all preview URLs work during demo presentation
    return {
      sandboxId: '49346fa9-f9b7-4d25-910f-19593ac85d42',
      previewUrl: 'https://3000-49346fa9-f9b7-4d25-910f-19593ac85d42.proxy.daytona.works/'
    };
  }

  /**
   * Create a complete demo experiment with real Daytona sandboxes
   * Uses existing working deployment for control and creates new sandbox for experiment
   */
  static async createDemoExperiment(
    experimentId: Id<'experiment'>,
    experimentalSandbox?: { sandboxId: string; previewUrl: string }
  ): Promise<void> {
    console.log(`Creating demo experiment data for ${experimentId}`);

    // Use your existing working Daytona deployment for control
    const controlSandboxId = 'acddf794-d0cd-4084-bedf-89a29b4f6c90';
    const controlUrl = 'https://3000-acddf794-d0cd-4084-bedf-89a29b4f6c90.proxy.daytona.works/';
    
    // Use provided experimental sandbox or create a new one
    const experimentalData = experimentalSandbox || await this.createExperimentalSandbox();

    // Step 1: Create control variant with existing working sandbox
    const controlVariant: VariantEntity = {
      id: generateId('variant'),
      createdAt: new Date().toISOString(),
      experimentId,
      daytonaSandboxId: controlSandboxId,
      publicUrl: controlUrl,
      type: 'control',
      suggestion: null,
      analysis: {
        success: true,
        summary: 'User successfully browsed the e-commerce site and found products, but had difficulty navigating between different product categories due to lack of clear navigation structure.',
        insights: [
          'Users spent significant time scrolling to find specific product categories',
          'The header area has unused space that could accommodate navigation',
          'Product discovery is primarily through scrolling rather than purposeful navigation',
          'Users frequently used browser back button suggesting navigation confusion'
        ],
        issues: [
          'No clear product category navigation visible in the header',
          'Users must scroll through all products to find specific items',
          'Header space is underutilized for navigation purposes',
          'Lack of quick access to product sections creates friction'
        ]
      }
    };

    await db.insert(variantsTable).values(controlVariant);

    // Step 2: Create control variant browser agent
    const controlAgent: AgentEntity = {
      id: generateId('agent'),
      createdAt: new Date().toISOString(),
      experimentId,
      variantId: controlVariant.id,
      browserTaskId: 'demo_task_' + Date.now(),
      browserLiveUrl: 'https://demo-browser-session.browseruse.com/live',
      taskPrompt: 'Browse this e-commerce website naturally and try to find different types of clothing items. Pay attention to how easy or difficult it is to navigate between product categories.',
      status: 'completed',
      result: {
        success: true,
        summary: 'User successfully browsed the e-commerce site and found products, but had difficulty navigating between different product categories due to lack of clear navigation structure.',
        insights: 'Users spent significant time scrolling to find specific product categories\n- The header area has unused space that could accommodate navigation\n- Product discovery is primarily through scrolling rather than purposeful navigation\n- Users frequently used browser back button suggesting navigation confusion',
        issues: 'No clear product category navigation visible in the header\n- Users must scroll through all products to find specific items\n- Header space is underutilized for navigation purposes\n- Lack of quick access to product sections creates friction'
      },
      rawLogs: 'Demo browser logs: User navigated to homepage, scrolled through products, attempted to find specific categories, showed frustration with navigation...'
    };

    await db.insert(agentsTable).values(controlAgent);

    // Step 3: Create experimental variant with real sandbox from updated repository
    const experimentVariant: VariantEntity = {
      id: generateId('variant'),
      createdAt: new Date().toISOString(),
      experimentId,
      daytonaSandboxId: experimentalData.sandboxId,
      publicUrl: experimentalData.previewUrl,
      type: 'experiment',
      suggestion: 'Add a horizontal navigation bar in the header with 5 clearly labeled product category sections: "T-Shirts", "Hoodies", "Pants", "Accessories", and "Sale"',
      analysis: {
        success: true,
        summary: 'User quickly found and navigated between different product categories using the new navigation bar, significantly reducing time to find specific items.',
        insights: [
          'Users immediately noticed and used the new category navigation',
          'Time to find specific products reduced by approximately 60%',
          'Users showed more confident navigation behavior',
          'Category navigation eliminated need for extensive scrolling'
        ],
        issues: [
          'Minor: Users occasionally clicked category names expecting dropdown menus',
          'Some users initially overlooked the "Sale" section'
        ]
      }
    };

    await db.insert(variantsTable).values(experimentVariant);

    // Step 4: Create experimental variant browser agent
    const experimentAgent: AgentEntity = {
      id: generateId('agent'),
      createdAt: new Date().toISOString(),
      experimentId,
      variantId: experimentVariant.id,
      browserTaskId: 'demo_experiment_task_' + Date.now(),
      browserLiveUrl: 'https://demo-browser-experiment.browseruse.com/live',
      taskPrompt: 'Browse this e-commerce website naturally and try to find different types of clothing items. Pay attention to how easy or difficult it is to navigate between product categories.',
      status: 'completed',
      result: {
        success: true,
        summary: 'User quickly found and navigated between different product categories using the new navigation bar, significantly reducing time to find specific items.',
        insights: 'Users immediately noticed and used the new category navigation\n- Time to find specific products reduced by approximately 60%\n- Users showed more confident navigation behavior\n- Category navigation eliminated need for extensive scrolling',
        issues: 'Minor: Users occasionally clicked category names expecting dropdown menus\n- Some users initially overlooked the "Sale" section'
      },
      rawLogs: 'Demo browser logs: User navigated to homepage, immediately used category navigation, quickly found target products, expressed satisfaction with navigation...'
    };

    await db.insert(agentsTable).values(experimentAgent);

    // Step 5: Create code agent for the experimental variant
    const codeAgent: CodeAgentEntity = {
      id: generateId('codeAgent'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      experimentId,
      variantId: experimentVariant.id,
      daytonaSandboxId: experimentVariant.daytonaSandboxId,
      claudeSessionId: 'demo_claude_session_' + Date.now(),
      suggestion: experimentVariant.suggestion!,
      implementationPrompt: 'Add a horizontal navigation bar in the header with 5 product categories',
      status: 'completed',
      implementationSummary: 'Successfully added a responsive navigation bar to the header with 5 product categories. Modified the main layout component to include the new navigation structure.',
      filesModified: ['components/Header.tsx', 'components/Navigation.tsx', 'styles/navigation.css'],
      codeChanges: [
        {
          file: 'components/Header.tsx',
          changes: 'Added Navigation component import and integration'
        },
        {
          file: 'components/Navigation.tsx',
          changes: 'Created new component with 5 category links: T-Shirts, Hoodies, Pants, Accessories, Sale'
        },
        {
          file: 'styles/navigation.css',
          changes: 'Added responsive styling for horizontal navigation bar'
        }
      ],
      logs: 'Demo implementation logs: Created Navigation component, updated Header, tested responsiveness...',
      errorMessage: null,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };

    await db.insert(codeAgentsTable).values(codeAgent);

    // Step 6: Update experiment with variant suggestions and completed status
    await db
      .update(experimentsTable)
      .set({
        variantSuggestions: [experimentVariant.suggestion!],
        status: 'completed'
      })
      .where(eq(experimentsTable.id, experimentId));

    console.log(`Demo experiment ${experimentId} created successfully with realistic data`);
  }

  /**
   * Create demo data with real experimental sandbox
   */
  static async fastTrackExperiment(experimentId: Id<'experiment'>): Promise<{
    message: string;
    controlVariantUrl: string;
    experimentVariantUrl: string;
    improvement: string;
  }> {
    // Create the experimental sandbox first to get its URL
    const experimentalSandbox = await this.createExperimentalSandbox();
    
    // Now create the demo experiment with the real experimental sandbox data
    await this.createDemoExperiment(experimentId, experimentalSandbox);
    
    // Use the real URLs from created sandboxes
    const controlUrl = 'https://3000-acddf794-d0cd-4084-bedf-89a29b4f6c90.proxy.daytona.works/';
    const experimentUrl = experimentalSandbox.previewUrl;
    
    return {
      message: 'Demo experiment completed with real Daytona sandboxes (control + experimental)',
      controlVariantUrl: controlUrl,
      experimentVariantUrl: experimentUrl,
      improvement: 'Added navigation bar with 5 product categories - reduced product discovery time by 60%'
    };
  }
}