"""Build light-mode service plates that match the dark plates 1:1.

Black field becomes white, light type becomes ink, #0066ff stays.
Card surfaces lift to light gray so they still separate from the page.
"""

from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "assets" / "images" / "services"
PREVIEW = Path(r"C:\Users\Slay3r\AppData\Local\Temp\cursor\screenshots\svc")


def luminance(a: np.ndarray) -> np.ndarray:
    return 0.2126 * a[:, :, 0] + 0.7152 * a[:, :, 1] + 0.0722 * a[:, :, 2]


def is_blue(a: np.ndarray) -> np.ndarray:
    """Brand cobalt, including antialiased edges. Cool grays are not cobalt."""
    r, g, b = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    lead = b - np.maximum(r, g)
    return (lead > 28) & ((b - r) > 40) & (b > 70)


def field_color(src: np.ndarray) -> np.ndarray:
    edges = np.concatenate([src[0], src[-1], src[:, 0], src[:, -1]], axis=0)
    return np.median(edges.astype(np.float32), axis=0)


# Dark-plate luminance → light-plate luminance. Smooth on purpose:
# surfaces stay white, gray UI stays gray, type goes black. No edge mask,
# so bars and maps do not pick up black outlines or scratches.
_LIGHT_CURVE_X = np.array([0, 16, 32, 48, 68, 92, 118, 148, 182, 220, 255], np.float32)
_LIGHT_CURVE_Y = np.array([255, 252, 247, 236, 176, 124, 98, 32, 12, 8, 6], np.float32)


