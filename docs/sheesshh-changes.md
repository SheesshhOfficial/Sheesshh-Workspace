# Sheesshh edition: change and verification notes

## Personalization

- Sheesshh app name, S mark, native icons, windows, launchers and mobile identity.
- Repository/release links point to SheesshhOfficial/Sheesshh-Workspace.
- Separate native identifier, local state and environment prefix. Existing upstream
  state is not silently imported, overwritten or deleted.
- Sheesshh HQ starter card and owner/context files use only supplied information.
- Original MIT license, third-party notices and historical changelog are retained.
  Upstream screenshots/media remain credited examples.

## Correctness and privacy fixes

- Resolve symlink targets before allowing report access; reject private target
  names, mobile workspace escapes and aliases to unsupported file types.
- Preserve Markdown file permission bits on atomic save. Create new recovery
  directories/files with owner-only permissions.
- Preserve newer Markdown edits and chat drafts when an earlier save/send returns.
- Allow report-only preview without an agent CLI. Detect Antigravity and Kimi
  alongside Codex, Claude Code and OpenCode during setup.
- Unix launcher/setup scripts are executable. Browser tests default to Chromium
  on Linux and can use SHEESSHH_TEST_BROWSER_PATH for an installed browser.

## Verification in the Linux editing environment (2026-10-19)

Passed: lint; TypeScript/production UI build; service suite (183 passed,
7 platform-specific skips); template/media closure; synchronized skill copies;
9 asset-delivery tests; 8 fal-job tests; 4 local-voice setup tests;
Unix shell syntax and setup check; Git whitespace checks.

Added delayed-save/send browser regressions, but could not execute browser UI
suites: this editing sandbox prevents Chromium's required local IPC socket.
Native Rust/Tauri builds and Windows/macOS checks were not run locally because
those toolchains/platforms are absent. GitHub Actions reports their own outcome
for each published commit. A passing frontend build is not a native installer.
No actual CLI account, paid service, mobile pairing or live voice session was used.

## Scope

These checks cover the reviewed changes and existing automated suites. They do
not establish that every possible bug in the whole application has been fixed.
See [setup](sheesshh-setup.md) for running your own desktop build.
