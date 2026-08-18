#!/usr/bin/env python3
"""Extract embedded images + geometry spec from the Figma profile SVG export."""
import base64
import json
import os
import re
import sys

SVG = "/Users/yashshah/Desktop/Claude Project/Kartikay - Remotion/public/assets/profile-sheet.svg"
OUT_IMG = "/Users/yashshah/Desktop/Claude Project/Kartikay - Remotion/public/assets/sheet"
OUT_SPEC = "/private/tmp/claude-501/-Users-yashshah/c5e60298-0825-4c82-a552-9203aa028b4a/scratchpad/sheet-spec.json"

os.makedirs(OUT_IMG, exist_ok=True)
s = open(SVG, encoding="utf-8").read()

# ── 1. embedded images ────────────────────────────────────────────────────
images = {}
for m in re.finditer(r'<image id="(image[^"]+)" width="(\d+)" height="(\d+)"[^>]*href="data:image/(\w+);base64,([^"]+)"', s):
    iid, w, h, fmt, b64 = m.groups()
    short = iid.split("_")[0]  # image0, image1...
    path = f"{OUT_IMG}/{short}.{fmt}"
    with open(path, "wb") as f:
        f.write(base64.b64decode(b64))
    images[iid] = {"file": f"{short}.{fmt}", "px_w": int(w), "px_h": int(h)}
print(f"images extracted: {len(images)}")

# ── 2. pattern → image mapping ────────────────────────────────────────────
# <pattern id="patternX"...><use xlink:href="#imageY" transform="..."/></pattern>
pat2img = {}
for m in re.finditer(r'<pattern id="(pattern[^"]+)"[^>]*>\s*<use xlink:href="#(image[^"]+)"[^>]*/>', s):
    pat2img[m.group(1)] = m.group(2)
print(f"patterns: {len(pat2img)}")

# ── 3. all rects (solid + pattern fills) sorted by y ──────────────────────
rects = []
for m in re.finditer(r'<rect ([^>]+?)/?>', s):
    attrs = dict(re.findall(r'([\w:-]+)="([^"]*)"', m.group(1)))
    fill = attrs.get("fill", "")
    entry = {
        "x": float(attrs.get("x", 0)), "y": float(attrs.get("y", 0)),
        "w": float(attrs.get("width", 0)), "h": float(attrs.get("height", 0)),
    }
    if "rx" in attrs: entry["rx"] = float(attrs["rx"])
    if "transform" in attrs:
        t = re.match(r'translate\(([\d.\-]+)\s+([\d.\-]+)\)', attrs["transform"])
        if t:
            entry["x"] += float(t.group(1)); entry["y"] += float(t.group(2))
        else:
            entry["transform"] = attrs["transform"]
    pm = re.match(r'url\(#(pattern[^)]+)\)', fill)
    if pm:
        iid = pat2img.get(pm.group(1))
        entry["image"] = images.get(iid, {}).get("file", iid)
    else:
        entry["fill"] = fill
        if "fill-opacity" in attrs: entry["fillOpacity"] = attrs["fill-opacity"]
    if "stroke" in attrs:
        entry["stroke"] = attrs["stroke"]; entry["strokeW"] = attrs.get("stroke-width", "1")
    rects.append(entry)
rects.sort(key=lambda r: (r["y"], r["x"]))
print(f"rects: {len(rects)}")

# ── 4. circles ────────────────────────────────────────────────────────────
circles = []
for m in re.finditer(r'<circle ([^>]+?)/?>', s):
    attrs = dict(re.findall(r'([\w:-]+)="([^"]*)"', m.group(1)))
    circles.append({"cx": float(attrs.get("cx", 0)), "cy": float(attrs.get("cy", 0)),
                    "r": float(attrs.get("r", 0)), "fill": attrs.get("fill", ""),
                    "stroke": attrs.get("stroke", "")})
circles.sort(key=lambda c: c["cy"])

# ── 5. distinct solid fills (token census) ────────────────────────────────
fills = {}
for m in re.finditer(r'fill="(#[0-9A-Fa-f]{3,8})"', s):
    fills[m.group(1).lower()] = fills.get(m.group(1).lower(), 0) + 1
strokes = {}
for m in re.finditer(r'stroke="(#[0-9A-Fa-f]{3,8})"', s):
    strokes[m.group(1).lower()] = strokes.get(m.group(1).lower(), 0) + 1

# ── 6. filters (shadows) ──────────────────────────────────────────────────
filters = []
for m in re.finditer(r'<filter id="([^"]+)" x="([\d.\-]+)" y="([\d.\-]+)" width="([\d.\-]+)" height="([\d.\-]+)"', s):
    filters.append({"id": m.group(1), "y": float(m.group(3))})

# ── 7. path census by fill w/ first-coord bbox hint ───────────────────────
paths = []
for m in re.finditer(r'<path ([^>]*?)d="([MmLlHhVvCcSsQqTtAaZz0-9.,\s\-]+)"([^>]*?)/?>', s):
    attrs = dict(re.findall(r'([\w:-]+)="([^"]*)"', m.group(1) + " " + m.group(3)))
    d = m.group(2)
    fm = re.match(r'M\s*([\d.\-]+)[ ,]([\d.\-]+)', d)
    if not fm: continue
    paths.append({"x": round(float(fm.group(1)), 1), "y": round(float(fm.group(2)), 1),
                  "len": len(d), "fill": attrs.get("fill", ""), "stroke": attrs.get("stroke", "")})
paths.sort(key=lambda p: (p["y"], p["x"]))

spec = {"images": images, "rects": rects, "circles": circles,
        "fills": dict(sorted(fills.items(), key=lambda kv: -kv[1])),
        "strokes": strokes, "filters": filters,
        "n_paths": len(paths), "paths": paths}
json.dump(spec, open(OUT_SPEC, "w"), indent=1)
print(f"spec → {OUT_SPEC}")
print("top fills:", list(spec["fills"].items())[:15])
print("strokes:", list(strokes.items())[:10])
