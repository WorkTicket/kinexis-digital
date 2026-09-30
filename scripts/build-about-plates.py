#!/usr/bin/env python3
"""Premium About plates: AI craft base + optically centered Inter typography."""

from __future__ import annotations

import math
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


def font(weight: str, size: int) -> ImageFont.FreeTypeFont:
    files = {
        "reg": "Inter-Regular.ttf",
        "med": "Inter-Medium.ttf",
        "semi": "Inter-SemiBold.ttf",
        "bold": "Inter-Bold.ttf",
    }
    return ImageFont.truetype(str(FONT_DIR / files[weight]), size)


def optical_text(draw, cx, cy, text, fnt, fill, *, nudge_x=0.0, nudge_y=1.4):
    """Center by glyph ink bbox; nudge_y pulls caps optically into the circle."""
    bb = fnt.getbbox(text)
    x = cx - (bb[0] + bb[2]) / 2 + nudge_x
    y = cy - (bb[1] + bb[3]) / 2 + nudge_y
    draw.text((x, y), text, font=fnt, fill=fill)


def fill_circle(draw, cx, cy, r, fill=FILL, outline=None, width=2):
    box = [cx - r, cy - r, cx + r, cy + r]
    draw.ellipse(box, fill=fill, outline=outline, width=width if outline else 0)


def fill_rrect(draw, box, radius=12, fill=FILL, outline=None, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width if outline else 1)