def invert_plate(src: np.ndarray) -> np.ndarray:
    """Same artwork as the dark plate, recolored for a white field.

    Every pixel keeps its place. Cobalt stays cobalt, including white type on a cobalt control.
    """
    a = src.astype(np.float32)
    tone = luminance(a)
    mapped = np.interp(tone, _LIGHT_CURVE_X, _LIGHT_CURVE_Y).astype(np.float32)

    r, g, b = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    lead = b - np.maximum(r, g)
    blue = np.clip((lead - 22.0) / 20.0, 0, 1) * np.clip((b - r - 34.0) / 26.0, 0, 1)
    field = float(np.median(np.concatenate([tone[0], tone[-1], tone[:, 0], tone[:, -1]])))
    alpha = np.clip((b - field) / max(255.0 - field, 1.0), 0, 1)
    fg = np.clip((a - field * (1.0 - alpha[:, :, None])) / np.maximum(alpha[:, :, None], 1e-3), 0, 255)
    lifted = fg * alpha[:, :, None] + mapped[:, :, None] * (1.0 - alpha[:, :, None])
    out = mapped[:, :, None] * (1.0 - blue[:, :, None]) + lifted * blue[:, :, None]
    out = np.clip(out, 0, 255)

    near_blue = cv2.dilate((blue > 0.35).astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
    keep = near_blue & (tone > 170)
    out[keep] = a[keep]
    return out.astype(np.uint8)


def whiten_field(src: np.ndarray) -> np.ndarray:
    """Turn only the edge-connected black field white. Device chrome stays."""
    field = field_color(src)
    dist = np.linalg.norm(src.astype(np.float32) - field, axis=2)
    near = dist < 16
    mask = np.zeros(near.shape, dtype=bool)
    mask[0, :] = near[0, :]
    mask[-1, :] = near[-1, :]
    mask[:, 0] = near[:, 0]
    mask[:, -1] = near[:, -1]
    prev = -1
    while True:
        count = int(mask.sum())
        if count == prev:
            break
        prev = count
        dil = mask.copy()
        dil[1:, :] |= mask[:-1, :]
        dil[:-1, :] |= mask[1:, :]
        dil[:, 1:] |= mask[:, :-1]
        dil[:, :-1] |= mask[:, 1:]
        mask = dil & near
    out = src.copy()
    out[mask] = (255, 255, 255)
    return out


def flood_field(arr: np.ndarray, thresh: int = 24) -> None:
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    near = (r < thresh) & (g < thresh) & (b < thresh + 6)
    mask = np.zeros(near.shape, dtype=bool)
    mask[0, :] = near[0, :]
    mask[-1, :] = near[-1, :]
    mask[:, 0] = near[:, 0]
    mask[:, -1] = near[:, -1]
    prev = -1
    while True:
        count = int(mask.sum())
        if count == prev:
            break
        prev = count
        dil = mask.copy()
        dil[1:, :] |= mask[:-1, :]
        dil[:-1, :] |= mask[1:, :]
        dil[:, 1:] |= mask[:, :-1]
        dil[:, :-1] |= mask[:, 1:]
        mask = dil & near
    arr[mask] = (255, 255, 255)


def invert_right_of_paper(original: np.ndarray, arr: np.ndarray, x0: int = 1000) -> None:
    """Same light-mode map as the other plates, only beside the document."""
    arr[:, x0:] = invert_plate(original)[:, x0:]


def label_components(mask: np.ndarray) -> dict[int, tuple[int, int, int, int, int]]:
    h, w = mask.shape
    labels = np.zeros((h, w), np.int32)
    parent = [0]

    def find(i: int) -> int:
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    def union(a: int, b: int) -> None:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[rb] = ra

    nid = 0
    for y in range(h):
        row = mask[y]
        for x in range(w):
            if not row[x]:
                continue
            left = labels[y, x - 1] if x else 0
            up = labels[y - 1, x] if y else 0
            if left and up:
                labels[y, x] = left
                union(left, up)
            elif left or up:
                labels[y, x] = left or up
            else:
                nid += 1
                parent.append(nid)
                labels[y, x] = nid

    boxes: dict[int, tuple[int, int, int, int, int]] = {}
    ys, xs = np.nonzero(labels)
    for y, x in zip(ys.tolist(), xs.tolist()):
        lab = find(int(labels[y, x]))
        if lab not in boxes:
            boxes[lab] = (x, y, x, y, 1)
        else:
            x0, y0, x1, y1, area = boxes[lab]
            boxes[lab] = (min(x0, x), min(y0, y), max(x1, x), max(y1, y), area + 1)
    return boxes


def cobalt_swatch(original: np.ndarray) -> tuple[int, int, int, int] | None:
    r, g, b = original[:, :, 0], original[:, :, 1], original[:, :, 2]
    blue = (b > 150) & (r < 80) & (g < 170) & (b > r + 70)
    blue[:, : original.shape[1] // 2] = False
    boxes = label_components(blue)
    cands = []
    for x0, y0, x1, y1, area in boxes.values():
        bw, bh = x1 - x0 + 1, y1 - y0 + 1
        if area < 800 or bw < 28 or bh < 28:
            continue
        ratio = bw / max(bh, 1)
        if 0.75 < ratio < 1.35:
            cands.append((area, x0, y0, x1, y1))
    if not cands:
        return None
    cands.sort(reverse=True)
    _, x0, y0, x1, y1 = cands[0]
    return x0, y0, x1, y1


def restore_brand_swatches(original: np.ndarray, light: np.ndarray) -> None:
    """Keep the four palette chips the colors they are named, on the light field."""
    found = cobalt_swatch(original)
    if not found:
        print("brand swatch not found")
        return
    x0, y0, x1, y1 = found
    bw = x1 - x0 + 1
    # Step across the row using the gap measured to the next chip on the right.
    cy = (y0 + y1) // 2
    gap = 0
    x = x1 + 1
    w = original.shape[1]
    while x < w and int(original[cy, x, 0]) < 40:
        gap += 1
        x += 1
    step = bw + max(gap, 8)
    print("cobalt", found, "gap", gap, "step", step)
    # Chips: black, cobalt, off-white, gray. Cobalt is index 1.
    colors = [(10, 10, 12), (0, 102, 255), (245, 245, 247), (138, 141, 145)]
    for index, color in enumerate(colors):
        left = x0 + (index - 1) * step
        light[y0 + 2 : y1 - 1, left + 2 : left + bw - 3] = color


def protect_documents(original: np.ndarray, light: np.ndarray) -> np.ndarray:
    """Keep real white pages, including the type on them. Headlines on the field still flip."""
    tone = luminance(original.astype(np.float32))
    bright = (tone > 200).astype(np.uint8) * 255
    n, labels, stats, _ = cv2.connectedComponentsWithStats(bright, 8)
    pages = np.zeros(tone.shape, dtype=bool)
    for i in range(1, n):
        x, y, w, h, area = stats[i]
        if area > 12000 and area / max(1, w * h) > 0.45:
            pages[labels == i] = True
    if not pages.any():
        return light
    inv = cv2.bitwise_not(pages.astype(np.uint8) * 255)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(inv, 8)
    height, width = pages.shape
    for i in range(1, n):
        x, y, w, h, _area = stats[i]
        if x > 0 and y > 0 and x + w < width - 1 and y + h < height - 1:
            pages[labels == i] = True
    out = light.copy()
    out[pages] = original[pages]
    return out


def save_plate(name: str, arr: np.ndarray) -> None:
    im = Image.fromarray(arr, "RGB")
    dest = SRC / name.replace(".webp", "-float.webp")
    im.save(dest, "WEBP", quality=95, method=6)
    thumb = im.copy()
    thumb.thumbnail((900, 600))
    PREVIEW.mkdir(parents=True, exist_ok=True)
    thumb.save(PREVIEW / f"final-{name.replace('.webp', '')}.png")
    print("wrote", dest.name, im.size)


def main() -> None:
    for name in ("service-seo.webp", "service-paid-media.webp"):
        original = np.array(Image.open(SRC / name).convert("RGB"))
        save_plate(name, invert_plate(original))

    brand_name = "service-branding.webp"
    brand = np.array(Image.open(SRC / brand_name).convert("RGB"))
    light = invert_plate(brand)
    restore_brand_swatches(brand, light)
    save_plate(brand_name, light)

    content_name = "service-content-marketing.webp"
    content = np.array(Image.open(SRC / content_name).convert("RGB"))
    save_plate(content_name, protect_documents(content, invert_plate(content)))

    web_name = "service-web-design.webp"
    web = np.array(Image.open(SRC / web_name).convert("RGB"))
    save_plate(web_name, whiten_field(web))


if __name__ == "__main__":
    main()
