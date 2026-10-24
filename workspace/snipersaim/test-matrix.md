# SnipersAim evidence and pending checks

Updated 24 October 2026. **This is an evidence ledger, not a mandatory certification loop.** Game work is paused. Updating this card did not execute Unity or a game build.

## Evidence labels

- **OWNER-REPORTED ACCEPTED:** the owner confirmed the result; no independent rerun is claimed.
- **REPOSITORY VERIFIED:** source, saved assets or reports exist at a pinned revision; not a gameplay pass.
- **NATIVE SETUP REPORT:** a Unity-produced audit records its own bounded setup observations.
- **NOT RUN / NOT REPORTED:** no applicable execution result supplied. Do not promote this from a screenshot, source review or another map's test.
- **UNRELIABLE FLAG:** a known lifecycle error makes a reported field unsuitable as acceptance evidence.

## Canyon baseline

| Area | Evidence | Boundary |
| --- | --- | --- |
| Balanced 101-prop layout | OWNER-REPORTED ACCEPTED | Preserve accepted objects/orientations; no regeneration. |
| Grass, rifle and runner fixes | OWNER-REPORTED ACCEPTED | Preserve current assets and fixes; not an exhaustive performance measurement. |
| Invisible block | OWNER-REPORTED FIXED | Do not reopen as a current known blocker without new evidence. |
| Two PCs on the same Wi-Fi | OWNER-REPORTED PASS for connection, ready/play and sniper/runner turns | LAN only. Does not establish internet/relay behavior, all scoring edge cases or the new Yard. |

## Last Train Yard · pinned generated scene

Source revision: [cc17356](https://github.com/SheesshhOfficial/SnipersAim/commit/cc17356c4afb75c9f539427e4e62719a1138443a). [Audit](https://github.com/SheesshhOfficial/SnipersAim/blob/cc17356c4afb75c9f539427e4e62719a1138443a/Assets/WorkInProgress/LastTrainYard/Arenas/Yard_20261024_123943_cb59cd0030b741649530cfb4a5a68f95/YardAudit.json), timestamp **2026-10-24 12:39:39 UTC**.

| Observation | Recorded result | What it does not establish |
| --- | --- | --- |
| Generated scene/assets/report | REPOSITORY VERIFIED; 181 Yard-only committed files | Native Play Mode or standalone launch. |
| Setup outcome | `NATIVE_SETUP_VALIDATED_NOT_GAMEPLAY_ACCEPTED` | Complete gameplay acceptance. |
| Visual/collision meshes | 6,552 / 478 | FPS, memory use or collision behavior while playing. |
| Material mappings | 17 exact mappings; 11 owned texture sets | Native appearance or lighting bake; procedural Blender details are not fully transferred. |
| Spawn candidates | 110 valid of 113 tested | Full route fairness or network ownership. |
| Placed positions | 7 runners / 8 approvals / 3 practice | A played multiplayer match. |
| Old save/reopen flag | UNRELIABLE FLAG: audit predates lifecycle fix | Successful manual reopen after that fix. |
| Existing canyon protection | Audit records protected files unchanged | Permission to replace/delete accepted canyon content. |

## One retained next check

**Y01 · Pending owner action when resuming:** open the existing Yard scene; add it enabled to the active profile's Scene List preserving old order; Play → Practice Runner; observe ground contact and basic movement. Retain a screenshot and any Console error. **NOT YET REPORTED PASSED.** See [Runbook](runbook.md).

## Other unperformed areas — not an automatic work queue

- Yard route traversal, sniper visibility, hits, laser/scope and goal behavior.
- Yard two-peer multiplayer and internet connectivity.
- Native FPS, memory and visual acceptance for Yard.
- Standalone release build/launch and exhaustive scoring/lifecycle/latency tests.

The accepted canyon LAN result must not be copied into these Yard rows. No new test is mandatory merely because it is listed here; choose later checks only when relevant and authorized.

## Minimal result record

Record result, date, exact revision, exact scene, Editor/player context, steps, observed behavior and a useful screenshot/log. Keep FAIL and unknown results visible. A source patch fixes code, not the historical execution result; a later native pass needs its own evidence.
