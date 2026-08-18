# Tal Profile Scroll — Remotion template

A 720×900 @60fps Remotion video: the Tal candidate profile (rebuilt in code,
pixel-exact to a Figma export) rises from below as a 75%-width card, glides
through the whole profile in one continuous ease, grows past full-bleed, rests
on the tab bar, and loops seamlessly. Ships as mp4 (1440×1800) + GIF.

## Quickstart

```bash
npm install
npm run dev        # Remotion Studio preview
npm run render     # ProfileSheet → out/profile-sheet.mp4 (60fps, 2×, crf16)
npm run gif:final  # mp4 → palette GIF (30fps)
```

## Compositions

| ID | What |
|---|---|
| `ProfileSheet` | THE video — logo intro → code-rebuilt profile scroll (26s/1560f @60) |
| `SheetCrop` | Dev rig: renders the raw SVG export at 3×, `--props='{"y":<pt>}'` |
| `CodeCrop` | Dev rig: renders the CODE rebuild at 3× at the same offsets — diff these two to verify accuracy |
| `ProfileScroll`(+Short) | Legacy 30fps component build (pre-rebuild; inaccurate below the hero) |

## Architecture (how accuracy works)

Ground truth = `public/assets/profile-sheet.svg`: a **manual Figma export** of
the profile frame (393×5880, text outlined, photos embedded as base64). Do a
manual export from the Figma app — the MCP clamps tall frames and burns quota.

Everything visual was machine-extracted from that file:

- `src/sheet/extracted.ts` — verbatim vector slices (status bar, icons, chart
  line + glow, gauge, language bar, tab bar) emitted by `scripts/emit_v3.py`.
  Each element is wrapped in its **real ancestor `<g>` chain** so inheritance,
  group transforms, display-p3 styles and filters behave exactly as exported.
- `src/sheet/heatmap.ts` — exact 17×7 contribution grid, pixel-sampled from a
  3× `SheetCrop` render (`scripts/sample_heatmap.py`).
- `public/assets/sheet/image0..12.png` — the 13 embedded photos, decoded by
  `scripts/extract_sheet.py` (also dumps a rect/geometry census JSON).
- `src/sheet/tokens.ts` — the export's hex → display-p3 map (`c()` helper; the
  export paints wide-gamut, plain hex looks desaturated), SF + Didot stacks.
- `src/sheet/sections/*.tsx` — one file per section; copy transcribed from 3×
  crops; live text set in SF Pro (macOS system font) so it stays editable.
- `src/SheetReveal.tsx` — all motion. Timing authored in **seconds** (`sec()`),
  so fps changes don't retime. Scroll = quad-in → linear → quad-out with
  velocity-continuous joints (`scrollP`); knobs at the top of the file
  (`COVER_START/END/DONE`, `SCROLL_DUR`, `RAMP`, `END_OVERSHOOT`).

## Retargeting this template (new candidate / new design)

1. In the Figma app: select the tall profile frame → Export → **SVG**
   (outline text ON, include images). Drop it at
   `public/assets/profile-sheet.svg`.
2. `python3 scripts/extract_sheet.py` → decodes photos to
   `public/assets/sheet/`, writes the geometry census.
3. `python3 scripts/emit_v3.py` → regenerates `src/sheet/extracted.ts`.
   Adjust the `BOXES` capture rectangles if section positions moved.
4. Re-render heatmap sample: `npx remotion still SheetCrop out/crop-heat.png
   --props='{"y":<heatmap offset>}'` then `python3 scripts/sample_heatmap.py`.
5. Update copy/anchors in `src/sheet/sections/*` (y-positions in design pt).
6. **Verify**: render `SheetCrop` and `CodeCrop` at the same y offsets
   (0, 735, 1470, … 5145) and compare until they match. Don't skip this.

## Extraction gotchas (each cost real debugging time)

1. Fragment `<svg>`s must set `fill="none"` — the export's root svg carries it
   and stroke-only icons inherit it; otherwise they render as filled blobs.
2. Elements inside transformed `<g>`s keep LOCAL coords — compose ancestor
   transforms when positioning/capturing or they paint at (0,0).
3. Strip `filter` from ancestor groups wrapping >2 drawables (card-level
   shadows re-applied per element = phantom halos). Keep dedicated ≤2-drawable
   filter wrappers (chart glow, tile shadows).
4. Low-opacity fills (e.g. an icon tile = `#1C1C1E` at `opacity=0.05`) must
   survive any dark-color exclusion filters.
5. GIF reality: 26s of full-frame scroll can't go under ~30MB at 30fps/540w.
   The mp4 is the shareable; cut length/width if a hard GIF cap exists.

## Rules

- Every animated value is a pure function of `useCurrentFrame()`. No CSS
  transitions/animations, no `Math.random()`, no `Date.now()`.
- Assets via `<Img src={staticFile(...)}>` only.
- All hex lives in `src/theme.ts` (canvas) and `src/sheet/tokens.ts` (sheet).
