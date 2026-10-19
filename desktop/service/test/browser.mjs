// The desktop windows use WebView2 (Edge) on Windows and WKWebView (WebKit) on
// macOS; test in the matching engine. SHEESSHH_TEST_BROWSER overrides
// (msedge, chrome, chromium or webkit).
import { chromium, webkit } from '@playwright/test';

export const testBrowser = process.env.SHEESSHH_TEST_BROWSER || (process.platform === 'darwin' ? 'webkit' : process.platform === 'win32' ? 'msedge' : 'chromium');

export function launchBrowser(options = {}) {
  if (testBrowser === 'webkit') {
    const { args: _chromiumOnly, ...rest } = options;
    return webkit.launch({ headless: true, ...rest });
  }
  const executablePath = process.env.SHEESSHH_TEST_BROWSER_PATH;
  return chromium.launch({ headless: true, ...options, executablePath, channel: executablePath || testBrowser === 'chromium' ? undefined : testBrowser });
}

// WebKit knows only 'clipboard-read'; its clipboard writes need no grant.
export const clipboardPermissions = testBrowser === 'webkit' ? ['clipboard-read'] : ['clipboard-read', 'clipboard-write'];
