"""Render native light-mode plates from scripts/light-plates/plates.html.

These are new drawings of the dark compositions, not luminance inversions.
"""

from __future__ import annotations

import io
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "scripts" / "light-plates" / "plates.html"
SERVICES = ROOT / "public" / "assets" / "images" / "services"
INDUSTRIES = ROOT / "public" / "assets" / "images" / "industries"

SERVICE_IDS = [
    "seo",
    "paid-media",
    "branding",
    "web-design",
    "content-marketing",
]
INDUSTRY_IDS = [
    "home-services",
    "ecommerce",
    "legal",
    "saas",
    "healthcare",
    "construction",
    "dental",
    "real-estate",
    "restaurants",
    "automotive",
    "fitness",
    "professional-services",
    "financial-services",
    "education",
    "beauty-wellness",
]


def save_webp(png: bytes, dest: Path, size: tuple[int, int], quality: int) -> None:
    im = Image.open(io.BytesIO(png)).convert("RGB")
    if im.size != size:
        im = im.resize(size, Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=quality, method=6)


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome")
        page = browser.new_page(viewport={"width": 1536, "height": 1024}, device_scale_factor=2)
        page.goto(HTML.resolve().as_uri())
        page.wait_for_function("document.fonts.ready")
        page.wait_for_timeout(200)

        for slug in SERVICE_IDS:
            png = page.locator(f"#{slug}").screenshot(type="png")
            save_webp(png, SERVICES / f"service-{slug}-float.webp", (1536, 1024), 95)
            print("service", slug)

        for slug in INDUSTRY_IDS:
            png = page.locator(f"#{slug}").screenshot(type="png")
            full = INDUSTRIES / f"industry-{slug}-float.webp"
            save_webp(png, full, (1536, 1024), 95)
            thumb = Image.open(full).resize((1280, 853), Image.Resampling.LANCZOS)
            thumb.save(INDUSTRIES / f"industry-{slug}-thumb-float.webp", "WEBP", quality=92, method=6)
            print("industry", slug)

        browser.close()


if __name__ == "__main__":
    main()
