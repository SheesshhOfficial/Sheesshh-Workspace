# SnipersAim next-session runbook

The next safe outcome is native acceptance of the latest saved interior placement, a reviewed startup scene and complete matching-peer evidence. This is a checklist to execute in the native Unity project; recording it here does not run any editor operation.

## 1. Establish the baseline

- Work in `G:\Unity Projects\SnipersAim` using Unity **6000.6.5f1**.
- Inspect Git status, current branch/revision and local scene changes before pulling. Preserve the owner's work; do not reset, discard, stash or save it silently.
- Latest published user revision is `e8099cd294936d5f8a6b171db62954383c281f20` (“last change before sleep”). It includes a saved interior marker and camera edits plus an added raw hero. The earlier geometry pass used a different position; do not reuse that PASS as proof of the latest edit.
- Verify Git LFS assets are hydrated and Unity has finished import. Stop on missing meshes, missing scripts, shader errors or C#/NGO generation errors.
- Exit Play Mode, Prefab Mode and active network sessions before scene editing. Review unsaved changes explicitly.
- Record exact source revision, active scene, Unity/package versions and current test evidence. Back up the intended scene/assets before applying visual changes.

## 2. Open the existing final scene

Open `Assets/SniperAim/Scenes/SnipersAim.unity` alone. Verify the path in Unity rather than relying on an open tab's informal name.

The final scene already exists. Do not rerun **SniperAim > Setup > Create Final SnipersAim Scene** over it or regenerate a different scene for each peer. The setup command is a historical creation tool, not the routine way to reopen the game.

The latest saved final scene is enabled **after Bootstrap**. For standalone canyon builds it must be first/startup, or first in the explicit build scene list; merely being enabled does not make it the launch scene. Review the intended build-list change and confirm with an actual standalone launch.

## 3. Accept the latest saved interior placement

Inspect `e8099cd` before making another edit. The latest saved position supersedes the earlier native-tool result. Do not reapply the old coordinates just because they previously passed.

Recorded positions:

| Measurement | Native result |
| --- | --- |
| Latest saved feet/root (`e8099cd`) | `(-20.343573, 19.451902, -7.34)`; interior support enabled |
| Latest camera/extra hero | Camera edits and added raw hero require review |
| Earlier native-query feet/root | `(-20.343570, 19.451090, -8.953053)` |
| Earlier query eye Y / yaw | `21.10109` / `352.422°` |
| Earlier geometry query | PASS at the earlier position only |
| Latest reload / Practice Sniper | Pending confirmation |

If the marker needs to be placed again, use the existing **SniperAim > Setup > Place Interior Sniper Marker** window and the repository's [reviewed interior spawn instructions](https://github.com/SheesshhOfficial/SnipersAim/blob/a49f29346933b009efa8597c1efc2f692029ce3f/WorkInProgress/REVIEWED_INTERIOR_SPAWN.md).

1. Capture or enter a visually reviewed world reference for the intended covered platform. A raw hero's pivot is not a feet measurement. Do not copy the displayed screenshot coordinates blindly.
2. With the final scene active, review the reference and run the bounded measurement/validation. It checks the exact tower support, production capsule clearance/headroom, footprint samples and other spawn separation.
3. If it fails, stop and inspect the exact blocker. Do not expand the search, change physics settings or fall back to the rooftop to force a pass.
4. On success, inspect the moved existing marker. The operation is undoable; it leaves the scene dirty and does not save, regenerate, change cameras or delete a reference hero.
5. Review the extra raw hero and camera edits; do not delete the hero blindly or mistake it for the production player. Run Practice Sniper: standing support, WASD, headroom, window visibility, wall/rail collision and edge/fall behavior. Run Practice Runner separately for the route and goal.
6. Save only reviewed scene changes, reopen, repeat the critical checks and review the Git diff. Push the scene and intended dependencies through the approved workflow. Record the new scene revision.

A native geometry PASS is not permission to erase unrelated edits or a substitute for these gameplay checks. The old generator audit does not automatically describe a manually moved marker; record the new result separately.

## 4. Use the prepared finishing workflow after publication

