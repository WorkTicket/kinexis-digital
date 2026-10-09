"""Light-mode industry plates: same artwork as the dark stills, light colors."""

from __future__ import annotations

import importlib.util
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "assets" / "images" / "industries"
PREVIEW = Path(r"C:\Users\Slay3r\AppData\Local\Temp\cursor\screenshots\svc")

spec = importlib.util.spec_from_file_location(
    "service_plates",
    Path(__file__).with_name("make-light-service-plates.py"),
)
plates = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(plates)


def solid_pages(bright: np.ndarray) -> np.ndarray:
    """Large filled light regions, not headline letterforms."""
    h, w = bright.shape
    visited = np.zeros((h, w), dtype=bool)
    keep = np.zeros((h, w), dtype=bool)
    ys, xs = np.nonzero(bright)
    for y, x in zip(ys.tolist(), xs.tolist()):
        if visited[y, x]:
            continue
        stack = [(y, x)]
        cells: list[tuple[int, int]] = []
        visited[y, x] = True
        minx = maxx = x
        miny = maxy = y
        while stack:
            cy, cx = stack.pop()
            cells.append((cy, cx))
            minx = min(minx, cx)
            maxx = max(maxx, cx)
            miny = min(miny, cy)
            maxy = max(maxy, cy)
            for ny, nx in ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1)):
                if ny < 0 or nx < 0 or ny >= h or nx >= w or visited[ny, nx] or not bright[ny, nx]:
                    continue
                visited[ny, nx] = True
                stack.append((ny, nx))
        area = len(cells)
        bbox = max(1, (maxx - minx + 1) * (maxy - miny + 1))
        if area > 18000 and area / bbox > 0.55:
            for cy, cx in cells:
                keep[cy, cx] = True
    return keep


def protect_documents(original: np.ndarray, light: np.ndarray) -> np.ndarray:
    """Keep a real page surface light. Headlines still flip to ink."""
    L = plates.luminance(original.astype(np.float32))
    keep = solid_pages(L > 200)
    if not keep.any():
        return light
    for _ in range(2):
        dil = keep.copy()
        dil[1:, :] |= keep[:-1, :]
        dil[:-1, :] |= keep[1:, :]
        dil[:, 1:] |= keep[:, :-1]
        dil[:, :-1] |= keep[:, 1:]
        keep = dil
    out = light.copy()
    out[keep] = original[keep]
    return out


def close_ink_edges(original: np.ndarray, light: np.ndarray) -> np.ndarray:
    """Antialiased rims of white type should turn dark with the letter, not stay as a halo."""
    L = plates.luminance(original.astype(np.float32))
    ink = L > 200
    edge = ink.copy()
    edge[1:, :] |= ink[:-1, :]
    edge[:-1, :] |= ink[1:, :]
    edge[:, 1:] |= ink[:, :-1]
    edge[:, :-1] |= ink[:, 1:]
    edge &= ~ink
    edge &= ~plates.is_blue(original)
    if not edge.any():
        return light
    out = light.copy()
    strength = np.clip((L[edge] - 30) / 170, 0, 1)
    tone = 28 + (1 - strength) * 70
    out[edge, 0] = tone
    out[edge, 1] = tone
    out[edge, 2] = tone
    return out


def main() -> None:
    files = sorted(p for p in SRC.glob("industry-*.webp") if "-thumb" not in p.name and "-float" not in p.name)
    PREVIEW.mkdir(parents=True, exist_ok=True)
    cols = 5
    thumb_w, thumb_h, label_h = 300, 200, 28
    rows = (len(files) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * thumb_w, rows * (thumb_h + label_h)), (245, 245, 245))
    for i, path in enumerate(files):
        original = np.array(Image.open(path).convert("RGB"))
        light = plates.protect_documents(original, plates.invert_plate(original))
        im = Image.fromarray(light, "RGB")
        dest = path.with_name(path.stem + "-float.webp")
        im.save(dest, "WEBP", quality=95, method=6)
        thumb_name = path.stem + "-thumb-float.webp"
        thumb = im.resize((1280, 853), Image.Resampling.LANCZOS)
        thumb.save(SRC / thumb_name, "WEBP", quality=92, method=6)
        preview = im.copy()
        preview.thumbnail((thumb_w - 8, thumb_h - 8))
        x = (i % cols) * thumb_w
        y = (i // cols) * (thumb_h + label_h)
        sheet.paste(preview, (x + 4, y + 4))
        print("wrote", dest.name, thumb_name)
    sheet.save(PREVIEW / "industries-light-sheet.png")
    print("sheet", sheet.size)


if __name__ == "__main__":
    main()
