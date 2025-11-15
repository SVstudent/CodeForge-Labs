import { init, GalileoLogger } from 'galileo';
import { env } from '@/lib/env';

/**
 * Initialize Galileo AI observability if API key is configured
 */
export function initGalileo() {
  if (!env.GALILEO_API_KEY) {
    console.log('Galileo API key not configured, skipping observability setup');
    return false;
  }

  try {
    const config: {
      projectName?: string;
      logStreamName?: string;
    } = {};

    if (env.GALILEO_PROJECT) {
      config.projectName = env.GALILEO_PROJECT;
    }

    if (env.GALILEO_LOG_STREAM) {
      config.logStreamName = env.GALILEO_LOG_STREAM;
    }

    init(config);

    console.log(
      `Galileo observability initialized for project: ${env.GALILEO_PROJECT || 'default'}, log stream: ${env.GALILEO_LOG_STREAM || 'default'}`
    );
    return true;
  } catch (error) {
    console.error('Failed to initialize Galileo:', error);
    return false;
  }
}

/**
 * Create a Galileo logger for a specific project and log stream
 */
export function createGalileoLogger(options?: {
  projectName?: string;
  logStreamName?: string;
}): GalileoLogger | null {
  if (!env.GALILEO_API_KEY) {
    return null;
  }

  try {
    return new GalileoLogger({
      projectName: options?.projectName || env.GALILEO_PROJECT,
      logStreamName: options?.logStreamName || env.GALILEO_LOG_STREAM,
    });
  } catch (error) {
    console.error('Failed to create Galileo logger:', error);
    return null;
  }
}

/**
 * Check if Galileo is enabled
 */
export function isGalileoEnabled(): boolean {
  return !!env.GALILEO_API_KEY;
}