**Status: published at 02e4d5cc99a2785007c0da626a3bd4e9c7e0bc7e; native acceptance pending.** The following exact strings are present in the local editor source. The user must still pull the [published toolkit revision](https://github.com/SheesshhOfficial/SnipersAim/commit/02e4d5cc99a2785007c0da626a3bd4e9c7e0bc7e), preserving local work, and require a clean native compile before using these menus. All 106 source/math checks passed; Unity compile and native gameplay have not run.

All entries are under **SniperAim > Finish**:

| Step | Exact menu name | Prepared behavior and remaining check |
| --- | --- | --- |
| 00 | Completion Dashboard | Ordered entry point into the workflow. |
| 01 | Read-only Preflight | Inspect saved final scene, runtime/UI references, production player, interior support and spawn configuration; report extra raw hero for review. |
| 02 | Back Up Saved Scene | Confirm a unique copy in `Assets/WorkInProgress/CompletionBackups/`; shared dependencies mean this is not a full project backup. |
| 03 | Cover and Grass | Preview bounded candidates before apply. Conservative defaults request 9 cover pieces and 72 grass clumps; rejected candidates are not forced. Optional reviewed trial-grass disabling is undoable, not deletion. |
| 04 | Character Motion | Select the actual skin, map 15 anatomy slots and review ten procedural states before applying a backed-up, scoped prefab edit. No invented bone names or forced Humanoid import. |
| 05 | Player Presentation | Generate original Kestrel rifle/glove assets; review unscoped viewmodel and actual RightHand/world-held fit before scoped prefab apply. Native generation and fit remain unverified. |
| 06 | Game Validation | Native configuration, actual MatchRules checks, Play-mode observation, honest result recording and a confirmed final-only Windows x64 Development build into fresh output. |
| 07 | Cleanup Review | Audit retained dependencies and old rifle references; optionally organize the enabled build scene list after explicit review. No finishing menu deletes source assets. |

### Local source and instructions

These project-relative files are included in the [published toolkit](https://github.com/SheesshhOfficial/SnipersAim/commit/02e4d5cc99a2785007c0da626a3bd4e9c7e0bc7e). Start with the [full runbook](https://github.com/SheesshhOfficial/SnipersAim/blob/02e4d5cc99a2785007c0da626a3bd4e9c7e0bc7e/WorkInProgress/COMPLETION_RUNBOOK.md):

- `WorkInProgress/COMPLETION_RUNBOOK.md`: full ordered native workflow
- `WorkInProgress/COMPLETION_COVER_GRASS.md`: candidate checks, owned generations and grass restoration
- `WorkInProgress/CHARACTER_MOTION.md`: anatomy mapping, original procedural motion and native review
- `WorkInProgress/PLAYER_PRESENTATION.md`: rifle generation, two visual reviews, protected state and old-source dependency gate
- `Assets/WorkInProgress/Editor/Completion/`: dashboard and the numbered editor windows
- `WorkInProgress/Previews/kestrel_art_BLENDER_NOT_UNITY.png`
- `WorkInProgress/Previews/kestrel_first_person_BLENDER_NOT_UNITY.png`

The two art renders are included in this card's Screenshots tab. They use the same authored rifle geometry, but Blender rendering does not prove Unity-native generation, held fit, materials or gameplay.

### Keep the review gates meaningful

- Cover witnesses and candidate spacing do not prove a connected route or the requested 3–6 m exposed crossings. Measure actual cover-edge exposure and walk/shoot-test the accepted layout.
- The default batch is bounded; it is not a claim that the entire map is finished or balanced. Grass remains cosmetic and nonblocking.
- Motion is original rotation-based procedural animation. Review idle, walk, run, jump, fall, landing, wounded, sniper-held, sniper-strafe and backward states. No polished foot IK, terrain planting or mocap quality is claimed. Anatomy, axes, neutral rotations, twist and sliding need native review.
- The new weapon must remain held in the unscoped owner view and visible on remote characters. Review the real right-hand attachment and held-pose evaluator. A visual muzzle does not replace the authoritative shot origin.
- Replacement does not authorize blind source deletion. The old rifle may still be needed by recovery prefabs or other scenes; retain it until replacement acceptance and a project-wide dependency/recovery review pass.
- Source/math checks are not Unity execution. Native compilation, asset generation, deformation, fit, gameplay, performance and multiplayer of this toolkit remain **NOT RUN**.

### Final-scene startup

The final SnipersAim scene already contains the harvested Bootstrap UI/runtime/lobby. Intended standalone startup is the final scene at index 0, with no runtime additive Bootstrap load. Before final-only building, the toolkit's validation must confirm NetworkManager, SessionCoordinator, MatchDirector, UI and their references are intact. That native gate has not run in this record.

The prepared build action uses an explicit final-only scene list, a confirmed fresh output child outside the project and the already installed Windows x64 build module. It does not change platform, install modules, launch the executable, overwrite old builds or publish anything. The global scene-list cleanup option is separate; inspect active Build Profile overrides too.

## 5. Prove the match

Use the [Test matrix](test-matrix.md). Build every peer from the same revision and exact saved final scene; movement/facing added replicated fields.

1. Run both practice roles and lifecycle checks.
2. Run host-sniper/client-runner, then host-runner/client-sniper.
3. Check scope, laser/cover, head/body scoring, slow, escape, deadline and duplicate-event handling.
4. Complete every sniper turn, final scores and replay. Exercise disconnect, leave and rehost.
5. Record player-build output and performance separately from Editor observations.

For each test retain result, revision, scene hash/path, configuration, concise steps, logs and a useful screenshot or recording. Mark unrun rows **NOT RUN**. Fix one bounded issue at a time and rerun affected rows.

## 6. Clean up after acceptance

Do not delete WorkInProgress wholesale. The final scene references production scripts, collision meshes, grass/sand materials and its generated exit-marker material there.

- Start with recursive native `AssetDatabase.GetDependencies` for retained scenes/prefabs/materials, plus GUID/text checks for dynamic loads and tool paths.
- Review each candidate and its recoverability before deleting. Keep originals and failure evidence until the replacement has been accepted.
- Use Unity-aware moves/deletions so `.meta` identities remain paired. Never hand-edit GUIDs to repair a missing reference.
- Commit reviewed cleanup separately, then reimport, reopen, rebuild and rerun the smoke tests.
- Do not commit Library, Temp, Obj, logs, credentials or unrelated local files.

## Stop and report when

A source asset is missing; a scene is dirty unexpectedly; a guard fails; support/headroom cannot be proven; the intended gate is ambiguous; native compile or NGO errors occur; peers use different revisions; a dependency is unresolved; an action would overwrite or remove unreviewed work. Report the exact action, target and error rather than disguising an incomplete operation as success.
