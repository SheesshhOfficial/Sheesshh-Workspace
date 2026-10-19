# Sheesshh Workspace: start here

This is your personal edition of the MIT-licensed Mr. Mak Workspace. It holds
projects and notes and gives installed AI command-line agents their own chat tabs.
It is a local desktop application, not a hosted AI service or a new AI account.

## How it works

- **Chats:** Tauri opens native windows; a local Node service runs each installed
  CLI in a terminal. Codex/Claude use their existing login and normal limits.
- **Workspace:** the React interface reads `workspace/workspace.json`; each card
  points to Markdown, HTML or assets inside a folder in `workspace/`.
- **Your context:** `context/identity.md`, `goals.md` and `preferences.md` tell
  agents about this workspace. Only your supplied name and GitHub identity are set.
- **Reusable work:** `projects/` holds specifications, `knowledge/` lessons,
  `processes/` workflows and `.agents/skills/` agent instructions.
- **Private runtime:** `.sheesshh/` holds local state. `.env`, runtime state,
  incoming attachments and credentials are ignored by Git. Check every commit.
- **Phone and voice:** optional. Phone access uses Tailscale and explicit pairing.
  Local dictation can be free; cloud transcription/live voice needs your own keys
  and may incur charges. Nothing is connected by default.

## Windows source setup

1. Install Node.js **22.20 or newer**, stable Rust, and the Visual Studio C++
   desktop build tools. Install at least one supported agent CLI if you want chats.
2. Clone `https://github.com/SheesshhOfficial/Sheesshh-Workspace.git` and open
   PowerShell in that folder.
3. Inspect `Setup.ps1`, then run:
   `powershell -ExecutionPolicy Bypass -File .\Setup.ps1 -Mode Check`
4. Build your own branded installer:
   `powershell -ExecutionPolicy Bypass -File .\Setup.ps1 -Mode Desktop`
5. Run the generated installer in `src-tauri/target/release/bundle/nsis/`.
   Double-click `Start Sheesshh.cmd` in your repository.
6. In Chats, press **+**, choose your installed CLI and sign in yourself.

Use this fork's Releases only when a Sheesshh installer has actually been
published there. The original owner's installer will still install their app.
Source changes alone do not publish a new installer.

## macOS / Linux

Install Node 22.20+, stable Rust and the platform prerequisites described in
[getting started](getting-started.md). Run `./setup.sh check`, then
`./setup.sh desktop`. On macOS, move the generated app into Applications and
open `Start Sheesshh.command`. The source app is not notarized. On Linux, use
the generated AppImage with `--repo /absolute/path/to/Sheesshh-Workspace`.

## Preview without native build tools

Run `npm ci`, then `npm run dev`, and open the localhost URL printed by Vite.
Or use `Setup.ps1 -Mode Preview` / `./setup.sh preview`.
No agent CLI is required just to browse the workspace. This preview does not
provide the native terminal service; use the desktop build for agent chats.

## Add your first project

Create `workspace/my-project/overview.md`. Ask your agent to add a card to
`workspace/workspace.json`, using a unique id, title, folder `my-project` and a
step with path `overview.md`. Keep the existing structure and increment its
`updated` date. The pinned **Sheesshh HQ** card is your starting point.
The four included upstream examples are retained for reference, not presented
as your completed work. Archive them from a card's status menu when desired.

## Personal settings and existing installations

This edition uses the `SHEESSHH_` environment prefix, `.sheesshh/` runtime state,
and app identifier `io.github.sheesshhofficial.workspace`. It does not automatically
import or delete the original app's `.mrmak/` state, browser drafts or settings.
Keep an original installation and its files backed up if you used it before.
Start fresh here; migrate individual project folders deliberately. Never copy
credentials, pairings or live session state casually between installations.

If you choose optional providers, copy `.env.example` to `.env` and enter your
own keys locally. Keep values out of Git and chat. No email, domain, payment,
provider key or external account has been invented or preconfigured.

## Check changes

Run `npm run lint`, `npm test`, `npm run test:template` and `npm run build`.
The repository's GitHub Actions cover Windows, Linux and macOS. Browser tests
need Playwright's browser installation; native builds need platform toolchains.
