#!/usr/bin/env python3
"""Emit extracted.ts v3 — proper tree walk. Each captured element is emitted
wrapped in its REAL ancestor <g> chain (transform/clip-path/filter/fill/stroke/
opacity preserved in order), so inheritance and group transforms behave exactly
as in the original export. Element positions are computed through the composed
transform matrix, so capture boxes match true on-canvas coordinates."""
import json, re
import xml.etree.ElementTree as ET

SVG = "/Users/yashshah/Desktop/Claude Project/Kartikay - Remotion/public/assets/profile-sheet.svg"
OUT = "/Users/yashshah/Desktop/Claude Project/Kartikay - Remotion/src/sheet/extracted.ts"
NS = "{http://www.w3.org/2000/svg}"
XLINK = "{http://www.w3.org/1999/xlink}"

TEXT_FILLS = {"#1C1C1E", "#2C2C2E", "#48484A", "#6C6C70", "#8E8E93", "#0B0B0D"}
BOXES = {
    "statusBar":   (0, 10, 393, 48, False, False),
    "topActions":  (10, 52, 383, 108, False, False),
    "carouselDots":(140, 290, 255, 325, False, False),
    "gLogo":       (15, 744, 58, 788, False, False),
    "chevMore":    (18, 842, 58, 882, False, False),
    "cfIcon":      (8, 893, 62, 957, True, False),
    "extArrowCF":  (344, 893, 384, 940, False, False),
    "chart":       (-460, 975, 350, 1310, True, False),
    "spikeShare":  (343, 1398, 385, 1448, False, False),
    "shareLink":   (24, 1838, 64, 1900, False, False),
    "shareCards":  (40, 1830, 60, 1935, True, False),
    "shareArrow1": (328, 1838, 372, 1900, False, False),
    "sharePdf":    (24, 1928, 64, 1974, False, False),
    "shareArrow2": (328, 1928, 372, 1974, False, False),
    "octocat":     (12, 2023, 66, 2088, False, False),
    "extArrowGH":  (344, 2038, 384, 2085, False, False),
    "langBar":     (14, 2448, 380, 2472, False, False),
    "chevRepos":   (348, 2642, 384, 2678, False, False),
    "gauge":       (95, 4678, 300, 4802, True, False),
    "checkA":      (86, 4820, 114, 4852, True, False),
    "checkB":      (67, 4850, 95, 4884, True, False),
    "qMark":       (43, 4882, 74, 4918, True, False),
    "nsDoc":       (55, 5055, 95, 5105, True, False),
    "nsLink":      (176, 5058, 220, 5112, True, False),
    "nsPdf":       (296, 5055, 338, 5105, True, False),
    "pillX":       (38, 5712, 62, 5744, True, True),
    "pillDoc":     (196, 5685, 240, 5735, True, True),
    "pillChat":    (286, 5685, 346, 5750, True, True),
    "tabTal":      (18, 5790, 74, 5834, False, False),
    "tabHand":     (104, 5792, 142, 5836, False, False),
    "tabChat":     (184, 5792, 222, 5836, False, False),
    "tabDots":     (258, 5798, 286, 5830, False, False),
    "avatarRing":  (330, 5796, 364, 5832, True, False),
    "aiTiles1":    (70, 4240, 322, 4318, False, False),
    "aiTiles2":    (58, 4335, 322, 4430, False, False),
}
# ancestor attrs worth preserving on wrapper <g>s
G_ATTRS = ("transform", "clip-path", "filter", "fill", "stroke", "stroke-width",
           "opacity", "fill-opacity", "stroke-opacity", "fill-rule", "clip-rule", "style")

def parse_transform(t):
    m = [1, 0, 0, 1, 0, 0]  # a b c d e f
    def mul(m1, m2):
        a1, b1, c1, d1, e1, f1 = m1
        a2, b2, c2, d2, e2, f2 = m2
        return [a1 * a2 + c1 * b2, b1 * a2 + d1 * b2, a1 * c2 + c1 * d2,
                b1 * c2 + d1 * d2, a1 * e2 + c1 * f2 + e1, b1 * e2 + d1 * f2 + f1]
    for fn, args in re.findall(r'(\w+)\(([^)]*)\)', t or ""):
        v = [float(x) for x in re.split(r'[ ,]+', args.strip()) if x]
        if fn == "translate":
            m = mul(m, [1, 0, 0, 1, v[0], v[1] if len(v) > 1 else 0])
        elif fn == "scale":
            m = mul(m, [v[0], 0, 0, v[1] if len(v) > 1 else v[0], 0, 0])
        elif fn == "matrix":
            m = mul(m, v)
        elif fn == "rotate" and len(v) == 1:
            import math
            r = math.radians(v[0])
            m = mul(m, [math.cos(r), math.sin(r), -math.sin(r), math.cos(r), 0, 0])
    return m

def apply(m, x, y):
    return m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]

def first_point(el):
    tag = el.tag.replace(NS, "")
    if tag == "path":
        fm = re.match(r'M\s*([\d.\-]+)[ ,]([\d.\-]+)', el.get("d", ""))
        return (float(fm.group(1)), float(fm.group(2))) if fm else None
    if tag == "rect":
        return (float(el.get("x", 0)), float(el.get("y", 0)))
    if tag == "circle":
        return (float(el.get("cx", 0)), float(el.get("cy", 0)))
    if tag == "line":
        return (float(el.get("x1", 0)), float(el.get("y1", 0)))
    return None

