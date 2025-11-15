import z from 'zod';

export const envSchema = z.object({
  DAYTONA_API_KEY: z.string().min(1),
  BROWSER_USE_API_KEY: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
  INNGEST_EVENT_KEY: z.string().min(1),
  CODE_AGENT_CALLBACK_URL: z.string().min(1),
  // Galileo - optional for AI observability
  GALILEO_API_KEY: z.string().optional(),
  GALILEO_CONSOLE_URL: z.string().optional(),
  GALILEO_PROJECT: z.string().optional(),
  GALILEO_LOG_STREAM: z.string().optional(),
});

export const env = envSchema.parse(process.env);
