import { path7za } from '7zip-bin';
import { execSync } from 'node:child_process';

const output = execSync(`"${path7za}" l Sheesshh-Workspace-v0.5.2-windows-x64-setup.exe`, { encoding: 'utf8' });
console.log(output.split('\n').slice(0, 40).join('\n'));
