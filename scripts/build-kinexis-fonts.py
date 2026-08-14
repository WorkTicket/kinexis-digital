#!/usr/bin/env python3
"""
Build Kinexis Display + Kinexis Text from Ubuntu Sans VF (UFL 1.0).

Display: condensed (~88% width) for headlines / brand silhouette
Text:    full width with reading-biased weight stops for body UI
"""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[1]
SRC_VF = (
    ROOT
    / "scripts"
    / "fonts-src"
    / "ubuntu-sans-1.006"
    / "UbuntuSans-fonts-1.006"
    / "variable"
    / "UbuntuSans[wdth,wght].ttf"
)
LICENCE_SRC = (
    ROOT
    / "scripts"
    / "fonts-src"
    / "ubuntu-sans-1.006"
    / "UbuntuSans-fonts-1.006"
    / "LICENCE.txt"
)

DISPLAY_DIR = ROOT / "src" / "fonts" / "kinexis-display"
TEXT_DIR = ROOT / "src" / "fonts" / "kinexis-text"

# Condensed display — matches existing ~86–88% silhouette; Medium biased to 520
DISPLAY_INSTANCES = [
    ("Thin", 200, 88.0, 200),
    ("Light", 300, 88.0, 300),
    ("Regular", 400, 88.0, 400),
    ("Medium", 500, 88.0, 520),
    ("SemiBold", 600, 88.0, 600),
    ("Bold", 700, 88.0, 700),
]

# Full-width text companion — same DNA, readable at body sizes
TEXT_INSTANCES = [
    ("Light", 300, 100.0, 300),
    ("Regular", 400, 100.0, 400),
    ("Medium", 500, 100.0, 500),
    ("SemiBold", 600, 100.0, 600),
    ("Bold", 700, 100.0, 700),
]

# Google Fonts "latin" + punctuation used in EN/ES copy.
# Keeps woff2 files ~30 KB instead of shipping the full UF glyph set.
LATIN_UNICODES = (
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
    "U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,"
    "U+2212,U+2215,U+FEFF,U+FFFD"
)


def set_names(
    font: TTFont,
    *,
    family: str,
    style: str,
    ps_family: str,
    manufacturer: str = "Kinexis Digital Marketing",
) -> None:
    """Rewrite name table for a substantial UFL modification."""
    unique = f"{family} {style}; {manufacturer}; UFL 1.0"
    full = f"{family} {style}" if style != "Regular" else family
    ps_name = f"{ps_family}-{style}"
    version = "Version 1.001"

    records: dict[int, str] = {
        0: (
            "Copyright (c) Canonical Ltd. "
            f"Modifications Copyright (c) 2026 {manufacturer}. "
            "Licensed under the Ubuntu Font Licence 1.0."
        ),
        1: family,
        2: style,
        3: unique,
        4: full,
        5: version,
        6: ps_name,
        9: manufacturer,
        11: "https://kinexisdigital.com",
        13: "Ubuntu Font Licence, Version 1.0",
        14: "https://ubuntu.com/legal/font-licence",
        16: family,
        17: style,
    }

    name = font["name"]
    # Drop legacy name IDs we do not set so stock Ubuntu strings do not leak
    name.names = [n for n in name.names if n.nameID not in records and n.nameID < 256]

    for name_id, value in records.items():
        name.setName(value, name_id, 3, 1, 0x409)  # Windows Unicode
        name.setName(value, name_id, 1, 0, 0)  # Mac Roman


def build_family(
    *,
    family: str,
    ps_family: str,
    out_dir: Path,
    instances: list[tuple[str, int, float, float]],
) -> None:
    if not SRC_VF.exists():
        sys.exit(f"Missing Ubuntu Sans VF at {SRC_VF}\nRun download first.")

    out_dir.mkdir(parents=True, exist_ok=True)

    for style, css_weight, wdth, wght in instances:
        print(f"  {family} {style}  wdth={wdth} wght={wght}")
        partial = instancer.instantiateVariableFont(
            TTFont(SRC_VF),
            {"wdth": wdth, "wght": wght},
            inplace=False,
        )

        if "OS/2" in partial:
            # 5 = Medium width; Display is ~88%, Text is 100%
            partial["OS/2"].usWidthClass = 5
            partial["OS/2"].usWeightClass = css_weight

        set_names(partial, family=family, style=style, ps_family=ps_family)

        out_path = out_dir / f"{ps_family}-{style}.woff2"
        subset_latin(partial)
        partial.flavor = "woff2"
        partial.save(out_path)
        print(f"    -> {out_path.relative_to(ROOT)} ({out_path.stat().st_size // 1024} KB)")


