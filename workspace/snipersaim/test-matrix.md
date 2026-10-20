# SnipersAim test matrix

Updated 20 October 2026 with toolkit publication; native evidence is from 19 October. This card does not execute Unity. PASS below is limited to reported native/local checks; it is not a blanket pass for the latest saved scene or a player build.

## Evidence vocabulary

- **PASS · local report:** the owner/native workflow reported that particular check passed.
- **PASS · geometry:** a native placement query passed; visual and gameplay acceptance remain separate.
- **NOT RUN:** no qualifying execution evidence has been supplied for this acceptance row.
- **OPEN:** a known gap or asset prerequisite is unresolved.
- **Static source check:** checks code contracts or a separate model; it does not execute Unity C#, NGO serialization, rendering or collision.

When a later change affects a passed area, rerun it on the newly saved scene/revision. A screenshot alone cannot prove motion, timing, networking or all-frame behavior.

## Recorded local progress

| Check | Last evidenced result | Limit |
| --- | --- | --- |
| Canyon walking/traversal | PASS · local report | Earlier native environment/walk test; full final route and boundary sweep still needed. |
| Grass wind | PASS · local report | Trial-patch motion; natural scatter and player performance remain open. |
| Textured hero and local role cameras | PASS · local report | Local hero/role test, not a remote-client pass. |
| Production runner and scope cycle | PASS · local report | Local production behavior; no full network matrix. |
| Final scene save/push | Initial `2dddfc0`; latest `e8099cd` | Latest saved position, camera edits and raw hero still need play acceptance. Final scene enabled after Bootstrap. |
| Runner jump | PASS · local report | Full input-reset, collision and latency matrix not established. |
| Sniper WASD | PASS · local report | Tower edge/fall acceptance still required. |
| Runner travel-facing | PASS · local report | Observer presentation and network jitter not established. |
| Earlier interior sniper placement query | PASS · geometry | Feet `(-20.343570, 19.451090, -8.953053)`; eye Y `21.10109`; yaw `352.422°`. Superseded by the saved position below. |
| Latest saved interior marker | Saved in `e8099cd`; play NOT RUN | Feet `(-20.343573, 19.451902, -7.34)`, interior support enabled. Do not transfer the earlier geometry PASS to this position. |
| Hero animation readiness | OPEN · native mapping/poses | Earlier audit: 25 bone references, one skinned mesh, no Avatar/Animator/clips. Original procedural motion is now prepared locally but not applied/verified. |
| Finishing toolkit execution | NOT RUN | Published source and Blender rifle previews exist; 106 source/math checks passed. No Unity compilation, asset generation, rig deformation or multiplayer proof for this toolkit. |

## Next native acceptance rows

| ID | Configuration and action | Required observation | Status |
| --- | --- | --- | --- |
| N01 | Import the exact test revision in Unity 6000.6.5f1 | Zero C#/NGO/shader errors; hydrated LFS assets and intact prefab references. | NOT RUN for the next acceptance revision |
| N02 | Reopen the saved final scene and inspect Build Profiles | Exact scene path first for intended build; final-only NetworkManager/SessionCoordinator/MatchDirector/UI references intact; no additive Bootstrap dependency. | NOT RUN for the latest saved interior edit |
| N03 | Practice Sniper at the interior marker | Support, headroom, opening view, WASD and collision pass; owner body hidden; rifle view usable. | NOT RUN after placement |
| N04 | Practice Runner through the complete route | Ground, walls, cover, stairs and gate are traversable; goal awarded once. | NOT RUN as full-route acceptance |
| N05 | Both roles: pause, alt-tab, leave, replay and respawn | No stuck input, duplicate camera/listener, stale scope or stale jump. | NOT RUN |
| N06 | Runner W/A/S/D/diagonals with different camera yaws | Body follows actual travel; stationary mouse orbit does not turn the body; walls and jumps do not cause spurious heading. | NOT RUN as full matrix |
| N07 | Tap/hold Space through landing, focus loss, life/role changes | One impulse per new press; no stored airborne/reset jump; wounded runner works; sniper cannot jump. | NOT RUN as full matrix |
| N08 | Scope at 16:9, ultrawide and resized viewport | Centered circular overlay and reticle; one step per RMB click; 2×/4×/6×/off; clears at transitions. | NOT RUN as full matrix |
| N09 | Scoped shot/laser at cover, targets and varied distance | Nearest solid cover blocks; visible red laser stops at impact; width does not change hit ray. | NOT RUN |
| N10 | Cover and grass after any layout edit | Measured exposed route gaps, sightlines, ground fit, nonblocking vegetation and stable wind/culling. | NOT RUN |
| N11 | Replacement rifle: unscoped/scoped owner view and remote observer | Held viewmodel remains visible unscoped; world-held weapon visible; materials, aim alignment and role transitions pass. Old asset references audited before deletion. | OPEN |
| N12 | Prepared original procedural motion on the actual hero skin | Fifteen anatomy slots and ten states reviewed; real deformation, neutral poses, twist, sliding, held weapon and lifecycle transitions pass. External clips/Avatar are not required for this prepared approach. | OPEN |

