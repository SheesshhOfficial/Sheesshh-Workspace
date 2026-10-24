# ECC — on-demand instructions in Sheesshh Workspace 0.5.4

Open **ECC** after Skills in the right rail. The compact drawer expands into an
in-window library. Its three tabs are **Workflows**, **Library**, **My Kits**.

- Workflows contains reviewed starting bundles; nothing executes on selection.
- Library searches a pinned, bundled ECC snapshot by type: skills, roles,
  commands, rules and contexts. Open an item to read its complete source,
  prerequisites, limitations and provenance. Documents load locally on demand.
- My Kits holds private favorites and selected bundles. Saving is not installing.

## Use once

1. Choose a workflow, an instruction, or up to eight selected items.
2. Select **Use once / Review & use** and describe one bounded task.
3. Select an existing running Codex or Claude chat with normal CLI permissions.
   Its actual working folder is shown. ECC never starts an agent or changes its
   permission mode. Other providers can use **Copy prompt** manually.
4. Select **Prepare exact prompt**. Read the preview before proceeding.
5. **Copy prompt** copies only. **Send once to selected chat** explicitly delivers
   that reviewed prompt to the terminal through the existing adapter. Delivery
   does not prove task acceptance, execution, or completion. Inspect the terminal.
6. If delivery is uncertain, do not resend blindly. The request is durably
   recorded before any terminal write and the same request is never replayed.

In the **Workspace** conversation composer, `/ecc` opens the library and
`/ecc your task` opens it with that task draft. Other messages are unchanged.
This is an app command, not a new provider-native slash command. Attachments must
be removed before opening ECC so they are not silently sent to another surface.

## Boundaries

This is an instruction catalog, not an ECC runtime/plugin installation. Native
ECC commands, executable companions, hooks, memory, orchestration and tool
servers are **not installed or activated**. Source examples remain references.
The one-time wrapper preserves project instructions and forbids treating source
text as permission for installs, paid calls, global changes or background work.
You remain responsible for approving the actual selected task and agent actions.
“One-time” means ECC attaches instructions only on an explicit send; the text
still remains in that native CLI conversation/history. It cannot erase the
agent's context afterward. Start a fresh chat for unrelated work when needed.

Existing **Skills**, **MCP**, and **Settings** remain authoritative for project
files, connection inspection, and app preferences. Advanced links return there;
ECC does not store API keys or duplicate those configurations.

Catalog provenance and MIT attribution are in `public/ecc/`. Source links point
to the pinned upstream commit. Opening ECC makes no external network request;
clicking an upstream link opens that external page deliberately. Updates are
reviewed application/source updates, not auto-downloads.

Favorites/kits are stored in the selected Workspace's ignored
`.sheesshh/ecc-state.json`. Delivery status/IDs (not prompt bodies) are stored in
`.sheesshh/ecc-deliveries.json`. Keep these private. The target chat project can
be different from the Workspace content folder; always check the displayed path.
Malformed private data fails closed rather than silently erasing prior state.

## Verification

ECC unit/API checks: `node --test desktop/service/test/ecc.test.mjs`.
UI checks use isolated fixtures and fake terminals, not real agent accounts.
Building a Windows installer is not installation/launch verification on your PC.
The installer remains unsigned; no signing credentials or security settings were
changed. Install deliberately after finishing active work. Source changes alone
cannot update an already installed EXE; use the new 0.5.4 build for its new UI.
