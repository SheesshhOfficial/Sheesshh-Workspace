import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { chromium } from '@playwright/test';
import { execSync } from 'node:child_process';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="Sheesshh">
  <defs>
    <!-- Background Radial Gradient: deep space obsidian with violet core -->
    <radialGradient id="bgGlow" cx="50%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#1f183d"/>
      <stop offset="55%" stop-color="#0c0d16"/>
      <stop offset="100%" stop-color="#06070c"/>
    </radialGradient>

    <!-- Subtle Premium Border Gradient -->
    <linearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.65"/>
      <stop offset="45%" stop-color="#6366f1" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.7"/>
    </linearGradient>

    <!-- Main Vibrant Ribbon Gradient -->
    <linearGradient id="sGrad" x1="0.1" y1="0.1" x2="0.9" y2="0.9">
      <stop offset="0%" stop-color="#e879f9"/>
      <stop offset="22%" stop-color="#a855f7"/>
      <stop offset="60%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>

    <!-- Ambient Underglow -->
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="22" result="blur"/>
    </filter>

    <!-- Crisp Subtle Glow Filter -->
    <filter id="crispGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Base Container -->
  <rect width="512" height="512" rx="116" fill="url(#bgGlow)"/>
  <rect x="2.5" y="2.5" width="507" height="507" rx="113.5" fill="none" stroke="url(#borderGrad)" stroke-width="3"/>

  <!-- Ambient Underglow -->
  <path d="M362 148H206c-54 0-82 65-32 95l164 46c48 26 24 65-30 65H152" fill="none" stroke="url(#sGrad)" stroke-width="66" stroke-linecap="round" stroke-linejoin="round" filter="url(#softGlow)" opacity="0.45"/>

  <!-- Main Sheesshh 'S' Body -->
  <path d="M362 148H206c-54 0-82 65-32 95l164 46c48 26 24 65-30 65H152" fill="none" stroke="url(#sGrad)" stroke-width="52" stroke-linecap="round" stroke-linejoin="round" filter="url(#crispGlow)"/>

  <!-- Inner Core 3D Light Specular Ribbons -->
  <path d="M352 148H206c-38 0-60 46-24 68" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.75"/>
  <path d="M160 354h146c38 0 60-46 24-68" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.6"/>

  <!-- Dot Specular / Energy Core -->
  <circle cx="390" cy="384" r="30" fill="#06b6d4" filter="url(#softGlow)" opacity="0.65"/>
  <circle cx="390" cy="384" r="19" fill="#22d3ee"/>
  <circle cx="390" cy="384" r="8" fill="#ffffff" opacity="0.95"/>
</svg>
`;

async function main() {
  const root = process.cwd();
  const cache = join(root, '.cache', 'sheesshh-icons');
  mkdirSync(cache, { recursive: true });

  const svgPath = join(root, 'public', 'assets', 'sheesshh-mark.svg');
  writeFileSync(svgPath, svg.trim());
  console.log('Saved master vector SVG to', svgPath);

  // Sync to public/assets and desktop
  writeFileSync(join(root, 'public', 'assets', 'mak-nose.svg'), svg.trim());
  writeFileSync(join(root, 'public', 'assets', 'mak-nose-chats.svg'), svg.trim());
  writeFileSync(join(root, 'desktop', 'icon.svg'), svg.trim());

  // Render to PNGs using system Edge via Playwright
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await chromium.launch({ executablePath: edgePath, headless: true });
  const sizes = [512, 256, 192, 128, 64, 48, 32, 16];

  for (const size of sizes) {
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1
    });
    const html = `<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;background:transparent;width:${size}px;height:${size}px;overflow:hidden;}</style></head><body><div style="width:${size}px;height:${size}px;">${svg.replace('width="512" height="512"', `width="${size}" height="${size}"`)}</div></body></html>`;
    await page.setContent(html);
    const pngPath = join(cache, `icon_${size}.png`);
    await page.screenshot({ path: pngPath, omitBackground: true });
    await page.close();
    console.log(`Rendered icon_${size}.png`);
  }
  await browser.close();

  // Distribute key PNGs
  const { copyFileSync } = await import('node:fs');
  copyFileSync(join(cache, 'icon_128.png'), join(root, 'src-tauri', 'icons', '128x128.png'));
  copyFileSync(join(cache, 'icon_128.png'), join(root, 'src-tauri', 'icons', 'chats-128x128.png'));
  copyFileSync(join(cache, 'icon_32.png'), join(root, 'src-tauri', 'icons', '32x32.png'));
  copyFileSync(join(cache, 'icon_192.png'), join(root, 'public', 'assets', 'mak-mobile-192.png'));
  copyFileSync(join(cache, 'icon_512.png'), join(root, 'public', 'assets', 'mak-mobile-512.png'));
  console.log('Copied PNG icons to src-tauri/icons and public/assets.');

  // Run pack-ico.py
  execSync('python scripts/pack-ico.py .', { stdio: 'inherit' });
  console.log('All Sheesshh icons successfully updated!');
}

main().catch(err => { console.error(err); process.exit(1); });