def parse_unicodes(spec: str) -> list[int]:
    values: list[int] = []
    for part in spec.split(","):
        token = part.strip()
        if not token:
            continue
        if "-" in token:
            start_s, end_s = token.split("-", 1)
            start = int(start_s.replace("U+", ""), 16)
            end = int(end_s.replace("U+", ""), 16)
            values.extend(range(start, end + 1))
        else:
            values.append(int(token.replace("U+", ""), 16))
    return values


def subset_latin(font: TTFont) -> None:
    """Drop unused scripts so each weight stays small enough to preload."""
    options = Options()
    options.layout_features = [
        "kern",
        "liga",
        "clig",
        "calt",
        "locl",
        "mark",
        "mkmk",
        "ccmp",
        "rlig",
    ]
    options.hinting = True
    options.desubroutinize = True
    options.notdef_outline = True
    options.recommended_glyphs = True
    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=parse_unicodes(LATIN_UNICODES))
    subsetter.subset(font)


def subset_existing_woff2() -> None:
    """Re-subset already-built files without re-instancing from the VF."""
    for folder in (DISPLAY_DIR, TEXT_DIR):
        for path in sorted(folder.glob("*.woff2")):
            font = TTFont(path)
            subset_latin(font)
            font.flavor = "woff2"
            font.save(path)
            print(f"  subset {path.relative_to(ROOT)} ({path.stat().st_size // 1024} KB)")

def write_docs() -> None:
    if LICENCE_SRC.exists():
        shutil.copy2(LICENCE_SRC, DISPLAY_DIR / "UBUNTU-FONT-LICENCE.txt")
        shutil.copy2(LICENCE_SRC, TEXT_DIR / "UBUNTU-FONT-LICENCE.txt")

    (DISPLAY_DIR / "FONTLOG.txt").write_text(
        """FONTLOG for Kinexis Display
====================

Kinexis Display is a substantially Modified Version of Ubuntu Sans (v1.006),
created as the brand display typeface for Kinexis Digital Marketing.

Changes
-------
- Custom width/weight instances from Ubuntu Sans variable font
  (wdth ≈ 88 for a sharper, condensed product silhouette)
- Primary Medium instance biased to wght 520 for wordmark presence
- Latin (+ Latin-1) subset for EN/ES so each woff2 stays ~30 KB
- Renamed to "Kinexis Display" per UFL substantial-modification naming

Licence: Ubuntu Font Licence 1.0
Original: Copyright (c) Canonical Ltd
Modifications: Copyright (c) 2026 Kinexis Digital Marketing

Built with: scripts/build-kinexis-fonts.py
""",
        encoding="utf-8",
    )

    (TEXT_DIR / "FONTLOG.txt").write_text(
        """FONTLOG for Kinexis Text
=================

Kinexis Text is a substantially Modified Version of Ubuntu Sans (v1.006),
created as the body / UI companion to Kinexis Display.

Changes
-------
- Full-width (wdth = 100) instances optimized for paragraph and UI reading
- Weight stops: Light 300, Regular 400, Medium 500, SemiBold 600, Bold 700
- Latin (+ Latin-1) subset for EN/ES so each woff2 stays ~30 KB
- Renamed to "Kinexis Text" per UFL substantial-modification naming

Pairs with: Kinexis Display (condensed Ubuntu Sans derivative)

Licence: Ubuntu Font Licence 1.0
Original: Copyright (c) Canonical Ltd
Modifications: Copyright (c) 2026 Kinexis Digital Marketing

Built with: scripts/build-kinexis-fonts.py
""",
        encoding="utf-8",
    )


def main() -> None:
    if "--subset-only" in sys.argv:
        print("Subsetting existing Kinexis woff2 files…")
        subset_existing_woff2()
        print("Done.")
        return

    print("Building Kinexis Display…")
    build_family(
        family="Kinexis Display",
        ps_family="KinexisDisplay",
        out_dir=DISPLAY_DIR,
        instances=DISPLAY_INSTANCES,
    )
    print("Building Kinexis Text…")
    build_family(
        family="Kinexis Text",
        ps_family="KinexisText",
        out_dir=TEXT_DIR,
        instances=TEXT_INSTANCES,
    )
    write_docs()
    print("Done.")


if __name__ == "__main__":
    main()
