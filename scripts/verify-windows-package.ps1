$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$version = (Get-Content package.json -Raw | ConvertFrom-Json).version
$binary = 'src-tauri/target/release/sheesshh-workspace.exe'
$installers = @(Get-ChildItem src-tauri/target/release/bundle/nsis/*.exe)
if ($installers.Count -ne 1) { throw 'Expected exactly one newly built NSIS installer.' }
$installer = $installers[0]
$info = (Get-Item $binary).VersionInfo
if ($info.ProductName -ne 'Sheesshh Workspace') { throw "Wrong product: $($info.ProductName)" }
if ($info.CompanyName -ne 'SheesshhOfficial') { throw "Wrong publisher metadata: $($info.CompanyName)" }
if ($info.ProductVersion -notmatch ('^' + [regex]::Escape($version) + '(\.|$)')) { throw 'Wrong binary version.' }
$stage = Join-Path $root 'release-assets'
New-Item -ItemType Directory -Force -Path $stage | Out-Null
$name = "Sheesshh-Workspace-v$version-windows-x64-setup.exe"
Copy-Item $installer.FullName (Join-Path $stage $name)
# Read archive contents only. Never launch or install the generated application.
$seven = Join-Path $env:ProgramFiles '7-Zip/7z.exe'
if (-not (Test-Path $seven)) {
  $command = Get-Command 7z.exe -ErrorAction SilentlyContinue
  if (-not $command) { throw 'Full 7-Zip with NSIS support is required; no software will be installed automatically.' }
  $seven = $command.Source
}
$formats = & $seven i
if ($LASTEXITCODE -ne 0 -or ($formats -join "`n") -notmatch '\bNsis\b') { throw 'Available 7-Zip lacks NSIS archive support.' }
$extract = Join-Path $root ('.cache/installer-inspection-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force -Path $extract | Out-Null
& $seven x $installer.FullName "-o$extract" -y | Out-File (Join-Path $stage 'archive-extraction.txt')
if ($LASTEXITCODE -ne 0) { throw 'NSIS archive inspection failed.' }
$files = @(Get-ChildItem $extract -Recurse -File)
$license = @($files | Where-Object { $_.Name -eq 'LICENSE' -and (Get-Content $_.FullName -Raw) -match 'Mr. Mak Workspace contributors' })
if ($license.Count -lt 1) { throw 'Original MIT attribution missing from installer.' }
if (-not ($files | Where-Object Name -eq 'THIRD_PARTY_NOTICES.md')) { throw 'Third-party notices missing.' }
if (-not ($files | Where-Object Name -eq 'NODE-LICENSE.txt')) { throw 'Node license missing.' }
$bundled = @($files | Where-Object Name -eq 'sheesshh-workspace.exe')
if ($bundled.Count -ne 1) { throw 'Expected one packaged Sheesshh executable.' }
node scripts/verify-nsis-binary.mjs $binary $bundled[0].FullName
if ($LASTEXITCODE -ne 0) { throw 'Packaged executable byte verification failed.' }
$info = $bundled[0].VersionInfo
$mark = @($files | Where-Object Name -eq 'sheesshh-mark.png')
if ($mark.Count -lt 1 -or (Get-FileHash $mark[0].FullName).Hash -ne (Get-FileHash 'public/assets/sheesshh-mark.png').Hash) { throw 'Packaged basketball mark does not match source.' }
# Verify every pinned ECC catalog/provenance/content file survived packaging.
$catalogs = @($files | Where-Object { $_.Name -eq 'catalog.json' -and $_.Directory.Name -eq 'ecc' })
if ($catalogs.Count -ne 1) { throw 'Expected one packaged ECC catalog.' }
$eccRoot = $catalogs[0].Directory.FullName
$sourceEcc = (Resolve-Path 'public/ecc').Path
foreach ($entry in Get-ChildItem $sourceEcc -Recurse -File) {
  $relative = [System.IO.Path]::GetRelativePath($sourceEcc, $entry.FullName)
  $target = Join-Path $eccRoot $relative
  if (-not (Test-Path $target) -or (Get-FileHash $target).Hash -ne (Get-FileHash $entry.FullName).Hash) { throw "ECC packaged file differs: $relative" }
}
Add-Type -AssemblyName System.Drawing
$icon = [System.Drawing.Icon]::ExtractAssociatedIcon($bundled[0].FullName)
if ($null -eq $icon) { throw 'No embedded application icon.' }
$bitmap = $icon.ToBitmap()
$bitmap.Save((Join-Path $stage 'embedded-app-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose(); $icon.Dispose()
$signature = Get-AuthenticodeSignature (Join-Path $stage $name)
$hash = (Get-FileHash (Join-Path $stage $name) -Algorithm SHA256).Hash.ToLowerInvariant()
"$hash  $name" | Set-Content (Join-Path $stage 'SHA256SUMS.txt')
@{
  commit = $env:GITHUB_SHA; version = $version; installer = $name; sha256 = $hash;
  productName = $info.ProductName; companyName = $info.CompanyName;
  authenticodeStatus = $signature.Status.ToString();
  eccCatalogMatch = 'PASS'; archiveInspection = 'PASS'; sourceBasketballMatch = 'PASS'; licenseInspection = 'PASS';
  executableByteComparison = 'PASS (only documented Tauri UNK to NSS marker patch)';
  nativeInstallAndLaunch = 'NOT_RUN'; signing = 'No signing certificate configured or changed'
} | ConvertTo-Json | Set-Content (Join-Path $stage 'build-provenance.json')
Get-Content (Join-Path $stage 'build-provenance.json')
