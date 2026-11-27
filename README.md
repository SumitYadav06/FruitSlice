# Fruit Slice

Swipe to slice fruit — waves, Fruit Frenzy, combos, ads-only, free game

**Package (Android application ID):** `com.fruitslice.game`

## Play it

Open `www/index.html` in a browser — no build step needed for the web version.

## Build the Android APK (GitHub Actions)

Every push to `main` runs `.github/workflows/build-apk.yml` and produces a
debug APK (`fruitslice-debug-apk`). A signed release APK is a separate job
later — the workflow has no signing/keystore step, so do not promise one.

## Ads — Unity Ads (since 2026-11-27; the previous network was fully removed)

Earning is ads-only (video ads, no pop-ups, no paid Premium):

- Banner — Home screen only, never while playing (real native banner,
  320×50 pinned to the bottom). No reserved empty ad space: there is no
  placeholder box on Home — the banner only takes space when a real
  banner is actually showing.
- Interstitial — after every 2nd game over (real ad first,
  3-second demo overlay only as fallback)
- Rewarded video — only when the player taps Watch Ad (Continue on the
  game-over screen, once per run; knife unlocks; daily double); the
  reward is granted only when Unity reports the ad watched to the end
  (COMPLETED)
- No App Open: Unity Ads has no app-open format, so there is no
  app-open ad slot at all (nothing shows on cold start)

**The IDs in `www/index.html` are the real Fruit Slice Unity IDs**
(Android Game ID `800457128`, placements `BP_Rewarded_Android`,
`BP_Interstitial_Android`, `BP_Banner_Android`, created 2026-11-27 —
no store URL was needed at signup). Each game has its own Unity app
and its own IDs; IDs from another game do not work here.

**Integration:** Unity Ads Android SDK 4.18.0 through a minimal local
Capacitor plugin in `plugins/unity-ads/` (no maintained npm plugin for
Unity Ads exists, so the plugin is written here: `initialize` / load /
show + `BannerView`, wrapped in JS as `window.UnityAdsNative`). The
workflow verifies the wiring on every build (plugin registered, Game
ID + 3 placements present, no old-network IDs) and fails the build
otherwise. Release build uses `testMode: false`.

## What's new — growth pack (2026-11-25)

`www/` is now ~13.5 MB, so the APK is ~21 MB (base Capacitor + Unity Ads +
LocalNotifications ~7.5 MB). Every added megabyte is real content the
player sees, hears or plays — no dummy padding:

- **Art — 8 generated images in `www/assets/` (~5.1 MB):** splash art on
  Home, win/celebration art on a new best score, a fruit-feast gallery
  image on Home, and 5 full-screen game backgrounds that change as you
  play — day (waves 1–2), sunset (waves 3–4), night (wave 5+), a calm zen
  garden for Zen mode, and a stormy arena for Hard mode. Art is
  lazy-loaded after first paint so the first load stays fast; all assets
  are local, the game works fully offline.
- **Music — 3 original tracks in `www/assets/audio/` (~8.3 MB):**
  `music-sunny.mp3` (Classic, 121 s, cheerful C-major), `music-sunset.mp3`
  (Zen, 121 s, calm A-minor), `music-night.mp3` (Hard, 103 s, driving
  D-minor). Each track plays on loop for its mode and obeys the existing
  Music toggle. **Licence: 100% original — composed and synthesized from
  scratch by the assistant with numpy/ffmpeg (no samples, no external or
  commercial music), so they are safe for Uptodown upload and for
  monetisation with no copyright-strike risk.** The old WebAudio melody
  remains only as a fallback if a file cannot load.
- **Sound effects — 6 original synthesized SFX (~0.08 MB):** slice, splat
  (missed fruit), bomb, win fanfare, combo chime, click. Same original /
  royalty-free status as the music; they obey the existing Sound toggle,
  with the WebAudio synth as fallback.
- **New content:** 6 new fruits with distinct canvas art and behaviour —
  dragon fruit (11 pts), coconut (11 pts, slow/heavy), blueberry (6 pts,
  small/fast), peach (9 pts), plum (8 pts), pear (9 pts) — taking the
  total from 9 to 15 fruit types. Two new modes on Home: **Zen** (60
  seconds, no bombs, missed fruit costs no life, own best score) and
  **Hard** (2 lives, faster fruit, up to ~32% bombs, storm theme). New
  wave pattern: a 3-fruit "rain" burst at the start of every 3rd wave.
  Classic slicing, waves, Fruit Frenzy, combos, best score/combo
  persistence, pause and the rewarded Continue are unchanged.
