# SnipersAim

Active Sheesshh game project. Updated 20 October 2026; native progress evidence is from 19 October.

## Project coordinates

- Repository: https://github.com/SheesshhOfficial/SnipersAim
- Native checkout: `G:\Unity Projects\SnipersAim`
- Unity: 6000.6.5f1; URP 17.6; Netcode for GameObjects 2.13.3; Input System 1.20
- Final gameplay scene: `Assets/SniperAim/Scenes/SnipersAim.unity`
- Workspace card: `snipersaim`, under `workspace/snipersaim`

## Goal

Two-minute canyon rounds with a randomized sniper turn for each player. Runners use third-person movement to reach a guarded gate; the sniper uses first-person movement, a 2×/4×/6×/off scope cycle and a scoped red warning laser. Headshots award 100 and kill; the first body hit awards 40 and slows, the second awards 50 and kills. Escaping runners earn remaining-time points; death earns 0 escape points. Final scores appear after all sniper turns.

## Current evidence

The owner reported native local verification of canyon traversal, grass wind, textured hero/role cameras, production runner/scope behavior, runner jump, sniper WASD and runner travel-facing. The final scene was first pushed at `2dddfc0`. Latest user source is `e8099cd294936d5f8a6b171db62954383c281f20`, “last change before sleep”, with saved interior marker, camera edits and an added raw hero.

The earlier interior marker operation reported a native geometry PASS at feet `(-20.343570, 19.451090, -8.953053)`, eye Y `21.10109`, yaw `352.422°`. The latest saved marker is `(-20.343573, 19.451902, -7.34)` with interior support enabled; that changed position needs new gameplay acceptance. The final scene is enabled after Bootstrap, not first/startup. Multiplayer proof and a release build are NOT RUN.

## Open work

1. Accept the latest saved interior sniper position and review camera/raw-hero changes; put the final scene first for standalone builds, then verify the complete match on matching peers.
2. Improve three sparse boulders (about 35–38 m spacing) toward measured 3–6 m exposed crossings.
3. Replace the rectangular 180-clump grass trial with reviewed natural scatter.
4. Replace the original rifle with a held unscoped viewmodel and world-visible weapon; remove the old asset only after reference review.
5. Natively review/apply the prepared original procedural motion after mapping the actual rig. The earlier audit found 25 bone references and one skinned mesh, but no Avatar/Animator/clips; this prepared rotation-based approach does not depend on external clips.
6. Build/test the player, then review dependency-safe cleanup. Do not delete WorkInProgress wholesale.

A review-first finishing toolkit is **published at 02e4d5cc99a2785007c0da626a3bd4e9c7e0bc7e; native acceptance pending**. Exact local menus 00–07 and source/runbook paths are recorded in the Workspace Runbook. Original procedural motion and Kestrel rifle/held presentation are prepared; two Blender previews are included. Toolkit publication is verified; native generation and game-test passes are not claimed.

## Working record

- [Overview](../../workspace/snipersaim/overview.html)
- [Game design](../../workspace/snipersaim/game-design.md)
- [Chronological history](../../workspace/snipersaim/history.md)
- [Taskboard](../../workspace/snipersaim/taskboard.md)
- [Next-session runbook](../../workspace/snipersaim/runbook.md)
- [Test matrix](../../workspace/snipersaim/test-matrix.md)
- [Curated progress screenshots](../../workspace/snipersaim/screenshots.html)
- [Sources and credits](../../workspace/snipersaim/sources.md)

Maintain those records together. Keep source checks, native geometry, local gameplay and multiplayer evidence distinct. Preserve the original canyon and all referenced assets/metadata until an accepted replacement and dependency review exist. Never restart the owner's editor or discard unsaved work to apply workspace updates.
