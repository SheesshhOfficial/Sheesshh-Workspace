# SnipersAim taskboard

Updated 20 October 2026; native observations are from 19 October. “Complete locally” means the reported local milestone passed; it does not imply remote-client or release acceptance. No deadlines or owners have been invented.

## Next, in order

| Priority | Work | Current state | Done when |
| --- | --- | --- | --- |
| P0 | Accept the latest saved interior sniper placement | Saved/pushed at `e8099cd`; latest position has not passed play acceptance | Practice Sniper has support, headroom, useful opening sightlines and safe collision at the new position; camera edits and extra raw hero are reviewed. |
| P0 | Set the intended standalone startup scene | Final scene enabled after Bootstrap | Reviewed Build Profiles or explicit build scene list starts with SnipersAim; standalone launch opens the canyon. |
| P0 | Prove the complete two-peer match | NOT RUN | Same-revision peers complete both role arrangements, scoring, all turns, final scores and replay, with evidence. |
| P1 | Improve cover cadence | Open: 3 boulders about 35–38 m apart | Reviewed route has measured 3–6 m exposed crossings, usable collision and fair tower sightlines; dry-run/review precede applying changes. |
| P1 | Natural grass scatter | Open: 180-clump rectangular trial | Reviewed distribution reads naturally; ground placement, wind, culling, collisions and frame cost pass locally. |
| P1 | Replace the original rifle and show it held | Open; replacement requested | New weapon/materials are reviewed; held unscoped viewmodel and world-visible weapon pass owner/observer tests; old asset removed only after reference audit. |
| P1 | Review rig and apply original procedural motion | Tool published; native review pending | The actual skin is mapped through 15 anatomy slots; all ten preview states, deformation and weapon-held pose are accepted; the intended prefab change and lifecycle behavior pass. |
| P1 | Build and test the player | NOT RUN | Fresh build output uses the saved final scene first; smoke, network, lifecycle and performance evidence is retained. |
| P2 | Dependency-safe cleanup | Plan only | Retained-scene dependency audit and explicit review identify unused items; approved deletions are recoverable and committed separately after validation. |

## Published toolkit; native acceptance pending

The prepared source contains the numbered 00–07 completion workflow, plus the existing interior marker tool. It covers read-only preflight, a saved-scene backup, bounded cover/natural-grass preview and apply, original procedural character motion, original Kestrel rifle/held presentation, native rules/play/build checks and cleanup review. The [Runbook](runbook.md) lists exact local menu names and project-relative files.

Toolkit commit `02e4d5cc99a2785007c0da626a3bd4e9c7e0bc7e` is verified published; 106 source/math checks passed. Unity compilation, native generated assets, real rig deformation, weapon fit, gameplay, target performance and multiplayer tests of the toolkit are **NOT RUN**. Blender rifle previews demonstrate authored art, not application to the production prefab. Source/math checks are separate from native acceptance.

## Complete locally, keep regression coverage

- Original canyon retained and a separate environment validation stage created.
- Native canyon walking and grass-wind inspection reported successful.
- Textured hero and runner/sniper role-camera test reported successful.
- Production runner and scope cycle reported successful.
- Final gameplay scene initially saved and pushed at `2dddfc0`; latest user scene/camera/interior edits pushed at `e8099cd`.
- Runner jump, sniper WASD and runner travel-facing reported successful locally.
- Interior-marker tool published at `a49f293`; later native geometry operation reported PASS.

## Known issues and risks

### Sparse cover

Three large boulders leave a long, exposed-looking route. Approximately 35–38 m center spacing is not the same quantity as the desired 3–6 m exposed crossing. Measure the actual path between cover edges, check crouch/standing silhouettes as applicable, and test from the tower before accepting a denser layout.

### Trial grass distribution

The 180 clumps demonstrate wind in a rectangular patch. Natural placement, ground fit, visibility from the tower and player-build performance are still open. Grass should not become solid cover or a shot blocker.

### Rifle replacement and held presentation

The rifle appears white. The owner now wants the original rifle replaced, held visibly while unscoped, and visible in the world to other players. Inspect prefab/model/material references before replacing it. Delete the old asset only after checking retained references and validating the replacement. Keep hit logic and aim alignment intact; do not conceal an import failure by silently swapping identities.

### No animation assets in the audited hero

The earlier audit found one skinned mesh and 25 bone references; Avatar, Animator and imported clips were absent. Correct movement and facing can still look like foot sliding. The prepared original motion approach rotates reviewed bones directly and does not require a mocap pack or forced Humanoid import. Fifteen anatomy mappings, neutral poses, ten motion states, hand fit and native deformation remain unverified. Do not call the prepared tool an applied animation pass.

### Latest saved interior marker still needs play acceptance

The user pushed `e8099cd` with marker `(-20.343573, 19.451902, -7.34)` and interior support enabled. This is different from the earlier native geometry PASS coordinates. Recheck support, headroom, movement, opening visibility and collisions at the saved position. Camera edits and an added raw hero also need review. The final scene is enabled after Bootstrap and therefore is not first/startup. A marker is a feet/root position; the hero reference pivot and camera eye are different positions.

### Networking and build gates

Multiplayer proof and release build are NOT RUN. Every peer must use the same code revision and exact saved scene. The movement/facing patches added replicated state, so mixing old and new builds is unsupported. A local practice success cannot certify scene hashes, serialization or remote ownership.

### Cleanup can break retained content

The final scene still references assets under WorkInProgress. Preserve `.meta` identities, stage collision/grass/sand assets, and the arena exit-marker material until a real dependency audit says otherwise. The source and test scenes are review candidates, not a blanket deletion list.

## Decisions needed only if they block the next step

- Does the native rig mapping and procedural-motion preview meet the intended look? If external clips are preferred later, choose their source and verify licensing before import.
- What should happen if a sniper walks off the tower? Do not add an unrequested recovery or damage rule.
- What remaining-time rounding, timeout scoring or tie rule is intended if implementation and design differ?

Check existing project rules before asking these questions; do not silently decide them while polishing visuals.
