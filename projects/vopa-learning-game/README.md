# NIPUN Tarang

## Reference Android checkpoint · 30 October 2026, 20:02 UTC

**Reference Android APK built; package checks passed, gameplay QA still pending.** Reviewed 50-path scene/prefab/art checkpoint `98c2489837c9d3712ff86f9d5aa9bdd1ac33cd6d` is now pushed to `nipun/development` in the private game repository and remote-verified.

- **55,274,002 bytes (55.27 MB)**; Unity succeeded with **zero errors, 975 warnings**. ZIP integrity, zipalign and signature checks passed.
- ARM64, debug-signed, `com.vopa.nipuntarang.preview`, minimum SDK 26 / target SDK 36.
- SHA-256: `E37AF087591014302E065EDFA87428F8F71266195F16D5CC439C203F3E28AFE8`.
- Compared with the earlier 50,406,676-byte baseline APK: **+4,867,326 bytes (+9.66%)**. This new APK is the reference build; the earlier one remains baseline evidence.
- WebGL remains **29,493,316 bytes**. No phone installation, gameplay acceptance or browser play QA has been completed. Browser-QA preflight is ongoing.
- No COD runtime asset sources appeared in the build evidence. Detailed compressed categories are in [Delivery & Acceptance](../../workspace/vopa-learning-game/nipun-delivery.html); shared code/assets still prevent reliable exact per-game or 48-game size forecasts.

Next: complete browser preflight and actual browser interaction, narration and reference review, followed by device installation/gameplay checks. Build/package validation is not playable-game acceptance. Preserve manual FortMap/layout edits and Game 1-specific requirements. This documentation-only update publishes no private artwork, game files or raw logs.

Earlier checkpoints below remain preserved history; this update supersedes their “not pushed” and “reference APK not built” statements.

## Reference build checkpoint · 30 October 2026, 08:44 UTC

**Reference WebGL built; browser play QA has not run.** Source checkpoint `5c4fe12b11374035a1d491ee8fb40013388d2d54` includes the eight-symbol renderer repair. Clean import: zero errors. EditMode: **40/40 passed, zero failed, zero skipped**. This does not establish playable or visually accepted gameplay.

- Reference WebGL: **29,493,316 bytes (29.49 MB)** versus the earlier 49,872,128 bytes—approximately **41% smaller**.
- Generated independently editable Game 1 Home, Stage and MathFly reference prefabs. All **31 existing prefab hashes and the original Pages scene remained unchanged**. Eight day/night assets moved with GUIDs preserved.
- Browser play QA **not run**, blocked by local-server launch restrictions.
- New reference Android APK **not built yet**: generated assets need a reviewed source checkpoint and build-mutated URP settings recovery first. The **50,406,676-byte APK is still the earlier baseline**, not this reference build.
- Next: review/checkpoint generated source and assets, recover build-mutated settings, build the reference APK, and verify real browser/device interaction, narration and reference matching.
- Daily limit remains OFF; ten-second questions, three lives, three cumulative correct answers per stage and four stages remain unchanged. Preserve supplied-reference composition, Game 1-specific art and the owner's FortMap edits.

This documentation-only update publishes no private game source, client artwork, screenshots or raw logs. The earlier checkpoints below are preserved as history; this update supersedes their older test/build and source-status statements.

## Earlier status · 30 October 2026 UTC

The reference-faithful remake is **in progress, not yet visually verified**. The Android baseline builds; that is not installation, device QA, or full gameplay acceptance.

