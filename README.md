# Kartikay — Tal Boss Profile Scroll (Remotion)

A vertical phone-frame scroll-through of the Tal candidate profile, rendered as a
looping GIF + mp4 for landing pages, LinkedIn, and outbound decks. The feel: a
calm, deliberate product walkthrough that pauses on the moments that sell.

## Compositions

| ID | Duration | Purpose |
|---|---|---|
| `ProfileScroll` | 14s (420f @30) | Full walkthrough |
| `ProfileScrollShort` | ~10s (300f @30) | Landing-hero cut: hero → Codeforces → Tal Score |

Both accept `showDeviceFrame: boolean` (default `true`). `false` = full-bleed, no bezel, for embedding in other mockups.

## How it was built (important)

The source design is Figma node **`3221:32062`** ("Page sheet", 938×11395) in the
Tal Creatives file. It's a **component rebuild** (not a scrolled screenshot) —
which is what makes the signature animations possible (you can't count a score up
or draw a chart on a flat image). The **real photos, logos, résumé and trophy**
were pulled from Figma via `download_assets` and live in `public/assets/`; colors
come from `get_variable_defs`.

**Figma MCP note:** the Starter plan has a **low tool-call quota**. When it's
exhausted, `download_assets` errors and `get_screenshot` returns empty 1×1 stubs
(this is what made the first pass look "blocked" — it wasn't, it was throttled).
Pull assets in small batches; if you hit the wall, wait for the quota to reset or
upgrade. A few section numbers (Codeforces rating, GitHub count, language %) are
still assumed (`⚠` in `src/data.ts`) — grab them on the next quota window.

- **`src/theme.ts`** — all design tokens, pulled from Figma `get_variable_defs`
  (iOS grey system + Blue `#3078bf`, Green heatmap ramp, Creme). **No hex lives
  anywhere else.**
- **`src/layout.ts`** — composition geometry (786-wide phone screen in 1080×1920).
- **`src/data.ts`** — section order + heights + derived offsets, and all
  **candidate content**. Values marked `⚠` are assumed (Figma used unreadable
  generic layers, or filled from the brief) — see the manifest below.
- **`src/timeline.ts`** — **the single scroll-timing knob** (see retuning).
- **`src/sections/*`** — one component per section (`Hero`, `Stats`,
  `Experience`, `Codeforces`, `Spike`, `Share`, `Github`, `Visual`, `AIStack`,
  `TalScore`, `Concierge`), plus `Section` (positions + entrance) and
  `SectionColumn` (registry).
- **`src/chrome/*`** — fixed status bar, tab bar, floating action pills.

All animation is a pure function of `useCurrentFrame()` (no CSS transitions, no
`Math.random()` — heatmap uses `random(seed)` from remotion). Follows the
installed `remotion-best-practices` skill.

## Run

```bash
npm install
npm run dev        # remotion studio — preview
```

## Render

```bash
npm run render         # ProfileScroll → out/profile.mp4 (h264, crf 18)
npm run gif            # ProfileScroll → out/profile.gif (fast, Path A)
npm run render:short   # ProfileScrollShort → out/profile-short.mp4
```

**Higher-quality GIF (Path B — mp4 → ffmpeg palette, usually smaller & cleaner):**

```bash
ffmpeg -i out/profile.mp4 -vf "fps=15,scale=540:-1:flags=lanczos,split[s0][s1];\
[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" \
  -loop 0 out/profile-optimized.gif
gifsicle -O3 --lossy=60 --colors 128 out/profile-optimized.gif -o out/profile-final.gif
```

Target: **< 5MB**. If over: `--colors 96` → scale 480 → 12fps → trim pauses
(never cut the Tal Score or Codeforces beats).

## Retuning the scroll

**All timing lives in `src/timeline.ts`.** `FULL_STOPS` / `SHORT_STOPS` are lists
of `{ f, id, beat? }` — each stop names a section and its scrollY is derived from
the real section offset via `centerScroll(id)`, so pauses always land centred.
Repeat a section id to hold (pause). Motion uses per-segment
`Easing.bezier(0.32, 0, 0.16, 1)`. Section heights (which drive the offsets) are
in `src/data.ts → SECTION_H`.

## Asset manifest

**Real Figma assets** in `public/assets/` (pulled via `download_assets`):
- `logo-porter.png`, `logo-swiggy.png` — company logos (hero + experience)
- `logo-claude-code.png`, `logo-codex.png`, `logo-cursor.png` — AI stack
- `logo-github.svg` — octocat · `trophy.png` — Top 1% · `award.png` — spare
- `photo-candidate.png` — "Check out Kabir" block · `resume-doc.png` — concierge
- Colors → `src/theme.ts` (`get_variable_defs`)
- Real copy: name, role, **stats ₹35 LPA / 4 years / BLR**, "Top 1%", GitHub repos, AI tools, Tal Score 92, résumé CTA

**⚠ Still assumed** (unreadable "Content" layers; blocked by quota — pull on the next window):
- Codeforces rating value + series shape
- GitHub contribution count + language %s
- Swiggy role/period; Spike body (truncated in Figma)

**Name:** the mockup mixes "Kabir Arora" (hero) and "Sanchit" (later); standardized on **Kabir Arora**.

## Status

- [x] Runnable project, both compositions, all 11 sections real
- [x] Signature animations: Codeforces line-draw + count, GitHub heatmap wave +
      language bars, Spike scale-in, Tal Score 92 count + ring
- [x] Seamless loop (uniform dissolve to bg at the wrap)
- [x] Both variants rendered + optimized (Path B) under 5 MB; determinism verified
- [ ] Real photos/logos + final copy pass on the `⚠` values (needs source assets)
