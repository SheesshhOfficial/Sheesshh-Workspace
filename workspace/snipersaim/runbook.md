# SnipersAim runbook · current handoff

Updated 24 October 2026. **Game development is paused at the owner's request.** These are the saved next steps for a later resume, not instructions to start an agent or run Unity now. This card update changes documentation only.

## Preserve the accepted baseline

- Keep the accepted balanced canyon layout (101 props), grass, rifle, runner fixes and repaired invisible block.
- Keep the existing canyon scene `Assets/SniperAim/Scenes/SnipersAim.unity`, its dependencies and all `.meta` identities. Do not regenerate cover, delete old assets or apply old October 19 coordinates.
- The owner reported multiplayer working on two PCs connected to the same Wi-Fi, including connection, ready/play and sniper/runner turns. This is LAN evidence, not proof of internet connectivity or every scoring edge case.
- Antigravity's manual workflow is disabled; its watcher is paused. Do not dispatch or resume it. ECC is optional Use once reference material and never automatic Unity execution.

## Before a later Unity session

1. In the game repository, inspect branch/revision and `git status`. Preserve uncommitted scene or guide changes. Pull only when clean and fast-forwardable; stop on conflicts or divergence. Do not reset, stash, force-push or discard work.
2. The verified game main at this update is [cc17356](https://github.com/SheesshhOfficial/SnipersAim/commit/cc17356c4afb75c9f539427e4e62719a1138443a). It contains the generated Yard scene/audit. Unity version recorded by that audit: **6000.6.5f1**.
3. Let Unity finish importing. Stop on missing assets, compilation errors or missing scripts. Capture the exact error rather than starting another generator run.
4. Before changing the open scene, exit Play Mode and deal explicitly with unsaved work. Do not silently save or close an unrelated scene/session.

## The one next native check

Open this **existing** scene in Unity:

```text
Assets/WorkInProgress/LastTrainYard/Arenas/Yard_20261024_123943_cb59cd0030b741649530cfb4a5a68f95/LastTrainYard.unity
```

1. Open **File → Build Profiles** and inspect the active profile's **Scene List** (including a profile-specific override, if present).
2. Add the open Yard scene if absent and leave its checkbox enabled. Preserve all existing entries and their order; do not move Yard to index 0 or make it the default startup scene. If already listed, do not add a duplicate.
3. Return to the Yard scene, enter Play Mode and choose **Practice Runner**.
4. Check that the controlled runner stands on the ground and can move normally. This is a small smoke check, not a complete route, shooting or multiplayer certification.
5. Keep one useful Game view screenshot and the exact Console error if anything fails. Report the scene path and revision with the result. Do not mark PASS merely because the menu opens.
6. Stop after this bounded observation unless the owner chooses the next task. Save only intended changes after review.

**Do not regenerate the Yard scene.** It was already authored, generated and committed. Do not run canyon completion/obstacle-remake menus, change global physics, alter build startup, or create different arenas independently on each PC.

## What the existing Yard audit does and does not prove

The [12:39 UTC audit](https://github.com/SheesshhOfficial/SnipersAim/blob/cc17356c4afb75c9f539427e4e62719a1138443a/Assets/WorkInProgress/LastTrainYard/Arenas/Yard_20261024_123943_cb59cd0030b741649530cfb4a5a68f95/YardAudit.json) records `NATIVE_SETUP_VALIDATED_NOT_GAMEPLAY_ACCEPTED`: 6,552 visual meshes, 478 collision meshes, 17 exact material mappings, 110 valid runner candidates from 113 tested, 7 runner spawns, 8 approval positions and 3 practice positions.

Its `nativeSaveReopenPassed: true` flag was produced before the CloseScene/save-reopen lifecycle fix; do **not** use it as reliable evidence of a successful reopen. The lifecycle fix is published, but a later manual reopen/Practice Runner success has not been reported. The protected original canyon and retained setup counts are not a substitute for that observation.

Yard gameplay/traversal, sniper visibility, hit/laser/scope behavior, Yard multiplayer, native FPS and visual acceptance remain **NOT RUN / not reported**. The authored console uses the existing automatic goal trigger, not a new interaction-button mechanic. Some Blender procedural material effects were approximated; native appearance is not certified by the asset conversion.

## If the smoke check fails

Report the first actionable error, the exact scene and the action that triggered it. Preserve the saved scene and accepted canyon. A targeted fix can be proposed from that evidence; no blanket regeneration, automatic extra tests or unrelated asset cleanup is authorized by this runbook.

## Refresh this Workspace card without replacing the app

This is a **Sheesshh-Workspace repository content update**, not a new setup.exe. In the Workspace repository, review local changes first, then use a clean `git pull --ff-only`. Stop if local guide/card edits conflict; do not discard them. Refresh or reopen the SnipersAim card in the app, using the repository-backed workspace folder that received the update. An installed app pointed at another folder will not acquire these documents automatically. Do not interrupt active agents merely to refresh a card.
