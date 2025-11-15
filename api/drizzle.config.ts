import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

const envCandidates = [
  path.join(__dirname, '.env'),
  path.join(__dirname, '.env.local'),
  path.join(__dirname, '..', '.env'),
  path.join(__dirname, '..', '.env.local'),
  path.join(__dirname, '..', '..', '.env'),
];

let envLoaded = false;

for (const candidate of envCandidates) {
  if (fs.existsSync(candidate)) {
    // Stop at the first env file we can find so local overrides come first.
    dotenv.config({ path: candidate });
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  dotenv.config();
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/**/*.db.ts',
  out: './drizzle',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
