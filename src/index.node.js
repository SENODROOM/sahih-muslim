// Node ESM entry
import fs   from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import { Muslim } from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadData() {
  const gzPath   = path.join(__dirname, '..', 'data', 'muslim.json.gz');
  const jsonPath = path.join(__dirname, '..', 'data', 'muslim.json');
  if (fs.existsSync(gzPath))   return JSON.parse(zlib.gunzipSync(fs.readFileSync(gzPath)).toString('utf8'));
  if (fs.existsSync(jsonPath)) return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  throw new Error('Data file not found. Expected data/muslim.json.gz or data/muslim.json');
}
export { Muslim };
export default new Muslim(loadData());