- Match the supplied day/night gameplay references: four colored bottom answer buttons in a 2 × 2 arrangement, the client purple bird, and a pillar gap on the right. Game 1 Home uses the client Home UI atlas; stage selection uses castle-style nodes for four stages. Keep art Game 1-specific and preserve the owner's FortMap layout/prefab edits.
- Daily 40-minute limit is **OFF**. Ten-second question timing, three lives, three cumulative correct answers per stage and four stages remain unchanged.
- Local native checkpoint `78ea0fa5f34a959bca1ea85419930ac37ce17959`: import and 29 EditMode tests passed; visibility repair covers 11 active preview-page assets with Home-only root activation. Three earlier PlayMode tests timed out; Editor rules tests are not full UI QA.
- Removed 234 COD files from the active local project with an external archive retained; the old Resources pack was a bloat source. No COD sources appeared in the APK BuildReport. Public historical workspace pages/media remain unchanged.
- Android baseline: ARM64 IL2CPP, debug-signed, `com.vopa.nipuntarang.preview`, minimum SDK 26 / target 36, **50,406,676 bytes**. CRC passed for 599 entries; apksigner v2 passed. Build had zero errors and 975 warnings, mainly shaders. Not installed or device-tested.
- Older web build: 49,872,128 bytes; it does not validate the latest reference remake. APK size breakdown and its limitations are in [Delivery & Acceptance](../../workspace/vopa-learning-game/nipun-delivery.html).
- The native checkpoint has not yet been pushed to the game repository; the original remains at `448eba8` with owner prefab edits. This update publishes documentation only, not private game source or client assets.
- Six forts × eight games is a **future 48-game plan**, not delivered content. Shared assets prevent a reliable exact per-game/48-game size projection. API/on-demand asset delivery is planned, not implemented.

Next: finish the reference-faithful iteration, compare actual Unity renders against the references, then validate navigation, answers/timeout, instructions, retry/rewards and a new build. Preserve all manual layout changes. The older plan below is retained as history; this current status supersedes conflicting statements.

## Historical brief · 28 October 2026

Updated 28 October 2026. This is the active replacement direction for the existing VOPA learning-game workspace card. COD pages and media are preserved as historical records, not deleted or silently repurposed.

## Brief status

Retain the client’s Tarang fort theme. Build editable Unity screens for a portrait browser/WebGL target. English text and spoken explanations are current scope; keyed text/audio support future Marathi settings. Learner age and syllabus remain unconfirmed.

Home Play selects the earliest unfinished curriculum stage, not the last visited game. Explore shows six sequential forts with only Fort 1 initially unlocked. Fort 1 has eight named sequential game slots; the demo implements MathFly and NumberLineJump while the other six remain locked. No NIPUN implementation or browser-build validation is claimed yet.

## Confirmed rules

- Four sequential stages per implemented game; three cumulative correct answers per stage.
- Three lives per attempt. A wrong answer OR ten-second question timeout loses one life and produces a new question; retry resets the current stage attempt, not completed progress.
- Start the question timer after narration. First-use instructions and Home/gameplay i buttons pause the question timer, not the daily wall clock.
- MathFly answer buttons move a flapping bird, with no collision penalties; random day/night per attempt. NumberLineJump asks before/after with options.
- One star per stage, one sticker per completed game; no duplicate replay rewards. All eight games are required for a fort flag, so the two-game demo cannot award it.
- Single local anonymous profile; a 40-minute wall-clock window from first daily open, local-midnight reset, finish the current question at expiry then block further questions. Backend enforcement is later work.

## Source and assets

Private game branch `nipun/development` was created from `cod/visual-preview`. The client uploaded `Client Game Assets` containing StartPage, FortPage, Fort1, MathFly reference material/sprite sheets, DayBG/NightBG and a bird MP4. The intended new local clone and asset integration are not yet verified. COD’s eighteen local Pip/layout files remain preserved and unpushed.

This public update contains descriptive documentation only: no private source, client asset copies, new generated art, screenshots or raw logs.

## Delivery and verification

Latest requested target: Sunday, 1 November 2026; show earlier if ready. First prove editable navigation and one narrated MathFly stage, then both games, progress/rewards, daily-window behavior and a real WebGL browser run. A target is not a completion promise. COD’s historical Editor tests do not validate NIPUN gameplay or browser behavior.

## Workspace

[Brief overview](../../workspace/vopa-learning-game/nipun-overview.html) · [Detailed game plan](../../workspace/vopa-learning-game/nipun-design.html) · [Delivery and acceptance](../../workspace/vopa-learning-game/nipun-delivery.html)

[Historical COD overview](../../workspace/vopa-learning-game/overview.html) · [Historical COD architecture](../../workspace/vopa-learning-game/game-plan.html) · [Historical COD editing guide](../../workspace/vopa-learning-game/implementation.html) · [Historical COD evidence](../../workspace/vopa-learning-game/taskboard.html) · [Original references](../../workspace/vopa-learning-game/references.html)

All existing media and gallery JSON remain unchanged; unrelated projects and ECC are untouched. The prior COD README snapshot is retained in `COD-HISTORY.md`.
