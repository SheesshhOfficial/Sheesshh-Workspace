# Cat On Delivery (COD)

Updated 28 October 2026. Original learning-game project; not an official VOPA product.

## Brief status

COD is now a playable Unity Editor prototype, not planning-only. Current scope: Class 1 English, Cloud City, five houses and three questions per house. Classes 1–5 remain the longer-term goal. Fixed-route airship travel, hints/retry, delivery celebrations, replay safeguards and local progress are implemented.

The authored Unity scene is `Assets/COD/Editable/Authoring/CODEditableGame.unity`: twelve persistent screen prefabs plus Shell, with typed presenter bindings rather than runtime layout reconstruction. Stop Play to save designer edits. Keep the legacy scene as rollback; never regenerate over the Authoring directory.

## Latest local work and evidence

Pip has six transparent Greeting frames at 6 fps. Owner Home/Map/Greeting layouts are preserved. Full-city and focused checks completed on 27 October at about 22:04 UTC. A preflight on 28 October at 05:15 UTC confirmed all 18 product files still matched that validated copy by SHA; it did not rerun the tests. Validation passed 111 infrastructure checks and a full-city Editor flow with eleven captures, exit 0, empty errors and a clean source guard. Animation checks covered six-frame advance, reduced-motion stillness, hidden-screen stop and replay reset; other recipients did not receive Pip’s six-frame loop.

Private game repository: `SheesshhOfficial/Vopa.LearningGarden`, branch `cod/visual-preview`, last confirmed pushed baseline `1400f1f` (27 October). Latest Pip/layout changes are LOCAL AND UNCOMMITTED. The validation copy being clean does not mean those local changes were pushed. This public repository contains workspace documentation, not the private game source.

## Remaining work

379 narration clips are prepared but not integrated or audibly quality-checked. Repeated cottage art and a bear placeholder remain. Editor results do not certify real touch/device behavior, Windows/Android release builds, accessibility or classroom suitability. Client demo prepared; outcome unconfirmed.

PC execution uses GPT-6 Luna with low reasoning for minimal pinned jobs/report files; parent planning/code review remains separate. The general `run.bat` background utility is paused, not deployed: Python access denied; dependencies approved but none installed.

## Workspace

[Brief overview](../../workspace/vopa-learning-game/overview.html) · [Game & Architecture](../../workspace/vopa-learning-game/game-plan.html) · [Edit & Run Guide](../../workspace/vopa-learning-game/implementation.html) · [Art & Animation](../../workspace/vopa-learning-game/animation-assets.html) · [Status & Evidence](../../workspace/vopa-learning-game/taskboard.html)

[Historical concepts](../../workspace/vopa-learning-game/concepts.html) · [Original draft reviews](../../workspace/vopa-learning-game/uploaded-assets.html) · [Original references](../../workspace/vopa-learning-game/references.html) · [Ideas history](../../workspace/vopa-learning-game/ideas-history.html) · [Earlier prototype](../../workspace/vopa-learning-game/runbook.html)

## Preservation

All twelve concept images, ten uploaded draft originals, seven reference screenshots and gallery data are unchanged. Historical reviews still apply to their exact originals, not later production derivatives. This update adds no media, raw logs, private usernames or game-source files and does not change other projects or ECC.
