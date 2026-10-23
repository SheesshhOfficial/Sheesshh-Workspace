# Sheesshh basketball edition 0.5.3

The Windows installer is rebuilt from source, not a renamed upstream executable.
The approved black-and-gold basketball mark is shared by Workspace, Chats,
Windows taskbar/shortcut resources, installer, web favicon and mobile icons.

## Build

The scoped `Build Sheesshh basketball installer` GitHub Actions workflow builds
only Windows and uploads an artifact. It does not publish a release, create a
tag, configure signing credentials, or install/run the app. The artifact contains
`Sheesshh-Workspace-v0.5.3-windows-x64-setup.exe`, a SHA-256 checksum, embedded
application icon preview and provenance naming the exact source commit.

No code-signing certificate is configured. Publisher metadata says
SheesshhOfficial, but is not a verified Authenticode signature. Windows may warn
about an unsigned or unfamiliar application; do not bypass warnings automatically.

## Reproduce icons

`npm run icons:generate` uses the existing Python 3 / Pillow icon toolchain and
the approved `public/assets/sheesshh-mark.png` master. It installs nothing.
Legacy icon entry points delegate to the same generator. Existing compatibility
asset URLs remain supported. The original source artwork is not overwritten.

## Preservation

The application identifier and state directories are unchanged, and no chat
history, credentials, personal project data or workspace cards are deleted.
The personalized Sheesshh 64 starter is still a credited sample, not a claim that
Sheesshh created the original artwork. MIT and third-party attribution are
included in the packaged runtime. Existing 0.5.2 installer is retained in Git.

## Verification boundaries

Branding checks verify version/metadata, paired ICOs, required frame sizes and
license preservation. The Windows job inspects the NSIS archive, compares the
packaged executable and basketball asset with the build inputs, records PE
metadata/signature status, and writes a checksum. Installing and launching on
the user's computer is not performed by this workflow. A passing frontend build
alone is not proof of a successful native installer.
