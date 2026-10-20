# SnipersAim workflow and history

A chronological development record for the 19 October 2026 working session, updated with toolkit publication on 20 October 2026. These revision anchors describe the reported progression; they are not a replacement for each commit's full diff. No wall-clock times are inferred from screenshot filenames or file timestamps.

## 1. Preserve the owner's canyon

[7740a3e](https://github.com/SheesshhOfficial/SnipersAim/commit/7740a3e) established the user's canyon layout as the source. The preparation workflow kept the original tower/walls and generated a separate validation copy with ground, collision, initial sandstone cover and a small wind-grass trial.

The source environment and later gameplay scene have different roles. A decorative hero in an environment scene is not automatically a controlled network player.

## 2. Make preparation work in the selected Unity version

[bb5b881](https://github.com/SheesshhOfficial/SnipersAim/commit/bb5b881) corrected removed instance-ID API usage for Unity 6000.6. The initial editor failure was addressed in source; native import was still required after the patch.

[ccae70d](https://github.com/SheesshhOfficial/SnipersAim/commit/ccae70d) recorded the validated environment stage. Ground/wall collision and wind grass were subsequently checked locally. Those checks did not prove a complete multiplayer game.

## 3. Walk the canyon, then establish the hero and views

[6ccc4e8](https://github.com/SheesshhOfficial/SnipersAim/commit/6ccc4e8) added the walk-test stage. The user verified canyon traversal and grass wind natively.

[f0e4517](https://github.com/SheesshhOfficial/SnipersAim/commit/f0e4517) brought the textured hero and local role-camera test. The native hero audit found one skinned mesh and 25 bone references, with no verified Avatar, Animator or clips. Runner third-person and sniper first-person behavior could therefore be checked without claiming locomotion animation.

## 4. Move role presentation into production

[96fd342](https://github.com/SheesshhOfficial/SnipersAim/commit/96fd342) integrated role-dependent cameras with the production player. Role follows the match director instead of local test keys; only the owner's controlled player activates a view.

[afc5a22](https://github.com/SheesshhOfficial/SnipersAim/commit/afc5a22) covered scope and texture follow-up. Native local checks confirmed the production runner and the 2× / 4× / 6× / off scope cycle. This remained distinct from remote-client verification.

## 5. Assemble one final canyon scene

[49ef8ec](https://github.com/SheesshhOfficial/SnipersAim/commit/49ef8ec) introduced the arena generator and measured layout integration.

[816153a](https://github.com/SheesshhOfficial/SnipersAim/commit/816153a) consolidated the intended gameplay destination at `Assets/SniperAim/Scenes/SnipersAim.unity`.

[9336c8c](https://github.com/SheesshhOfficial/SnipersAim/commit/9336c8c) corrected the nested-prefab asset-context guard. A healthy persistent model asset must not be rejected simply because an instance-only API reports `NotAPrefab`.

[2dddfc0](https://github.com/SheesshhOfficial/SnipersAim/commit/2dddfc0) is the user's final-scene push. Keep the scene's dependencies: earlier stage collision meshes/materials and the generated audit folder's exit-marker material remain referenced. A directory named WorkInProgress is not automatically safe to delete.

## 6. Add movement and correct runner facing

[47e69e9](https://github.com/SheesshhOfficial/SnipersAim/commit/47e69e9) added runner jump and sniper WASD. The movement remains server-authoritative; it does not add animation clips or make a native network pass unnecessary.

[9ec52fb](https://github.com/SheesshhOfficial/SnipersAim/commit/9ec52fb) corrected the runner model to face actual travel while preserving camera-relative movement and aim. The owner subsequently verified jump, sniper movement and runner facing locally.

## 7. Move the sniper from the roof to the reviewed interior

[a49f293](https://github.com/SheesshhOfficial/SnipersAim/commit/a49f29346933b009efa8597c1efc2f692029ce3f) published the targeted interior-marker tool. It captures a world reference, measures the intended platform, validates production-capsule support/headroom and changes only the existing sniper marker plus its interior-support review fields. It does not save the scene or alter cameras.

The subsequent native operation reported PASS:

- Feet/root: `(-20.343570, 19.451090, -8.953053)`
- Production eye Y: `21.10109`
- Facing yaw: `352.422°`

That result proves the reported native geometry check at that earlier position. The reference-hero screenshot is not a picture of those measured production feet. The later saved edit below supersedes the position and requires fresh acceptance.

## 8. Save the latest scene before the next session

[e8099cd](https://github.com/SheesshhOfficial/SnipersAim/commit/e8099cd294936d5f8a6b171db62954383c281f20), “last change before sleep”, is the latest reported user push. It saves the interior marker at `(-20.343573, 19.451902, -7.34)` with interior support enabled, along with camera edits and an added raw hero. Those changes remain for native review. The final scene is enabled after Bootstrap, not at startup index 0.

The previous native geometry PASS does not automatically apply to the changed marker. Reload/play and matching-peer tests remain required. The requested finish scope now explicitly includes replacing the original rifle, held unscoped first-person and world-visible weapon presentation, character animations, full cover and natural grass work. Delete the old rifle only after its references are checked.

## 9. Finish carefully

The completion toolkit is **published at 02e4d5cc99a2785007c0da626a3bd4e9c7e0bc7e; native acceptance pending**. Its local source includes the ordered 00–07 dashboard/preflight/backup/cover/character-motion/rifle/validation/cleanup-review workflow. Original procedural character motion and Kestrel rifle/glove geometry are prepared, and two actual Blender art previews are included in this card. The local runbook is `WorkInProgress/COMPLETION_RUNBOOK.md`. Publication is verified at [02e4d5c](https://github.com/SheesshhOfficial/SnipersAim/commit/02e4d5cc99a2785007c0da626a3bd4e9c7e0bc7e): 46 files, 44 additions and 2 edits, with no deletions. Its 106 source/math checks passed. Unity compilation and native execution remain NOT RUN; source checks do not certify gameplay.

## Lessons to carry forward

- Move from isolated environment → local controller → production prefab → final scene → matching-peer acceptance.
- Keep originals and unique candidate outputs until the replacement has passed native checks.
- Use actual world-space geometry and production capsule dimensions; do not copy a visual model's pivot into a feet marker.
- Treat source contracts, native editor geometry, local gameplay and multiplayer acceptance as separate evidence levels.
- Never regenerate the final scene independently on each peer or remove shared stage assets during cleanup.
- Record exact revision, scene and result with each test; a later code or scene change can invalidate a previous pass.
