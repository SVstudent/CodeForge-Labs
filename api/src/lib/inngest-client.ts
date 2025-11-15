import { Inngest } from 'inngest';
import { env } from '@/lib/env';

export const inngestClient = new Inngest({
	id: 'hacksprint-api',
	eventKey: env.INNGEST_EVENT_KEY,
});
