// One basketball master and one generator for every supported platform.
// Uses the existing Python/Pillow toolchain; never installs dependencies.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const result = spawnSync(process.execPath, [fileURLToPath(new URL('./run-python.mjs', import.meta.url)), fileURLToPath(new URL('./generate-all-sheesshh-icons.py', import.meta.url))], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
