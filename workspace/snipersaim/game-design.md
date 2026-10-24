> Historical design specification · 19 October 2026. Preserved as design context, not a current task list. See [Overview](overview.html) and [Test matrix](test-matrix.md) for later accepted canyon/LAN progress and the separate pending Yard check. Game development is paused; this document does not dispatch work.

# SnipersAim game design

Target design and acceptance criteria, recorded 19 October 2026. This specification describes the intended game; it is not a claim that every rule has passed native or multiplayer testing.

## The match

1. Players enter the lobby, ready up and begin a match.
2. A randomized turn order gives each participant exactly one sniper round. All other active participants are runners.
3. A round lasts two minutes. Runners travel through the canyon toward the guarded gate while the sniper watches from the tower.
4. The next turn changes the sniper role and resets the round state.
5. After everyone has taken their sniper turn, show the final scores. Replay must reset the match cleanly.

The first full acceptance target is a complete match on two peers using the same source revision, saved final scene and build configuration. Local practice is useful preparation for that test.

## Roles and controls

| Role | View and movement | Action |
| --- | --- | --- |
| Runner | Third-person view, textured body, camera-relative WASD and mouse look | Space jumps; the body faces actual travel. Reach the gate while avoiding the sniper. |
| Sniper | First-person view, owner body hidden, WASD movement; requested replacement rifle held visibly even unscoped, plus a world-visible weapon for observers | Each RMB click advances 2× → 4× → 6× → off. LMB fires while scoped. |
| Both | Role-appropriate view and input | Escape pauses/unlocks local input; focus and lifecycle transitions must not carry stale movement or scope into the next state. |

The sniper cannot jump in the current movement patch. Movement introduces an explicit platform-edge risk: no automatic rail, recovery teleport or fall-damage rule is implied. Test the intended tower boundaries.

Only the owning player should have an active gameplay camera and audio listener. Other peers still need to see that player's body. Turning the runner's model must not rotate the input basis or disturb aiming.

## Combat and scoring

| Event | Intended outcome |
| --- | --- |
| Headshot | Instant kill; sniper earns 100 points. |
| First body hit on a healthy runner | Runner is slowed; sniper earns 40 points. |
| Second body hit on that wounded runner | Kill; sniper earns 50 points. |
| Runner reaches the gate alive | Runner earns the time remaining in the round. |
| Runner dies | Runner earns 0 escape points for that round. |
| Scoped sniper | Red warning laser is visible, subject to solid geometry blocking. |
| Unscoped sniper | Scope overlay and scoped warning state are cleared. |

The 100 / 40 / 50 values describe scoring events, not an assumed health pool. Native tests must establish rounding of remaining-time points, duplicate-event handling, deadline ordering and consistency on all peers. Do not invent a timeout award or tie-breaker where the rules are not yet confirmed.

Cover must stop the shot and warning-laser endpoint at the nearest valid obstruction. A wider visible laser must not widen the actual hit ray. Scope magnification must not change damage, score or authoritative shot range.

## Canyon goals

- A readable route toward the intended under-tower gate, with genuine cover choices.
- Approximately 3–6 m exposed crossings between useful cover, measured along the route rather than inferred from center-to-center spacing alone.
- Clear tower sightlines with the sniper standing inside the intended covered upper platform.
- A natural distribution of grass with root-pinned wind, without collision that blocks players or shots.
- Ground, boundaries, stairs, openings and cover that support both player movement and accurate shots.
- A replacement for the original rifle, held visibly in the unscoped first-person view and attached visibly for other players; retire the old asset only after checking references.
- A visually coherent textured hero with reviewed character motion. The prepared option uses original procedural bone rotations; anatomy mapping, poses and deformation still need native review. External animation clips are a possible later workflow, not a prerequisite for this prepared approach.

## Current gaps against that target

The existing layout has three boulders approximately 35–38 m apart. That is evidence of sparse cover, not a verified exposed-crossing measurement. The grass remains a rectangular trial patch of 180 clumps. The rifle is still white; replacement and held/unscoped/world-visible presentation are now requested. The hero audit found 25 bone references and one skinned mesh, but no Avatar, Animator or imported animation clips; a boned model alone is not an animated character. A new original procedural-motion tool is prepared locally, with ten preview states and explicit anatomy mapping, but it has not been applied or verified in Unity.

## Definition of an accepted slice

- The saved final scene reopens with intact references and is the intended build startup scene.
- Runner and sniper practice pass on that exact saved scene.
- Both network ownership arrangements pass; all peers use the same revision.
- Every participant gets one sniper turn; combat, escape, timeout and final scores agree.
- Replay, disconnect and rehost do not retain old roles, scope, movement or score.
- A player build has been created and tested; performance evidence is recorded separately from Editor behavior.
- Open visual limitations are listed rather than represented as finished assets.

See [Test matrix](test-matrix.md) for the individual checks and [Sources](sources.md) for the evidence boundaries.
