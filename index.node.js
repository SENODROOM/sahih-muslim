// Node ESM entry — auto-loads muslim.json from disk
// Works in: Node.js ESM (type:module), Next.js API routes, Astro SSR, etc.

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Muslim } from './index.js';

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const muslimData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'bin', 'muslim.json'), 'utf8')
);

const muslim = new Muslim(muslimData);

export { Muslim };
export default muslim;
