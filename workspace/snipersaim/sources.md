# Current source record · 24 October 2026

This update reconciles the card with owner reports and read-only repository evidence. **No Unity execution was performed while authoring it.** The source record below from 19–20 October remains historical, including its then-current pending work.

## Current pinned revisions

- [Game main / generated Yard scene and audit · cc17356](https://github.com/SheesshhOfficial/SnipersAim/commit/cc17356c4afb75c9f539427e4e62719a1138443a) — verified current main during this update; 181 Yard-only committed files, raw FBXs excluded.
- [Pull-only source package and native builder · 89cd6d4](https://github.com/SheesshhOfficial/SnipersAim/commit/89cd6d4e229649d5bd87b8b21b6040dbd28dae20).
- [Save/reopen lifecycle fix · 0a54ab1](https://github.com/SheesshhOfficial/SnipersAim/commit/0a54ab1ac1deba5deacfd896be7b30c5da8d3708).
- [Reconstructible raw FBX ignore policy · 46dfd1e](https://github.com/SheesshhOfficial/SnipersAim/commit/46dfd1e0615954fd7ab877a3de61146a737853b2).
- [Generated YardAudit.json](https://github.com/SheesshhOfficial/SnipersAim/blob/cc17356c4afb75c9f539427e4e62719a1138443a/Assets/WorkInProgress/LastTrainYard/Arenas/Yard_20261024_123943_cb59cd0030b741649530cfb4a5a68f95/YardAudit.json) — 12:39:39 UTC, Unity 6000.6.5f1; setup counts, hashes and remaining unperformed checks.

The audit's `nativeSaveReopenPassed` field predates the lifecycle fix and must not be treated as reliable reopen acceptance. Its native setup outcome is explicitly not gameplay acceptance. A later manual Practice Runner result has not been supplied.

## Owner-reported progress and decisions

The owner's conversation reports accept the balanced 101-prop canyon, grass, rifle and runner fixes, and mark the invisible block fixed. The owner also reports connection, ready/play and role turns working on two PCs, then confirms both were on the same Wi-Fi. These are labeled owner-reported LAN results; no public transcript, internet test or independently replayed test is invented.

Current preference: assistant prepares scoped changes and pushes; owner performs Unity steps. Antigravity workflow disabled, watcher paused, ECC optional Use once only. Game work is paused; this request updates Workspace documentation, not the game or installer.

## Card-update verification

Fresh main and relevant file hashes were checked before editing. Static card/registry, local-reference, preservation and template checks are recorded with the update. No new native Unity test is claimed. Wide/narrow browser rendering and light/dark interaction were not rerun: this cloud environment's browser launch is blocked. Existing shared report styles/scripts and unchanged images are retained.

For a clean repository-backed Workspace, pull the content update and refresh the existing card. Preserve local edits and stop on conflicts; installing a new EXE is neither needed nor a substitute for updating the selected workspace folder.

---

## Historical sources and checks · 19–20 October 2026

# SnipersAim sources and provenance

This project card is an owner-authorized progress record prepared on 19 October 2026 and updated with verified toolkit publication on 20 October 2026. It combines the supplied project brief, reported native observations, selected original screenshots and project documentation. It does not claim independent Unity execution during workspace authoring.

## Primary source

[SheesshhOfficial / SnipersAim](https://github.com/SheesshhOfficial/SnipersAim)

- Local project: `G:\Unity Projects\SnipersAim`
- Intended final scene: `Assets/SniperAim/Scenes/SnipersAim.unity`
- Selected versions: Unity 6000.6.5f1, Universal Render Pipeline 17.6, Netcode for GameObjects 2.13.3, Input System 1.20
- Latest published user source: [e8099cd294936d5f8a6b171db62954383c281f20](https://github.com/SheesshhOfficial/SnipersAim/commit/e8099cd294936d5f8a6b171db62954383c281f20), “last change before sleep”
- Final scene push before the later marker edit: [2dddfc0](https://github.com/SheesshhOfficial/SnipersAim/commit/2dddfc0)

The [History](history.md) tab links the earlier supplied revision anchors. Short commit links are identifiers from the project record, not newly inferred dates or claims of a complete current branch audit.

## Source documentation reviewed

These project-relative documents informed the workflow and evidence boundaries. Use the pinned source revision for the recorded state; later repository documentation may supersede it.

- [REVIEWED_INTERIOR_SPAWN.md](https://github.com/SheesshhOfficial/SnipersAim/blob/a49f29346933b009efa8597c1efc2f692029ce3f/WorkInProgress/REVIEWED_INTERIOR_SPAWN.md): targeted marker workflow, measured feet versus model pivot, guardrails, Undo and native acceptance.
- [PLAYER_MOVEMENT.md](https://github.com/SheesshhOfficial/SnipersAim/blob/a49f29346933b009efa8597c1efc2f692029ce3f/WorkInProgress/PLAYER_MOVEMENT.md): authoritative movement, jump resets, travel-facing and same-revision peer requirements.
- [PROJECT_ORGANIZATION.md](https://github.com/SheesshhOfficial/SnipersAim/blob/a49f29346933b009efa8597c1efc2f692029ce3f/WorkInProgress/PROJECT_ORGANIZATION.md): final-scene migration and dependency-safe cleanup.
- [CANYON_ARENA.md](https://github.com/SheesshhOfficial/SnipersAim/blob/a49f29346933b009efa8597c1efc2f692029ce3f/WorkInProgress/CANYON_ARENA.md): native generator, scene/build registration and separate multiplayer checks.
- [PRODUCTION_ROLE_CAMERAS.md](https://github.com/SheesshhOfficial/SnipersAim/blob/a49f29346933b009efa8597c1efc2f692029ce3f/WorkInProgress/PRODUCTION_ROLE_CAMERAS.md): owner-only views, scope behavior and historical local-versus-network distinctions.
- [PRODUCTION_HERO_MATERIAL.md](https://github.com/SheesshhOfficial/SnipersAim/blob/a49f29346933b009efa8597c1efc2f692029ce3f/WorkInProgress/PRODUCTION_HERO_MATERIAL.md): dedicated material binding and audited hero renderer.
- [CANYON_STAGE.md](https://github.com/SheesshhOfficial/SnipersAim/blob/a49f29346933b009efa8597c1efc2f692029ce3f/WorkInProgress/CANYON_STAGE.md): environment preparation, initial cover and 180-clump grass trial.
- [WARNING_LASER.md](https://github.com/SheesshhOfficial/SnipersAim/blob/a49f29346933b009efa8597c1efc2f692029ce3f/WorkInProgress/WARNING_LASER.md): visible laser width versus authoritative ray and native occlusion checks.

Earlier source documents describe tests as NOT RUN at the time they were written. The newer owner-reported local checks are identified separately in this card. Neither historical wording nor a later screenshot upgrades unperformed multiplayer or release tests to PASS.

## Published toolkit source; native acceptance pending

Status: **published at 02e4d5cc99a2785007c0da626a3bd4e9c7e0bc7e; native acceptance pending**. Exact menu strings were checked in the local `Assets/WorkInProgress/Editor/Completion/` source. Prepared instructions are `WorkInProgress/COMPLETION_RUNBOOK.md`, `COMPLETION_COVER_GRASS.md`, `CHARACTER_MOTION.md` and `PLAYER_PRESENTATION.md`. The local workflow and its two Blender previews do not establish Unity compilation or native execution. Toolkit commit [02e4d5c](https://github.com/SheesshhOfficial/SnipersAim/commit/02e4d5cc99a2785007c0da626a3bd4e9c7e0bc7e) is verified published on main, based on the owner's `e8099cd` scene snapshot. Its 106 source/math checks pass; no GitHub Actions runs or native Unity passes are claimed.

## Screenshot record

| Local card asset | Supplied original | What it establishes |
| --- | --- | --- |
| `assets/runner-canyon.png` | `game-1.png` | A local runner Game view with textured hero, canyon, sparse cover and HUD. |
| `assets/tower-platform-reference.png` | `game-2.png` | Editor context for the covered upper tower platform. |
| `assets/hero-interior-reference.png` | `marker.png` | A selected raw hero reference inside the platform, not the final measured production spawn. |
| `assets/kestrel-art-blender.png` | `WorkInProgress/Previews/kestrel_art_BLENDER_NOT_UNITY.png` | Original authored rifle geometry rendered in Blender; not Unity output. |
| `assets/kestrel-first-person-blender.png` | `WorkInProgress/Previews/kestrel_first_person_BLENDER_NOT_UNITY.png` | Same-source held-weapon/glove composition in Blender; not native camera or gameplay evidence. |

Every selected image was visually inspected before inclusion. Images are copied without pixel edits. The two rifle previews are original project-authored geometry rendered in Blender; the Unity screenshots and Blender renders are explicitly separated in the gallery. [Asset manifest](assets/manifest.json) records dimensions, original names, SHA-256 and provenance. Capture date is the supplied progress date, not a date inferred from file modification metadata.

## Credits and licensing boundary

The game belongs to the owner's SheesshhOfficial/SnipersAim project. Screenshots depict that project and its existing assets; including them does not transfer or replace third-party asset licenses. Keep the source repository's asset notices, original metadata and creator credits intact. Individual model/texture authors and license terms were not supplied in the brief, so none have been invented. Verify redistribution rights before packaging source assets or a public release.

The surrounding Sheesshh Workspace uses its existing shared report system. This addition leaves existing repository and third-party notices intact and adds no paid generation, account setup or external runtime dependency.

## Workspace authoring checks

Static checks passed for the eight-tab registry entry, HTML document/viewport/shared-style structure, Markdown headings, local reference targets, image dimensions/decoding and byte-identical image copies. The repository template and shared-skill consistency checks also passed. External links were reviewed as source identifiers but were not all fetched live.

Browser rendering at 390 px, 768 px and desktop widths, Dark/Light interaction, image preview controls and downloads have **not been exercised** for this card because the available preview environment was blocked. The reports use the existing shared theme and lightbox code, with responsive local layout, but that is not an interaction-test pass. No Unity or game test was executed while authoring this card.

## Updating this record

Update the existing card rather than creating a second SnipersAim card. Keep its original creation date, advance `updated` after substantive changes, preserve source links, and record the exact revision and evidence scope when a pending test passes. Update the finishing-toolkit publication state only after a real published commit and its verification status are confirmed. Keep historical screenshots clearly labeled as progress.