def crop_2x1(img: Image.Image) -> Image.Image:
    """Center-crop 1600x900 → 1600x800."""
    w, h = img.size
    if h == 800:
        return img
    top = max(0, (h - 800) // 2)
    return img.crop((0, top, w, top + 800))


def compose_system() -> Image.Image:
    base = (
        Image.open("/opt/cursor/artifacts/assets/about-system-base-v3.jpg")
        .convert("RGBA")
        .resize((1600, 900), Image.Resampling.LANCZOS)
    )
    img = base.copy()
    draw = ImageDraw.Draw(img)

    # Calibrated from blob detection on 1600×900 base
    hub = (1196, 440)
    hub_w, hub_h = 168, 78
    node_r = 44
    nodes = [
        ("SEO", 1200, 180),
        ("PAID", 1413, 308),
        ("WEB", 1413, 568),
        ("CRO", 1192, 700),
        ("EMAIL", 970, 568),
        ("DATA", 978, 308),
    ]

    # Clear + redraw hub for clean stacked type
    fill_rrect(
        draw,
        [hub[0] - hub_w / 2, hub[1] - hub_h / 2, hub[0] + hub_w / 2, hub[1] + hub_h / 2],
        radius=14,
        fill=FILL,
        outline=BLUE,
        width=2,
    )
    optical_text(draw, hub[0], hub[1] - 11, "KINEXIS", font("bold", 16), WHITE, nudge_y=1.1)
    optical_text(draw, hub[0], hub[1] + 13, "SYSTEM", font("bold", 13), BLUE, nudge_y=1.1)

    # Nodes: clear interior, single crisp ring, optically centered labels
    fn = font("semi", 13)
    fn_sm = font("semi", 11)
    for lab, x, y in nodes:
        fill_circle(draw, x, y, node_r, fill=FILL, outline=BLUE, width=2)
        f = fn_sm if len(lab) >= 5 else fn
        nx = 1.2 if len(lab) >= 5 else 0.6
        optical_text(draw, x, y, lab, f, WHITE, nudge_x=nx, nudge_y=1.15)

    # Headers / captions
    draw.text((78, 48), "THE OLD MODEL", font=font("semi", 12), fill=MUTE)
    draw.text((78, 74), "Tactics in pieces.", font=font("bold", 36), fill=WHITE)
    draw.text((856, 48), "THE KINEXIS MODEL", font=font("semi", 12), fill=BLUE)
    draw.text((856, 74), "One growth system.", font=font("bold", 36), fill=WHITE)

    # Left card labels — positions from grid inspection of the blank base
    left_labels = [
        (110, 158, "Ads"),
        (300, 148, "Blog"),
        (500, 178, "Email"),
        (210, 288, "Silos"),
        (420, 330, "Website"),
        (110, 418, "SEO"),
        (340, 488, "Content"),
        (500, 618, "Social"),
    ]
    fl = font("semi", 13)
    for lx, ly, lab in left_labels:
        draw.rounded_rectangle([lx - 4, ly - 4, lx + 78, ly + 22], radius=5, fill=(18, 20, 24))
        draw.text((lx, ly), lab, font=fl, fill=WHITE)

    # y≈830 → ~780 after center-crop to 800
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

    out = crop_2x1(img).convert("RGB")

    # Verify ink centroids after crop (nodes shift by -50 y)
    dy = 50
    check_nodes = [(lab, x, y - dy) for lab, x, y in nodes]
    verify(out, check_nodes, node_r)
    return out


def compose_arch() -> Image.Image:
    base = (
        Image.open("/opt/cursor/artifacts/assets/about-arch-base-v3.jpg")
        .convert("RGBA")
        .resize((1600, 900), Image.Resampling.LANCZOS)
    )
    img = base.copy()
    draw = ImageDraw.Draw(img)

    # Calibrated blue-border comps on 1600×900, ordered clockwise from top
    boxes = [
        (938, 118, 1182, 249),   # SEO top
        (1183, 210, 1425, 340),  # PAID
        (1171, 541, 1425, 679),  # WEB
        (1010, 680, 1179, 764),  # CRO
        (764, 541, 958, 644),    # EMAIL
        (764, 250, 937, 340),    # DATA
    ]
    labels = [
        ("SEO", "Organic discovery"),
        ("PAID", "Acquisition"),
        ("WEB", "Conversion"),
        ("CRO", "Friction out"),
        ("EMAIL", "Retention"),
        ("DATA", "Intelligence"),
    ]

    cx = sum((a + c) / 2 for a, b, c, d in boxes) / len(boxes)
    cy = sum((b + d) / 2 for a, b, c, d in boxes) / len(boxes)

    # Left copy
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

    # Center wordmark — clear field, no overlapping glyph
    fill_circle(draw, cx, cy, 56, fill=(0, 0, 0), outline=None)
    optical_text(draw, cx, cy - 12, "GROWTH", font("bold", 14), WHITE, nudge_y=1.1)
    optical_text(draw, cx, cy + 10, "LOOP", font("bold", 14), BLUE, nudge_y=1.1)
    # small mark below type
    draw.ellipse([cx - 3.5, cy + 30, cx + 3.5, cy + 37], fill=BLUE)
    draw.ellipse([cx - 10, cy + 24, cx + 10, cy + 44], outline=BLUE, width=1)

    fn = font("bold", 14)
    fs = font("reg", 12)
    for (x0, y0, x1, y1), (lab, sub) in zip(boxes, labels):
        fill_rrect(draw, [x0, y0, x1, y1], radius=12, fill=FILL, outline=BLUE, width=2)
        ncx, ncy = (x0 + x1) / 2, (y0 + y1) / 2
        # Two-line stack optically centered as one unit (title + gap + sub)
        optical_text(draw, ncx, ncy - 7, lab, fn, BLUE, nudge_y=1.1)
        optical_text(draw, ncx, ncy + 14, sub, fs, MUTE, nudge_y=0.9)

    return crop_2x1(img).convert("RGB")


def verify(img: Image.Image, nodes, r: float) -> None:
    arr = np.array(img)
    print("circle label ink centroids (want ~0,0):")
    for lab, cx, cy in nodes:
        xs, ys = [], []
        rr = r - 8
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
        else:
            print(f"  {lab}: no white ink found at ({cx:.0f},{cy:.0f})")


def export(img: Image.Image, png: Path, webp: Path, sm: Path | None = None) -> None:
    img.save(png, "PNG", optimize=True)
    img.save(webp, "WEBP", quality=95, method=6)
    if sm:
        sm_img = img.resize((960, int(960 * img.height / img.width)), Image.Resampling.LANCZOS)
        sm_img.save(sm, "WEBP", quality=92, method=6)
    print(f"wrote {webp.name} {img.size} {webp.stat().st_size}b")


def main():
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

    # Node crops for visual QA (post-crop coords)
    for lab, x, y in [
        ("SEO", 1200, 130),
        ("PAID", 1413, 258),
        ("WEB", 1413, 518),
        ("CRO", 1192, 650),
        ("EMAIL", 970, 518),
        ("DATA", 978, 258),
    ]:
        pad = 52
        system.crop((x - pad, y - pad, x + pad, y + pad)).save(f"/tmp/about-plates/node-{lab}.png")
    print("done")


if __name__ == "__main__":
    main()
