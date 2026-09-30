#!/usr/bin/env python3
"""Premium About plates: AI craft bases + optically centered Inter typography.

Run: python3 scripts/build-about-plates.py

Requires base renders at:
  /opt/cursor/artifacts/assets/about-system-base-v3.jpg
  /opt/cursor/artifacts/assets/about-arch-base-v3.jpg
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path("/workspace")
FONT_DIR = Path("/usr/share/fonts/truetype/macos")
BLUE = (0, 102, 255)
WHITE = (255, 255, 255)
MUTE = (150, 155, 165)
MUTE2 = (112, 118, 128)
FILL = (16, 18, 22)

SYSTEM_BASE = Path("/opt/cursor/artifacts/assets/about-system-base-v3.jpg")
ARCH_BASE = Path("/opt/cursor/artifacts/assets/about-arch-base-v3.jpg")


def font(weight: str, size: int) -> ImageFont.FreeTypeFont:
    files = {
        "reg": "Inter-Regular.ttf",
        "semi": "Inter-SemiBold.ttf",
        "bold": "Inter-Bold.ttf",
    }
    return ImageFont.truetype(str(FONT_DIR / files[weight]), size)


def optical_text(draw, cx, cy, text, fnt, fill, *, nudge_x=0.0, nudge_y=1.7):
    """Center by glyph ink bbox; nudge_y pulls caps into optical center."""
    bb = fnt.getbbox(text)
    x = cx - (bb[0] + bb[2]) / 2 + nudge_x
    y = cy - (bb[1] + bb[3]) / 2 + nudge_y
    draw.text((x, y), text, font=fnt, fill=fill)


def detect_cards(arr: np.ndarray):
    h, w, _ = arr.shape
    g = arr[:, :, 0].astype(int)
    mask = (g >= 16) & (g <= 40) & (arr[:, :, 2] < 70)
    mask[:, w // 2 :] = False
    mask[:110, :] = False
    mask[h - 90 :, :] = False
    visited = np.zeros(mask.shape, dtype=bool)
    boxes = []
    H, W = mask.shape
    for y in range(H):
        for x in np.where(mask[y] & ~visited[y])[0]:
            if visited[y, x]:
                continue
            stack = [(y, x)]
            visited[y, x] = True
            cells = []
            while stack:
                cy, cx = stack.pop()
                cells.append((cy, cx))
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < H and 0 <= nx < W and mask[ny, nx] and not visited[ny, nx]:
                        visited[ny, nx] = True
                        stack.append((ny, nx))
            if len(cells) < 400:
                continue
            ys = [c[0] for c in cells]
            xs = [c[1] for c in cells]
            x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
            bw, bh = x1 - x0, y1 - y0
            if 55 <= bw <= 260 and 28 <= bh <= 120 and bh < bw * 0.95:
                boxes.append((x0, y0, x1, y1, len(cells)))
    boxes.sort(key=lambda b: -b[4])
    kept = []
    for b in boxes:
        overlap = False
        for k in kept:
            ix0, iy0 = max(b[0], k[0]), max(b[1], k[1])
            ix1, iy1 = min(b[2], k[2]), min(b[3], k[3])
            if ix1 > ix0 and iy1 > iy0 and (ix1 - ix0) * (iy1 - iy0) > 0.2 * (b[2] - b[0]) * (b[3] - b[1]):
                overlap = True
                break
        if not overlap:
            kept.append(b)
    kept = kept[:8]
    kept.sort(key=lambda b: (b[1] // 50, b[0]))
    return kept


def compose_system() -> Image.Image:
    if not SYSTEM_BASE.exists():
        raise SystemExit(f"Missing base: {SYSTEM_BASE}")
    base = Image.open(SYSTEM_BASE).convert("RGBA").resize((1600, 900), Image.Resampling.LANCZOS)
    arr = np.array(base.convert("RGB"))
    cards = detect_cards(arr)
    print(f"left cards: {len(cards)}")

    img = base.copy()
    draw = ImageDraw.Draw(img)

    draw.text((78, 48), "THE OLD MODEL", font=font("semi", 12), fill=MUTE)
    draw.text((78, 74), "Tactics in pieces.", font=font("bold", 36), fill=WHITE)
    draw.text((856, 48), "THE KINEXIS MODEL", font=font("semi", 12), fill=BLUE)
    draw.text((856, 74), "One growth system.", font=font("bold", 36), fill=WHITE)

    labs = ["Ads", "Blog", "Email", "Silos", "Website", "SEO", "Content", "Social"]
    for i, (x0, y0, x1, y1, _) in enumerate(cards):
        lab = labs[i] if i < len(labs) else f"N{i}"
        draw.rounded_rectangle(
            [x0 + 10, y0 + 8, x0 + 10 + max(54, len(lab) * 9), y0 + 30],
            radius=4,
            fill=(20, 22, 26),
        )
        draw.text((x0 + 14, y0 + 10), lab, font=font("semi", 13), fill=WHITE)

    hub = (1196, 440)
    hub_w, hub_h = 168, 78
    node_r = 46
    nodes = [
        ("SEO", 1200, 180),
        ("PAID", 1413, 308),
        ("WEB", 1413, 568),
        ("CRO", 1192, 700),
        ("EMAIL", 970, 568),
        ("DATA", 978, 308),
    ]

    draw.rounded_rectangle(
        [hub[0] - hub_w / 2, hub[1] - hub_h / 2, hub[0] + hub_w / 2, hub[1] + hub_h / 2],
        radius=14,
        fill=FILL,
        outline=BLUE,
        width=2,
    )
    optical_text(draw, hub[0], hub[1] - 11, "KINEXIS", font("bold", 16), WHITE, nudge_y=1.2)
    optical_text(draw, hub[0], hub[1] + 13, "SYSTEM", font("bold", 13), BLUE, nudge_y=1.2)

    for lab, x, y in nodes:
        # Erase AI double-ring, redraw single crisp node
        draw.ellipse([x - node_r - 6, y - node_r - 6, x + node_r + 6, y + node_r + 6], fill=(0, 0, 0))
        draw.ellipse(
            [x - node_r, y - node_r, x + node_r, y + node_r],
            fill=FILL,
            outline=BLUE,
            width=2,
        )
        f = font("semi", 11 if len(lab) >= 5 else 13)
        nx = 1.0 if len(lab) >= 5 else 0.5
        optical_text(draw, x, y, lab, f, WHITE, nudge_x=nx, nudge_y=1.7)

    draw.text(
        (78, 830),
        "Bought separately. Measured separately. Rarely connected.",
        font=font("reg", 13),
        fill=MUTE2,
    )
    draw.text(
        (856, 830),
        "Every channel feeds the next. Revenue is the filter.",
        font=font("reg", 13),
        fill=MUTE2,
    )

    out = img.crop((0, 50, 1600, 850)).convert("RGB")
    verify(out, [(lab, x, y - 50) for lab, x, y in nodes], node_r)
    return out


def compose_arch() -> Image.Image:
    if not ARCH_BASE.exists():
        raise SystemExit(f"Missing base: {ARCH_BASE}")
    base = Image.open(ARCH_BASE).convert("RGBA").resize((1600, 900), Image.Resampling.LANCZOS)
    img = base.copy()
    draw = ImageDraw.Draw(img)

    boxes = [
        (938, 118, 1182, 249),
        (1183, 210, 1425, 340),
        (1171, 541, 1425, 679),
        (1010, 680, 1179, 764),
        (764, 541, 958, 644),
        (764, 250, 937, 340),
    ]
    labels = [
        ("SEO", "Organic discovery"),
        ("PAID", "Acquisition"),
        ("WEB", "Conversion"),
        ("CRO", "Friction out"),
        ("EMAIL", "Retention"),
        ("DATA", "Intelligence"),
    ]
    cx = sum((a + c) / 2 for a, b, c, d in boxes) / 6
    cy = sum((b + d) / 2 for a, b, c, d in boxes) / 6

    draw.text((72, 64), "ARCHITECTURE", font=font("semi", 12), fill=BLUE)
    draw.text((72, 100), "Six channels.", font=font("bold", 40), fill=WHITE)
    draw.text((72, 148), "One loop.", font=font("bold", 40), fill=WHITE)
    draw.text((72, 214), "Nothing runs alone — each channel", font=font("reg", 15), fill=MUTE)
    draw.text((72, 236), "makes the others sharper.", font=font("reg", 15), fill=MUTE)
    draw.text(
        (72, 830),
        "Add a channel and the rest get sharper — not busier.",
        font=font("reg", 13),
        fill=MUTE2,
    )

    draw.ellipse([cx - 56, cy - 56, cx + 56, cy + 56], fill=(0, 0, 0))
    optical_text(draw, cx, cy - 12, "GROWTH", font("bold", 14), WHITE, nudge_y=1.2)
    optical_text(draw, cx, cy + 10, "LOOP", font("bold", 14), BLUE, nudge_y=1.2)
    draw.ellipse([cx - 3.5, cy + 30, cx + 3.5, cy + 37], fill=BLUE)
    draw.ellipse([cx - 10, cy + 24, cx + 10, cy + 44], outline=BLUE, width=1)

    for (x0, y0, x1, y1), (lab, sub) in zip(boxes, labels):
        draw.rounded_rectangle([x0, y0, x1, y1], radius=12, fill=FILL, outline=BLUE, width=2)
        ncx, ncy = (x0 + x1) / 2, (y0 + y1) / 2
        optical_text(draw, ncx, ncy - 2, lab, font("bold", 14), BLUE, nudge_y=1.2)
        optical_text(draw, ncx, ncy + 18, sub, font("reg", 12), MUTE, nudge_y=1.0)

    return img.crop((0, 50, 1600, 850)).convert("RGB")


def verify(img: Image.Image, nodes, r: float) -> None:
    arr = np.array(img)
    print("circle label ink centroids (target ~0, +0..+2):")
    for lab, cx, cy in nodes:
        xs, ys = [], []
        rr = r - 12
        for y in range(int(cy - rr), int(cy + rr) + 1):
            for x in range(int(cx - rr), int(cx + rr) + 1):
                if (x - cx) ** 2 + (y - cy) ** 2 > rr * rr:
                    continue
                if not (0 <= y < arr.shape[0] and 0 <= x < arr.shape[1]):
                    continue
                p = arr[y, x]
                if p[0] > 200 and p[1] > 200 and p[2] > 200:
                    xs.append(x)
                    ys.append(y)
        if xs:
            print(f"  {lab}: dx={np.mean(xs)-cx:+.2f} dy={np.mean(ys)-cy:+.2f}")


def export(img: Image.Image, png: Path, webp: Path, sm: Path | None = None) -> None:
    img.save(png, "PNG", optimize=True)
    img.save(webp, "WEBP", quality=95, method=6)
    if sm:
        img.resize((960, int(960 * img.height / img.width)), Image.Resampling.LANCZOS).save(
            sm, "WEBP", quality=92, method=6
        )
    print(f"wrote {webp.name} {img.size} {webp.stat().st_size}b")


def main() -> None:
    system = compose_system()
    arch = compose_arch()
    export(
        system,
        ROOT / "public/assets/images/agency/about-system.png",
        ROOT / "public/assets/images/agency/about-system.webp",
        ROOT / "public/assets/images/agency/about-system-sm.webp",
    )
    export(
        arch,
        ROOT / "public/assets/images/editorial/about-architecture-plate.png",
        ROOT / "public/assets/images/editorial/about-architecture-plate.webp",
    )
    Path("/tmp/about-plates").mkdir(parents=True, exist_ok=True)
    system.save("/tmp/about-plates/system-preview.png")
    arch.save("/tmp/about-plates/arch-preview.png")
    print("done")


if __name__ == "__main__":
    main()