def ser(el):
    tag = el.tag.replace(NS, "")
    parts = [f"<{tag}"]
    for k, v in el.attrib.items():
        k = k.replace(XLINK, "xlink:")
        parts.append(f' {k}="{v}"')
    parts.append("/>")
    return "".join(parts)

tree = ET.parse(SVG)
root = tree.getroot()
groups = {n: [] for n in BOXES}
counter = [0]

DRAW_TAGS = {NS + t for t in ("path", "rect", "circle", "line")}
_dc_cache = {}
def drawable_count(g):
    key = id(g)
    if key not in _dc_cache:
        _dc_cache[key] = sum(1 for d in g.iter() if d.tag in DRAW_TAGS)
    return _dc_cache[key]

def eff_fill(el, chain):
    f = el.get("fill")
    if f is not None:
        return f
    for anc in reversed(chain):
        f = anc.get("fill")
        if f is not None:
            return f
    return "none"  # root svg fill="none"

def walk(el, chain, mat):
    tag = el.tag.replace(NS, "")
    if tag in ("defs", "pattern", "mask", "clipPath", "image", "use"):
        return
    if tag in ("path", "rect", "circle", "line"):
        counter[0] += 1
        pos = counter[0]
        fill = el.get("fill", "")
        if "pattern" in fill:
            return
        pt = first_point(el)
        if pt is None:
            return
        own = parse_transform(el.get("transform"))
        # full matrix = ancestors ∘ own
        full = [mat[0] * own[0] + mat[2] * own[1], mat[1] * own[0] + mat[3] * own[1],
                mat[0] * own[2] + mat[2] * own[3], mat[1] * own[2] + mat[3] * own[3],
                mat[0] * own[4] + mat[2] * own[5] + mat[4], mat[1] * own[4] + mat[3] * own[5] + mat[5]]
        x, y = apply(full, pt[0], pt[1])
        f = eff_fill(el, chain).upper()
        fo = min(float(el.get("fill-opacity", "1") or 1), float(el.get("opacity", "1") or 1))
        for name, (x0, y0, x1, y1, exText, exWhite) in BOXES.items():
            if not (x0 <= x <= x1 and y0 <= y <= y1):
                continue
            if exText and f in TEXT_FILLS and fo >= 0.5:
                continue
            if exWhite and ("WHITE" in f or f == "#FFFFFF"):
                continue
            # wrap in the real ancestor chain (only attrs that matter)
            open_tags, close_tags = [], []
            for anc in chain:
                kept = {k: v for k, v in anc.attrib.items() if k in G_ATTRS}
                if "filter" in kept and drawable_count(anc) > 2:
                    del kept["filter"]
                if kept:
                    open_tags.append("<g " + " ".join(f'{k}="{v}"' for k, v in kept.items()) + ">")
                    close_tags.append("</g>")
            raw = "".join(open_tags) + ser(el) + "".join(reversed(close_tags))
            groups[name].append((pos, raw))
        return
    if tag in ("svg", "g"):
        own = parse_transform(el.get("transform"))
        nmat = [mat[0] * own[0] + mat[2] * own[1], mat[1] * own[0] + mat[3] * own[1],
                mat[0] * own[2] + mat[2] * own[3], mat[1] * own[2] + mat[3] * own[3],
                mat[0] * own[4] + mat[2] * own[5] + mat[4], mat[1] * own[4] + mat[3] * own[5] + mat[5]]
        nchain = chain + [el] if tag == "g" else chain
        for ch in el:
            walk(ch, nchain, nmat)

walk(root, [], [1, 0, 0, 1, 0, 0])

s = open(SVG, encoding="utf-8").read()
dm = re.search(r'<defs>(.*)</defs>', s, re.S)
defs = re.sub(r'<image [^>]*?/>', "", dm.group(1))
defs = re.sub(r'<pattern .*?</pattern>', "", defs, flags=re.S)
defs = re.sub(r'\n\s*\n', "\n", defs)

out = ["// AUTO-GENERATED by emit_v3.py — verbatim vector slices from the Figma SVG",
       "// export, each wrapped in its true ancestor <g> chain (inheritance + group",
       "// transforms + display-p3 styles preserved). Do not hand-edit.",
       "export type ExtGroup = { bbox: [number, number, number, number]; raw: string };",
       "export const EXT: Record<string, ExtGroup> = {"]
empty = []
for name, els in groups.items():
    x0, y0, x1, y1, _, _ = BOXES[name]
    els.sort(key=lambda t: t[0])
    raw = "".join(r for _, r in els)
    if not els:
        empty.append(name)
    out.append(f"  {name}: {{ bbox: [{x0}, {y0}, {x1}, {y1}], raw: {json.dumps(raw)} }},")
out.append("};")
out.append("export const DEFS_RAW = " + json.dumps(defs) + ";")
open(OUT, "w").write("\n".join(out) + "\n")
print("empty groups:", empty or "none")
print("el counts:", {n: len(g) for n, g in groups.items()})
