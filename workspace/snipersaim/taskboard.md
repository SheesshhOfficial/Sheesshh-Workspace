# SnipersAim taskboard

Updated 24 October 2026 · **Paused**. This is a retained handoff, not a new gameplay task dispatch.

## Accepted baseline — preserve, do not redo

| Area | Evidence and decision |
| --- | --- |
| Canyon obstacles | Owner accepted the balanced 101-prop layout. No regeneration. |
| Grass and rifle | Owner accepted the current presentation. No return to the old trial-grass/white-rifle backlog. |
| Runner / invisible block fixes | Owner reported the fixes good and the invisible block resolved. Preserve them. |
| Two-PC multiplayer | Owner reported connection, ready/play and sniper/runner turns working on the same Wi-Fi. LAN only; internet and exhaustive rules are not inferred. |

## Saved next action — only when the owner resumes

Open the existing committed Last Train Yard scene, add it enabled to the active Build Profile Scene List **without reordering existing entries**, then check Practice Runner ground contact and basic movement. Follow the exact path and stop points in the [Runbook](runbook.md). The result has not yet been reported passed.

## Last Train Yard progress

| Work | Status / limit |
| --- | --- |
| Authored v3 yard | 160 × 220 footprint, SW/NE design orientation, 256 added props; separate from the accepted canyon. |
| Source package and native builder | Published at `89cd6d4`; not an instruction to rerun the builder. |
| Save/reopen lifecycle fix | Published at `0a54ab1`; the older audit's reopen flag is not reliable proof. |
| Generated-file ignore policy | `46dfd1e` keeps reconstructible raw FBXs out of Git while preserving metadata. |
| Generated scene, dependencies and audit | User committed `cc17356`: 181 Yard-only files including metadata/textures/report; raw FBXs excluded. |
| Initial setup audit | Native setup counts recorded; no later manual Practice Runner acceptance reported. |
| Yard gameplay / FPS / multiplayer | NOT RUN or not reported. Not a mandatory checklist before unrelated work. |

## Working rules

- Assistant makes bounded, evidence-backed changes and pushes; owner follows explicit Unity steps.
- Antigravity workflow disabled and watcher paused; no background runner.
- ECC optional, on demand, Use once; it does not automatically control Unity.
- Do not replace the canyon, change default startup, delete dependencies or regenerate obstacles.
- Keep old design/history/screenshots as dated references, not current work orders.
- No deadlines, owners, new mechanics or further gameplay work are invented here.

See [Sources](sources.md) for revision links and [Test matrix](test-matrix.md) for evidence boundaries.