## Multiplayer and rule acceptance

All rows below are **NOT RUN**. Use two rebuilt peers with the same saved final scene and code revision. Practice targets do not substitute for remote ownership.

| ID | Test | Pass condition |
| --- | --- | --- |
| M01 | Host sniper / client runner | Correct owned views and audio; remote bodies visible; movement, scope and jump replicated correctly. |
| M02 | Host runner / client sniper | Reverse ownership and repeat M01; no host-only assumptions. |
| M03 | Dedicated server + two clients, if included in the intended target | No server-owned camera/audio; both clients see one authoritative actor state. |
| M04 | Random turn order through a full match | Each participant is sniper exactly once; roles/cameras reset; round duration is two minutes. |
| M05 | Healthy runner: headshot | Instant kill and 100 sniper points; both peers agree; no duplicate award. |
| M06 | Healthy runner: first body hit, then second | First awards 40 and slows; second awards 50 and kills; further hits do not rescore. |
| M07 | Runner reaches gate | Remaining-time score and safe state agree; repeated trigger entries do not award again. |
| M08 | Runner dies or round deadline is reached | Dead runner earns 0 escape points; deadline and simultaneous hit/escape ordering follow the agreed rules. |
| M09 | Scoped/unscoped warning laser behind cover | Remote runner sees intended scoped warning; endpoint/occlusion/state clear correctly. |
| M10 | Replay, disconnect, leave/rehost and late join | No stale score/role/input; lifecycle rules hold; useful errors instead of scene-hash or serialization failures. |
| M11 | Latency, jitter and input ordering | At 50/150/300/500 ms RTT plus jitter/loss, accepted actions occur once and stale ones drop; record actual behavior rather than promise every press succeeds. |
| M12 | Full-match final scores | The displayed results equal recorded combat and escape events after every sniper turn. |

## Player build and release gate

| ID | Check | Status |
| --- | --- | --- |
| B01 | Fresh build output with exact scene first; launch and practice smoke | NOT RUN |
| B02 | Same-revision host/client build match and lifecycle test | NOT RUN |
| B03 | Frame-time, memory, collider cooking and long-view grass behavior | NOT RUN |
| B04 | No missing assets/scripts/materials; retained credits/licenses reviewed | NOT RUN |
| B05 | Accepted revision, reproducible build instructions and remaining issues recorded | NOT RUN |

A build log is not proof of a playable build. A standalone launch is not proof of multiplayer. Large serialized collision assets are not measurements of runtime memory.

## Record each execution

Copy this compact record for each row:

- Test ID and result: PASS / FAIL / NOT RUN
- Date, tester and exact code revision
- Saved scene path, scene revision/hash and enabled build scene list
- Unity/package versions; Editor or player build; host/client role and machine
- Preconditions and steps
- Expected versus actual result
- Relevant log excerpt and screenshot/recording filename
- Fix or follow-up, plus which prior passes need rerunning

Never replace NOT RUN with PASS from a source-code review, geometry query or unrelated earlier test. Keep failure evidence and report blockers before broadening the fix.
