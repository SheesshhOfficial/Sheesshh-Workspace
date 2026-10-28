# NIPUN Tarang

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
