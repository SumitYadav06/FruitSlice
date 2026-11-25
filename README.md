# Fruit Slice

Swipe to slice fruit — waves, Fruit Frenzy, combos, ads-only, free game

**Package (Android application ID):** `com.fruitslice.game`

## Play it

Open `www/index.html` in a browser — no build step needed for the web version.

## Build the Android APK (GitHub Actions)

Every push to `main` runs `.github/workflows/build-apk.yml` and produces a
debug APK (`fruitslice-debug-apk`). For a signed release APK, add these repo
secrets (Settings → Secrets and variables → Actions) once:

- `ANDROID_KEYSTORE_BASE64` — base64 of your `.keystore` file
- `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`

Then the workflow also uploads `fruitslice-release-apk`. Keep the keystore
file and its passwords safe — without them, later updates cannot be signed
with the same key.

## Ads — AdMob (real IDs added 2026-11-25)

Earning is ads-only (video ads, no pop-ups, no paid Premium):

- App Open ad — once, when the app opens
- Banner — Home screen only, never while playing
- Interstitial — after every 3rd level (Fruit Slice: after every 2nd game)
- Rewarded video — only when the player taps Watch Ad (hint / unlock)

Real AdMob IDs are now in the marked **ADMOB** config block in
`www/index.html` (search for `ADMOB`): `appId`, `bannerUnitId`,
`interstitialUnitId`, `rewardedUnitId`, `appOpenUnitId`. Real ads only run
after the APK is built and uploaded.

Note: the `rewardedUnitId` is stored in the config, but Fruit Slice
currently has no Watch Ad / rewarded placement that uses it (no Watch Ad
button in the game). Do not assume rewarded ads run — adding one would
need a real game change, not just the ID.
Each game has its own AdMob app and its own IDs; IDs from another game
do not work here.
