"""Build inline blog diagrams, charts, and screenshots.

Diagrams and charts use published Kinexis prices and the page structure each
article already argues for. Screenshots are crops of live client homepages or
portfolio templates already in this repo. Re-run from the repo root:

    python scripts/build-blog-figures.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "blog" / "figures"
PORTFOLIO = ROOT / "public" / "portfolio"
W, H = 960, 640
FONT = "Segoe UI, Arial, sans-serif"
NAVY = "#0a1230"
MUTED = "#53607e"
LINE = "#e1e6f2"
TINT = "#f4f7ff"
COBALT = "#0b3dff"
ORANGE = "#ff6a00"
FILLS = ["#0b3dff", "#031b4e", "#ff6a00", "#5c6b8a"]


def esc(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def L(pair: tuple[str, str], lang: str) -> str:
    return pair[0] if lang == "en" else pair[1]


def wrap(text: str, limit: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if len(trial) > limit and cur:
            lines.append(cur)
            cur = word
        else:
            cur = trial
    if cur:
        lines.append(cur)
    return lines or [""]


def svg_open(title: str, height: int = H) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{height}" '
        f'viewBox="0 0 {W} {height}" role="img" aria-label="{esc(title)}">'
        f'<defs>'
        f'<linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="{TINT}"/>'
        f"</linearGradient>"
        f'<linearGradient id="barTrack" x1="0" y1="0" x2="1" y2="0">'
        f'<stop offset="0%" stop-color="#eef2ff"/><stop offset="100%" stop-color="#f7f9ff"/>'
        f"</linearGradient>"
        f"</defs>"
        f'<rect width="{W}" height="{height}" fill="#ffffff"/>'
        f'<rect x="0" y="0" width="8" height="{height}" fill="{COBALT}"/>'
    )


def title_block(title: str, subtitle: str) -> str:
    title_lines = wrap(title, 44)[:2]
    sub_lines = wrap(subtitle, 78)[:2]
    y = 44
    parts = [f'<rect x="28" y="24" width="52" height="6" rx="3" fill="{ORANGE}"/>']
    for line in title_lines:
        parts.append(
            f'<text x="28" y="{y + 24}" font-family="{FONT}" font-size="28" font-weight="800" letter-spacing="-0.02em" fill="{NAVY}">{esc(line)}</text>'
        )
        y += 34
    for line in sub_lines:
        parts.append(
            f'<text x="28" y="{y + 10}" font-family="{FONT}" font-size="15" fill="{MUTED}">{esc(line)}</text>'
        )
        y += 22
    return "\n".join(parts), y + 22


def footnote(text: str, height: int = H) -> str:
    lines = wrap(text, 98)[:2]
    y = height - 26 - (len(lines) - 1) * 17
    return "\n".join(
        [
            f'<line x1="28" y1="{y - 18}" x2="{W - 28}" y2="{y - 18}" stroke="{LINE}" stroke-width="1"/>',
            *[
                f'<text x="28" y="{y + i * 17}" font-family="{FONT}" font-size="12" fill="{MUTED}">{esc(line)}</text>'
                for i, line in enumerate(lines)
            ],
        ]
    )


def write_svg(name: str, lang: str, body: str) -> str:
    filename = f"{name}.svg" if lang == "en" else f"{name}-es.svg"
    (OUT / filename).write_text(body, encoding="utf-8")
    return f"/blog/figures/{filename}"


def arrow(x1: float, y: float, x2: float) -> str:
    tip = x2
    return (
        f'<line x1="{x1}" y1="{y}" x2="{tip - 8}" y2="{y}" stroke="{COBALT}" stroke-width="2.5" stroke-linecap="round"/>'
        f'<path d="M{tip} {y} l-9 -6 v12 z" fill="{COBALT}"/>'
    )


def bar_chart(name: str, title, subtitle, rows: list[tuple], footnote_text) -> dict:
    src = {}
    height = 470
    for lang in ("en", "es"):
        header, top = title_block(L(title, lang), L(subtitle, lang))
        max_value = max(row[1] for row in rows) or 1
        row_h = 68
        parts = [svg_open(L(title, lang), height), header]
        label_w = 198
        track_x, track_w = 28 + label_w + 18, 520
        for index, row in enumerate(rows):
            label, value, display = row
            y = top + index * row_h
            color = FILLS[index % 4]
            bar_w = max(22, int(track_w * (value / max_value)))
            parts.append(f'<rect x="28" y="{y}" width="{W - 56}" height="56" rx="14" fill="url(#panel)" stroke="{LINE}"/>')
            parts.append(f'<rect x="28" y="{y}" width="6" height="56" rx="3" fill="{color}"/>')
            parts.append(
                f'<text x="48" y="{y + 34}" font-family="{FONT}" font-size="15" font-weight="700" fill="{NAVY}">{esc(L(label, lang))}</text>'
            )
            parts.append(f'<rect x="{track_x}" y="{y + 15}" width="{track_w}" height="26" rx="13" fill="url(#barTrack)"/>')
            parts.append(f'<rect x="{track_x}" y="{y + 15}" width="{bar_w}" height="26" rx="13" fill="{color}"/>')
            if bar_w > 120:
                parts.append(
                    f'<text x="{track_x + bar_w - 14}" y="{y + 33}" text-anchor="end" font-family="{FONT}" font-size="14" font-weight="800" fill="#ffffff">{esc(L(display, lang))}</text>'
                )
            else:
                parts.append(
                    f'<text x="{track_x + bar_w + 12}" y="{y + 33}" text-anchor="start" font-family="{FONT}" font-size="14" font-weight="800" fill="{NAVY}">{esc(L(display, lang))}</text>'
                )
        parts.append(footnote(L(footnote_text, lang), height))
        parts.append("</svg>")
        src[lang] = write_svg(name, lang, "\n".join(parts))
    src["height"] = height
    return src


def flow(name: str, title, subtitle, steps: list[tuple], footnote_text) -> dict:
    src = {}
    height = 390
    for lang in ("en", "es"):
        header, top = title_block(L(title, lang), L(subtitle, lang))
        count = len(steps)
        gap = 28
        width = int((W - 56 - gap * (count - 1)) / count)
        parts = [svg_open(L(title, lang), height), header]
        rail_y = top + 16
        parts.append(
            f'<line x1="{28 + width / 2}" y1="{rail_y}" x2="{28 + (count - 1) * (width + gap) + width / 2}" y2="{rail_y}" stroke="{LINE}" stroke-width="3"/>'
        )
        for index, (label, text) in enumerate(steps):
            x = 28 + index * (width + gap)
            parts.append(f'<circle cx="{x + width / 2}" cy="{rail_y}" r="8" fill="#ffffff" stroke="{COBALT}" stroke-width="3"/>')
            parts.append(f'<circle cx="{x + width / 2}" cy="{rail_y}" r="3.5" fill="{COBALT}"/>')
            card_y = top + 38
            parts.append(
                f'<rect x="{x}" y="{card_y}" width="{width}" height="148" rx="18" fill="url(#panel)" stroke="{LINE}"/>'
            )
            parts.append(f'<rect x="{x}" y="{card_y}" width="{width}" height="7" rx="3" fill="{COBALT}"/>')
            label_lines = wrap(L(label, lang), max(11, width // 10))[:2]
            y = card_y + 42
            for line in label_lines:
                parts.append(
                    f'<text x="{x + width / 2}" y="{y}" text-anchor="middle" font-family="{FONT}" font-size="18" font-weight="800" fill="{NAVY}">{esc(line)}</text>'
                )
                y += 24
            y += 6
            for line in wrap(L(text, lang), max(14, width // 8))[:3]:
                parts.append(
                    f'<text x="{x + width / 2}" y="{y}" text-anchor="middle" font-family="{FONT}" font-size="14" fill="{MUTED}">{esc(line)}</text>'
                )
                y += 19
            if index < count - 1:
                parts.append(arrow(x + width + 4, rail_y, x + width + gap - 4))
        parts.append(footnote(L(footnote_text, lang), height))
        parts.append("</svg>")
        src[lang] = write_svg(name, lang, "\n".join(parts))
    src["height"] = height
    return src


def split(name: str, title, subtitle, left, right, footnote_text) -> dict:
    left_title, left_items = left
    right_title, right_items = right
    src = {}
    height = 430
    for lang in ("en", "es"):
        header, top = title_block(L(title, lang), L(subtitle, lang))
        parts = [svg_open(L(title, lang), height), header]
        boxes = (
            (28, L(left_title, lang), [L(item, lang) for item in left_items], COBALT, "#e9eeff"),
            (496, L(right_title, lang), [L(item, lang) for item in right_items], ORANGE, "#fff1e6"),
        )
        for x, label, items, color, chip in boxes:
            parts.append(
                f'<rect x="{x}" y="{top}" width="436" height="214" rx="18" fill="url(#panel)" stroke="{LINE}"/>'
            )
            parts.append(f'<rect x="{x}" y="{top}" width="436" height="8" rx="4" fill="{color}"/>')
            chip_w = min(300, 24 + len(label) * 8.4)
            parts.append(f'<rect x="{x + 22}" y="{top + 24}" width="{chip_w}" height="28" rx="14" fill="{chip}"/>')
            parts.append(
                f'<text x="{x + 38}" y="{top + 43}" font-family="{FONT}" font-size="13" font-weight="800" fill="{color}">{esc(label)}</text>'
            )
            y = top + 78
            for item in items[:4]:
                parts.append(f'<rect x="{x + 22}" y="{y - 12}" width="16" height="16" rx="4" fill="{color}"/>')
                parts.append(
                    f'<path d="M{x + 26.5} {y - 4} l3 3 5.5 -6" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                )
                item_lines = wrap(item, 34)[:2]
                for line in item_lines:
                    parts.append(
                        f'<text x="{x + 48}" y="{y}" font-family="{FONT}" font-size="15" font-weight="600" fill="{NAVY}">{esc(line)}</text>'
                    )
                    y += 20
                y += 8
        parts.append(footnote(L(footnote_text, lang), height))
        parts.append("</svg>")
        src[lang] = write_svg(name, lang, "\n".join(parts))
    src["height"] = height
    return src


def sitemap(name: str, title, subtitle, nodes: list[tuple], footnote_text) -> dict:
    src = {}
    height = 390
    for lang in ("en", "es"):
        header, top = title_block(L(title, lang), L(subtitle, lang))
        count = len(nodes)
        gap = 16
        width = int((W - 56 - gap * (count - 1)) / count)
        parts = [svg_open(L(title, lang), height), header]
        home = "Home" if lang == "en" else "Inicio"
        home_w = 168
        home_x = (W - home_w) / 2
        parts.append(f'<rect x="{home_x}" y="{top}" width="{home_w}" height="42" rx="14" fill="{NAVY}"/>')
        parts.append(
            f'<text x="{W / 2}" y="{top + 27}" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="800" fill="#ffffff">{esc(home)}</text>'
        )
        hub_y = top + 42
        parts.append(f'<line x1="{W / 2}" y1="{hub_y}" x2="{W / 2}" y2="{hub_y + 20}" stroke="{LINE}" stroke-width="2.5"/>')
        row_y = hub_y + 20
        left = 28 + width / 2
        right = 28 + (count - 1) * (width + gap) + width / 2
        parts.append(f'<line x1="{left}" y1="{row_y}" x2="{right}" y2="{row_y}" stroke="{LINE}" stroke-width="2.5"/>')
        for index, (label, text) in enumerate(nodes):
            x = 28 + index * (width + gap)
            accent = FILLS[index % 4]
            parts.append(f'<line x1="{x + width / 2}" y1="{row_y}" x2="{x + width / 2}" y2="{row_y + 16}" stroke="{LINE}" stroke-width="2.5"/>')
            card_y = row_y + 16
            parts.append(
                f'<rect x="{x}" y="{card_y}" width="{width}" height="108" rx="16" fill="url(#panel)" stroke="{LINE}"/>'
            )
            parts.append(f'<rect x="{x}" y="{card_y}" width="{width}" height="7" rx="3" fill="{accent}"/>')
            y = card_y + 36
            for line in wrap(L(label, lang), max(10, width // 9))[:2]:
                parts.append(
                    f'<text x="{x + width / 2}" y="{y}" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="800" fill="{NAVY}">{esc(line)}</text>'
                )
                y += 19
            y += 4
            for line in wrap(L(text, lang), max(12, width // 8))[:2]:
                parts.append(
                    f'<text x="{x + width / 2}" y="{y}" text-anchor="middle" font-family="{FONT}" font-size="13" fill="{MUTED}">{esc(line)}</text>'
                )
                y += 17
        parts.append(footnote(L(footnote_text, lang), height))
        parts.append("</svg>")
        src[lang] = write_svg(name, lang, "\n".join(parts))
    src["height"] = height
    return src


def phone(name: str, title, subtitle, lines: list, button, footnote_text) -> dict:
    src = {}
    height = 520
    for lang in ("en", "es"):
        header, top = title_block(L(title, lang), L(subtitle, lang))
        parts = [svg_open(L(title, lang), height), header]
        note_y = top + 8
        for line in wrap(L(footnote_text, lang), 38)[:7]:
            parts.append(
                f'<text x="28" y="{note_y}" font-family="{FONT}" font-size="16" font-weight="600" fill="{NAVY}">{esc(line)}</text>'
            )
            note_y += 26
        px, py = 560, top
        parts.append(f'<rect x="{px}" y="{py}" width="260" height="420" rx="36" fill="{NAVY}"/>')
        parts.append(f'<rect x="{px + 12}" y="{py + 12}" width="236" height="396" rx="28" fill="#ffffff"/>')
        parts.append(f'<rect x="{px + 96}" y="{py + 24}" width="68" height="8" rx="4" fill="{LINE}"/>')
        y = py + 56
        for line in [L(item, lang) for item in lines][:4]:
            parts.append(f'<rect x="{px + 32}" y="{y}" width="196" height="42" rx="12" fill="{TINT}" stroke="{LINE}"/>')
            parts.append(
                f'<text x="{px + 48}" y="{y + 27}" font-family="{FONT}" font-size="14" font-weight="600" fill="{MUTED}">{esc(line)}</text>'
            )
            y += 54
        parts.append(f'<rect x="{px + 32}" y="{y + 8}" width="196" height="46" rx="14" fill="{ORANGE}"/>')
        parts.append(
            f'<text x="{px + 130}" y="{y + 37}" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="800" fill="#ffffff">{esc(L(button, lang))}</text>'
        )
        parts.append(
            footnote(
                L(
                    (
                        "Wireframe only. Not a live message or form.",
                        "Solo un esquema. No es un mensaje ni un formulario real.",
                    ),
                    lang,
                ),
                height,
            )
        )
        parts.append("</svg>")
        src[lang] = write_svg(name, lang, "\n".join(parts))
    src["height"] = height
    return src


def fig(kind: str, after: int, src: dict, alt, caption, width=W, height=H) -> dict:
    if isinstance(src, dict) and "height" in src:
        height = src["height"]
    return {
        "kind": kind,
        "after": after,
        "src": src["en"] if isinstance(src, dict) else src,
        "srcEs": src.get("es", src["en"]) if isinstance(src, dict) else src,
        "width": width,
        "height": height,
        "alt": alt[0],
        "altEs": alt[1],
        "caption": caption[0],
        "captionEs": caption[1],
    }


def export_shot(key: str, filename: str, box: tuple[int, int, int, int] | None) -> tuple[str, int, int]:
    image = Image.open(PORTFOLIO / filename).convert("RGB")
    if box:
        image = image.crop(box)
    if image.width > 1200:
        height = round(image.height * 1200 / image.width)
        image = image.resize((1200, height), Image.Resampling.LANCZOS)
    dest = OUT / f"shot-{key}.webp"
    image.save(dest, "WEBP", quality=82, method=6)
    return f"/blog/figures/shot-{key}.webp", image.width, image.height


def shot_fig(after: int, src: str, size: tuple[int, int], alt, caption) -> dict:
    return fig("screenshot", after, {"en": src, "es": src}, alt, caption, size[0], size[1])


PRICE_ROWS = [
    (("Website", "Website"), 2328, (("$2,328", "$2,328"))),
    (("Lead System", "Lead System"), 4728, (("$4,728", "$4,728"))),
    (("Plus", "Plus"), 7128, (("$7,128", "$7,128"))),
    (("Own It", "Own It"), 1497, (("$1,497", "$1,497"))),
]
PAGE_ROWS = [
    (("Website", "Website"), 5, (("Up to 5", "Hasta 5"))),
    (("Lead System", "Lead System"), 10, (("Up to 10", "Hasta 10"))),
    (("Plus", "Plus"), 20, (("Up to 20", "Hasta 20"))),
    (("Own It", "Own It"), 10, (("Up to 10", "Hasta 10"))),
]
TEXT_ROWS = [
    (("Website add-on", "Website, complemento"), 97, (("$97/mo", "$97/mes"))),
    (("Lead System, 2nd number", "Lead System, 2.º número"), 1, (("$1/mo", "$1/mes"))),
    (("Plus, 2nd number", "Plus, 2.º número"), 1, (("$1/mo", "$1/mes"))),
    (("Own It add-on", "Own It, complemento"), 97, (("$97/mo", "$97/mes"))),
]
PRICE_NOTE = (
    "24-month illustration of published rates. Own It is one payment. Monthly plans can be canceled earlier. Optional Site Care after month 12 is not in the Own It bar.",
    "Ilustración a 24 meses con las tarifas publicadas. Own It es un solo pago. Los planes mensuales se pueden cancelar antes. Site Care opcional después del mes 12 no entra en la barra de Own It.",
)
PAGE_NOTE = (
    "Published page ceilings. Ship the pages that earn calls before you add more.",
    "Límites de páginas publicados. Publica primero las páginas que consiguen llamadas.",
)
TEXT_NOTE = (
    "Lead System and Plus: $1/mo only if you use a second tracking number, plus carrier rates. Carrier approval usually takes 10–15 days and is not guaranteed.",
    "Lead System y Plus: $1/mes solo si usas un segundo número de rastreo, más tarifas del operador. La aprobación suele tardar 10–15 días y no está garantizada.",
)
TEMPLATE_ALT = (
    "Screenshot of a portfolio website template shown on a phone, tablet, and laptop.",
    "Captura de una plantilla del portafolio en teléfono, tableta y computadora.",
)


def price_chart(name: str, trade):
    return bar_chart(
        name,
        (f"{L(trade, 'en')} website, 24-month illustration", f"Sitio de {L(trade, 'es')}, ilustración a 24 meses"),
        ("Published plan math. The trade does not change the price.", "La cuenta publicada. El oficio no cambia el precio."),
        PRICE_ROWS,
        PRICE_NOTE,
    )


def page_chart(name: str, trade):
    return bar_chart(
        name,
        (f"Page ceiling for a {L(trade, 'en')} site", f"Límite de páginas para un sitio de {L(trade, 'es')}"),
        ("Finish the money pages inside this ceiling.", "Termina las páginas que venden dentro de este límite."),
        PAGE_ROWS,
        PAGE_NOTE,
    )


TRADES = [
    {
        "key": "plumbing",
        "cost": "plumber-website-cost",
        "pages": "plumbing-website-pages",
        "label": ("plumbing", "plomería"),
        "shots": {"cost": "plumb-hero", "pages": "plumb-services"},
        "services": [
            (("Leaks", "Fugas"), ("Phone first", "Teléfono primero")),
            (("Drains", "Drenajes"), ("Only tools you own", "Solo si tienes la herramienta")),
            (("Water heaters", "Calentadores"), ("Brands you install", "Marcas que instalas")),
            (("Contact", "Contacto"), ("Short form", "Formulario corto")),
        ],
        "left": (("Leak or backup", "Fuga o respaldo"), [
            ("Phone above the fold", "Teléfono en la primera pantalla"),
            ("Hours you actually answer", "El horario que sí contestas"),
            ("Form is the backup", "El formulario es el plan B"),
        ]),
        "right": (("Heater quote", "Cotización de calentador"), [
            ("Brands you install", "Marcas que instalas"),
            ("Photos from your jobs", "Fotos de tus trabajos"),
            ("Name, phone, type, city", "Nombre, teléfono, tipo, ciudad"),
        ]),
    },
    {
        "key": "hvac",
        "cost": "hvac-website-cost",
        "pages": "hvac-website-pages",
        "label": ("HVAC", "HVAC"),
        "shots": {},
        "services": [
            (("No-cool repair", "Reparación sin frío"), ("Phone in a heat wave", "Teléfono en la ola de calor")),
            (("Replacement", "Reemplazo"), ("Consult, real equipment", "Consulta y equipo real")),
            (("Maintenance", "Mantenimiento"), ("Only if you sell it", "Solo si lo vendes")),
            (("Contact", "Contacto"), ("Say when you call back", "Di cuándo devuelves la llamada")),
        ],
        "left": (("No cool / no heat", "Sin frío / sin calor"), [
            ("Phone first", "Teléfono primero"),
            ("Symptom, not a SEER essay", "El síntoma, no un ensayo de SEER"),
            ("Financing stays off this page", "El financiamiento no va aquí"),
        ]),
        "right": (("Replace or tune-up", "Reemplazo o mantenimiento"), [
            ("Consult and system photos", "Consulta y fotos del equipo"),
            ("Financing only if it is real", "Financiamiento solo si es real"),
            ("Membership only if you sell it", "Membresía solo si la vendes"),
        ]),
    },
    {
        "key": "electrical",
        "cost": "electrician-website-cost",
        "pages": "electrician-website-pages",
        "label": ("electrician", "electricista"),
        "shots": {},
        "services": [
            (("Troubleshooting", "Fallas"), ("Call first", "Llamar primero")),
            (("Panels", "Tableros"), ("License near the phone", "Licencia junto al teléfono")),
            (("EV chargers", "Cargadores EV"), ("Only if you install them", "Solo si los instalas")),
            (("Contact", "Contacto"), ("Site check, not a novel", "Visita, no una novela")),
        ],
        "left": (("Breaker trouble", "Problema en el breaker"), [
            ("Call first", "Llamar primero"),
            ("License next to the number", "Licencia junto al número"),
            ("Do not require panel photos to dial", "No pidas fotos del tablero para marcar"),
        ]),
        "right": (("Panel or EV quote", "Cotización de tablero o EV"), [
            ("Amp service if they know it", "Amperaje si lo saben"),
            ("EV page only if you install", "Página EV solo si instalas"),
            ("Site check, then the load calc", "Visita, luego el cálculo"),
        ]),
    },
    {
        "key": "roofing",
        "cost": "roofing-website-cost",
        "pages": "roofing-website-pages",
        "label": ("roofing", "techos"),
        "shots": {},
        "services": [
            (("Active leak", "Gotera activa"), ("Phone first", "Teléfono primero")),
            (("Storm inspection", "Inspección por tormenta"), ("Short mobile form", "Formulario corto en el teléfono")),
            (("Replacement", "Reemplazo"), ("Gallery and a consult", "Galería y una consulta")),
            (("Contact", "Contacto"), ("No payout promises", "Sin prometer el pago del seguro")),
        ],
        "left": (("Leak or hail", "Gotera o granizo"), [
            ("Phone for an active leak", "Teléfono si la gotera sigue"),
            ("Name, phone, area, optional photo", "Nombre, teléfono, zona, foto opcional"),
            ("Document the roof; do not promise the claim", "Documenta el techo; no prometas el reclamo"),
        ]),
        "right": (("Planned replacement", "Reemplazo planeado"), [
            ("Photos of your jobs", "Fotos de tus trabajos"),
            ("Materials you actually install", "Materiales que sí instalas"),
            ("A consult, not an emergency banner", "Una consulta, no un letrero de emergencia"),
        ]),
    },
    {
        "key": "garage",
        "cost": "garage-door-website-cost",
        "pages": "garage-door-website-pages",
        "label": ("garage door", "puertas de garaje"),
        "shots": {},
        "services": [
            (("Springs and cables", "Resortes y cables"), ("Same-day only if true", "El mismo día solo si es cierto")),
            (("Openers", "Motores"), ("Diagnose or replace", "Diagnosticar o cambiar")),
            (("New doors", "Puertas nuevas"), ("Measure visit", "Visita para medir")),
            (("Contact", "Contacto"), ("Phone vs measure", "Llamada o medición")),
        ],
        "left": (("Door stuck", "Puerta atorada"), [
            ("Phone first", "Teléfono primero"),
            ("Same-day only where you can keep it", "El mismo día solo donde sí llegas"),
            ("Spring, opener, or neither", "Resorte, motor, o ninguno"),
        ]),
        "right": (("New door", "Puerta nueva"), [
            ("Single or double", "Sencilla o doble"),
            ("Brands you can order", "Marcas que sí pides"),
            ("A measure, not a catalog dump", "Una medición, no un catálogo"),
        ]),
    },
    {
        "key": "painting",
        "cost": "painting-website-cost",
        "pages": "painting-website-pages",
        "label": ("painting", "pintura"),
        "shots": {},
        "services": [
            (("Interior", "Interior"), ("Rooms and photos", "Cuartos y fotos")),
            (("Exterior", "Exterior"), ("Season and prep", "Temporada y preparación")),
            (("Cabinets", "Gabinetes"), ("Only if you refinish them", "Solo si los restauras")),
            (("Contact", "Contacto"), ("Say if you still walk the job", "Di si aún visitas para cotizar")),
        ],
        "left": (("Interior", "Interior"), [
            ("Room or surface count", "Cuántos cuartos o superficies"),
            ("Photos can triage", "Las fotos ayudan a clasificar"),
            ("Walkthrough if the price is final", "Visita si el precio es final"),
        ]),
        "right": (("Exterior or cabinets", "Exterior o gabinetes"), [
            ("Prep and weather on exterior", "Preparación y clima en exterior"),
            ("Door counts for cabinets", "Número de puertas en gabinetes"),
            ("Do not share one vague form", "No uses un solo formulario vago"),
        ]),
    },
    {
        "key": "remodeling",
        "cost": "remodeling-website-cost",
        "pages": "remodeling-website-pages",
        "label": ("remodeling", "remodelación"),
        "shots": {},
        "services": [
            (("Kitchens", "Cocinas"), ("Finished rooms", "Cuartos terminados")),
            (("Baths", "Baños"), ("Their own page", "Su propia página")),
            (("Process", "Proceso"), ("Consult, select, build", "Consulta, selección, obra")),
            (("Contact", "Contacto"), ("Request a consult", "Pedir una consulta")),
        ],
        "left": (("Kitchen or bath consult", "Consulta de cocina o baño"), [
            ("Finished rooms above the fold", "Cuartos terminados en la primera pantalla"),
            ("Request a consult", "Pedir una consulta"),
            ("No fake starting price", "Sin un precio inicial inventado"),
        ]),
        "right": (("What to leave off", "Qué no poner"), [
            ("No red call-now banner", "Sin un botón rojo de llama ya"),
            ("No budget field on the first form", "Sin campo de presupuesto al inicio"),
            ("Repairs stay on their own path", "Las reparaciones van aparte"),
        ]),
    },
    {
        "key": "landscaping",
        "cost": "landscaping-website-cost",
        "pages": "landscaping-website-pages",
        "label": ("landscaping", "jardinería"),
        "shots": {"cost": "a1-hero", "pages": "a1-services"},
        "services": [
            (("Maintenance", "Mantenimiento"), ("ZIP and frequency", "Código postal y frecuencia")),
            (("Design-build", "Diseño y obra"), ("Consult and project photos", "Consulta y fotos de obra")),
            (("Cleanups", "Limpiezas"), ("Seasonal and short", "De temporada y cortas")),
            (("Contact", "Contacto"), ("Offer type first", "Primero el tipo de trabajo")),
        ],
        "left": (("Mow or maintenance route", "Ruta de corte o mantenimiento"), [
            ("ZIP before you promise a day", "Código postal antes de prometer un día"),
            ("Weekly or biweekly", "Semanal o quincenal"),
            ("Lead with the work you book most", "Empieza con el trabajo que más agendas"),
        ]),
        "right": (("Design-build", "Diseño y obra"), [
            ("Project photos", "Fotos de proyectos"),
            ("A consult, not a mow dropdown", "Una consulta, no un menú de corte"),
            ("Separate from the route form", "Aparte del formulario de la ruta"),
        ]),
    },
    {
        "key": "pool",
        "cost": "pool-service-website-cost",
        "pages": "pool-service-website-pages",
        "label": ("pool service", "servicio de albercas"),
        "shots": {},
        "services": [
            (("Weekly route", "Ruta semanal"), ("ZIP, day, swimmable?", "Código, día, ¿se puede nadar?")),
            (("Green pool", "Alberca verde"), ("Phone first", "Teléfono primero")),
            (("Equipment", "Equipo"), ("Brands you service", "Marcas a las que das servicio")),
            (("Open / close", "Apertura / cierre"), ("Seasonal and short", "De temporada y corto")),
        ],
        "left": (("Green or equipment down", "Verde o equipo parado"), [
            ("Phone first", "Teléfono primero"),
            ("Do not send them through a membership form", "No los pases por un formulario de membresía"),
            ("Symptom and ZIP", "Síntoma y código postal"),
        ]),
        "right": (("Weekly route", "Ruta semanal"), [
            ("ZIP and preferred day", "Código postal y día preferido"),
            ("Is it swimmable?", "¿Se puede nadar?"),
            ("Chemical plan after you confirm the route", "El plan químico después de confirmar la ruta"),
        ]),
    },
    {
        "key": "pressure",
        "cost": "pressure-washing-website-cost",
        "pages": "pressure-washing-website-pages",
        "label": ("pressure washing", "lavado a presión"),
        "shots": {},
        "services": [
            (("House wash", "Lavado de casa"), ("Soft wash when needed", "Lavado suave cuando hace falta")),
            (("Concrete", "Concreto"), ("No miracle stain claims", "Sin prometer manchas milagrosas")),
            (("Roof algae", "Algas en el techo"), ("Method and safety", "Método y seguridad")),
            (("Contact", "Contacto"), ("Surface, then photos", "Superficie y luego fotos")),
        ],
        "left": (("House or roof", "Casa o techo"), [
            ("Name the safe method", "Nombra el método seguro"),
            ("Soft wash is not a blast", "El lavado suave no es un chorro"),
            ("Photos after the surface is chosen", "Fotos después de elegir la superficie"),
        ]),
        "right": (("Concrete", "Concreto"), [
            ("Driveway, sidewalk, or patio", "Entrada, banqueta o patio"),
            ("Say what will not come out", "Di qué no va a salir"),
            ("ZIP so you do not cross town blind", "Código postal para no cruzar la ciudad a ciegas"),
        ]),
    },
    {
        "key": "windows",
        "cost": "window-cleaning-website-cost",
        "pages": "window-cleaning-website-pages",
        "label": ("window cleaning", "limpieza de ventanas"),
        "shots": {},
        "services": [
            (("Homes", "Casas"), ("Panes and frequency", "Vidrios y frecuencia")),
            (("Storefronts", "Escaparates"), ("Before open or after close", "Antes de abrir o al cerrar")),
            (("Recurring", "Recurrente"), ("The normal next step", "El siguiente paso normal")),
            (("Contact", "Contacto"), ("Do not share one form", "No compartas un solo formulario")),
        ],
        "left": (("Home", "Casa"), [
            ("Rough pane count", "Número aproximado de vidrios"),
            ("One-time, monthly, or quarterly", "Una vez, mensual o trimestral"),
            ("Recurring as the default ask", "Lo recurrente como la opción normal"),
        ]),
        "right": (("Storefront", "Escaparate"), [
            ("Business name and address", "Nombre y dirección del negocio"),
            ("The hours you can keep", "El horario que sí puedes cumplir"),
            ("Access notes, not a home form", "Notas de acceso, no el formulario de casa"),
        ]),
    },
    {
        "key": "lawn",
        "cost": "lawn-care-website-cost",
        "pages": "lawn-care-website-pages",
        "label": ("lawn care", "cuidado de césped"),
        "shots": {},
        "services": [
            (("Mow route", "Ruta de corte"), ("ZIP and frequency", "Código postal y frecuencia")),
            (("Cleanup", "Limpieza"), ("One-time, not a membership", "Una vez, no una membresía")),
            (("Pet waste", "Desechos de mascotas"), ("Only if you run that stop", "Solo si haces esa parada")),
            (("Contact", "Contacto"), ("Decline outside ZIPs early", "Rechaza códigos fuera de ruta")),
        ],
        "left": (("Weekly mow", "Corte semanal"), [
            ("ZIP required", "Código postal obligatorio"),
            ("Weekly or biweekly", "Semanal o quincenal"),
            ("No fantasy service radius", "Sin un radio de servicio inventado"),
        ]),
        "right": (("Cleanup or pet waste", "Limpieza o desechos"), [
            ("Cleanup is a one-time path", "La limpieza es un trabajo de una vez"),
            ("Pet waste only if you offer it", "Desechos solo si lo ofreces"),
            ("Do not hide extras in a checkbox", "No escondas extras en una casilla"),
        ]),
    },
    {
        "key": "junk",
        "cost": "junk-removal-website-cost",
        "pages": "junk-removal-website-pages",
        "label": ("junk removal", "retiro de cachivaches"),
        "shots": {},
        "services": [
            (("Same-week haul", "Retiro de la semana"), ("Phone first", "Teléfono primero")),
            (("Cleanout", "Vaciado"), ("Volume and access", "Volumen y acceso")),
            (("Recurring", "Recurrente"), ("Only if you run it", "Solo si lo haces")),
            (("Contact", "Contacto"), ("Load size, then photos", "Tamaño de la carga, luego fotos")),
        ],
        "left": (("Curb pile", "Montón en la banqueta"), [
            ("Phone first", "Teléfono primero"),
            ("Same-week only if the truck can make it", "Esta semana solo si el camión llega"),
            ("Do not require a room inventory to dial", "No pidas un inventario para marcar"),
        ]),
        "right": (("Estate or garage cleanout", "Vaciado de casa o garaje"), [
            ("Rough load size", "Tamaño aproximado"),
            ("Stairs, elevator, gate", "Escaleras, elevador, portón"),
            ("Photos help; they are optional", "Las fotos ayudan; son opcionales"),
        ]),
    },
    {
        "key": "tree",
        "cost": "tree-service-website-cost",
        "pages": "tree-service-website-pages",
        "label": ("tree service", "servicio de árboles"),
        "shots": {},        "services": [
            (("Storm", "Tormenta"), ("Phone first", "Teléfono primero")),
            (("Trimming", "Poda"), ("Consult and photos", "Consulta y fotos")),
            (("Removal", "Retiro"), ("Insurance near the phone", "Seguro junto al teléfono")),
            (("Stump", "Tocón"), ("Only if you grind them", "Solo si los mueles")),
        ],
        "left": (("Limb on the house", "Rama sobre la casa"), [
            ("Phone first", "Teléfono primero"),
            ("Say if nights are on-call only", "Di si de noche solo hay guardia"),
            ("No fake 24/7 badge", "Sin una insignia falsa de 24/7"),
        ]),
        "right": (("Trim or removal", "Poda o retiro"), [
            ("Photos of the tree", "Fotos del árbol"),
            ("Insurance next to the number", "Seguro junto al número"),
            ("A site visit before the price", "Una visita antes del precio"),
        ]),
    },
]


def build_trades(shots: dict[str, tuple[str, tuple[int, int]]], figures: dict) -> None:
    for trade in TRADES:
        label = trade["label"]
        path_name = f"{trade['key']}-paths"
        site_name = f"{trade['key']}-sitemap"
        price_name = f"{trade['key']}-24mo"
        pages_name = f"{trade['key']}-pages"
        path_src = split(
            path_name,
            (f"Two {L(label, 'en')} visitors, two next steps", f"Dos visitas de {L(label, 'es')}, dos siguientes pasos"),
            ("The article’s split, drawn so you can check your homepage against it.", "La división del artículo, para comparar tu página de inicio."),
            trade["left"],
            trade["right"],
            ("Same company. The page should not make them share one button.", "La misma empresa. La página no debería obligarlos a compartir un botón."),
        )
        site_src = sitemap(
            site_name,
            (f"Pages to publish first", "Páginas que se publican primero"),
            (f"For a {L(label, 'en')} site. One honest service-area page, not a city clone.", f"Para un sitio de {L(label, 'es')}. Una página de zona real, no un clon por ciudad."),
            trade["services"],
            ("Match this list to the page ceiling on the chart below.", "Compara esta lista con el límite de páginas de la gráfica."),
        )
        price_src = price_chart(price_name, label)
        pages_src = page_chart(pages_name, label)
        cost_figs = [
            fig(
                "diagram",
                1,
                path_src,
                (f"Diagram comparing two {L(label, 'en')} customer paths.", f"Diagrama que compara dos caminos de clientes de {L(label, 'es')}."),
                ("Read the homepage against this split before you compare quotes. Mixed paths are what make the site feel expensive to fix later.", "Compara tu página de inicio con esta división antes de cotizar. Mezclar los caminos es lo que encarece el arreglo después."),
            ),
            fig(
                "chart",
                3,
                price_src,
                ("Bar chart of published 24-month totals: Website $2,328, Lead System $4,728, Plus $7,128, Own It $1,497.", "Gráfica de totales publicados a 24 meses: Website $2,328, Lead System $4,728, Plus $7,128, Own It $1,497."),
                (f"A {L(label, 'en')} site uses these same four prices. What changes is the pages, the proof, and whether missed calls need follow-up.", f"Un sitio de {L(label, 'es')} usa estos mismos cuatro precios. Cambian las páginas, las pruebas y si las llamadas perdidas necesitan seguimiento."),
            ),
        ]
        page_figs = [
            fig(
                "diagram",
                1,
                site_src,
                (f"Sitemap of the first {L(label, 'en')} pages to publish.", f"Mapa de las primeras páginas de {L(label, 'es')} que conviene publicar."),
                ("These are the pages the article says to ship before galleries, blogs, or city doorway pages.", "Estas son las páginas que el artículo dice publicar antes de galerías, blogs o páginas clonadas por ciudad."),
            ),
            fig(
                "diagram",
                2,
                path_src,
                (f"Diagram of the two {L(label, 'en')} journeys.", f"Diagrama de los dos recorridos de {L(label, 'es')}."),
                ("Put this next to the service pages. If both visitors land on one blob, the sitemap above is still unfinished.", "Pon esto junto a las páginas de servicio. Si las dos visitas caen en un solo bloque, el mapa de arriba sigue incompleto."),
            ),
            fig(
                "chart",
                4,
                pages_src,
                ("Bar chart of included pages: Website 5, Lead System 10, Plus 20, Own It 10.", "Gráfica de páginas incluidas: Website 5, Lead System 10, Plus 20, Own It 10."),
                ("The ceiling is the plan, not the trade. Build the nodes in the sitemap before you spend the extra pages.", "El límite lo pone el plan, no el oficio. Construye los nodos del mapa antes de gastar las páginas extra."),
            ),
        ]
        for slot, target in (("cost", cost_figs), ("pages", page_figs)):
            key = trade["shots"].get(slot)
            if key and key in shots:
                src, size = shots[key]
                note = SHOT_COPY[key]
                target.append(
                    shot_fig(
                        4 if slot == "cost" else 5,
                        src,
                        size,
                        note["alt"],
                        note["caption"],
                    )
                )
        figures[trade["cost"]] = cost_figs
        figures[trade["pages"]] = page_figs


# Live client crops only — no portfolio device mockups (those do not teach the article).
SHOT_SOURCES = {
    "plumb-hero": ("live-preferred-plumbing.webp", (0, 0, 1100, 780)),
    "plumb-services": ("live-preferred-plumbing.webp", (0, 560, 1100, 1360)),
    "a1-hero": ("live-a1-landscaping.webp", (0, 0, 1100, 780)),
    "a1-services": ("live-a1-landscaping.webp", (0, 1500, 1100, 2320)),
    "a1-proof": ("live-a1-landscaping.webp", (0, 2280, 1100, 3100)),
}

SHOT_COPY = {
    "plumb-hero": {
        "alt": ("Screenshot of the Preferred Plumbing Solutions homepage in Spirit Lake, Idaho.", "Captura de la página de inicio de Preferred Plumbing Solutions en Spirit Lake, Idaho."),
        "caption": ("Live client. Hours, phone, city, and the estimate button are on the first screen. That is the homepage the price is paying for.", "Cliente real. Horario, teléfono, ciudad y el botón de estimado están en la primera pantalla. Esa es la página que el precio está pagando."),
    },
    "plumb-services": {
        "alt": ("Screenshot of service cards on the Preferred Plumbing Solutions homepage.", "Captura de las tarjetas de servicio en la página de Preferred Plumbing Solutions."),
        "caption": ("Same live site, just below the hero. Repairs, radiant, and tankless are separate cards. Leaks, drains, and heaters on your site should be that easy to tell apart.", "El mismo sitio real, justo debajo del héroe. Reparaciones, radiante y tankless son tarjetas distintas. Fugas, drenajes y calentadores en tu sitio deberían distinguirse así."),
    },
    "a1-hero": {
        "alt": ("Screenshot of the A1 Property Services homepage in Cedar Falls, Iowa.", "Captura de la página de inicio de A1 Property Services en Cedar Falls, Iowa."),
        "caption": ("Live client. The city, the county, the phone, and the quote button are visible together. A service-area sentence does more than a list of cloned town pages.", "Cliente real. La ciudad, el condado, el teléfono y el botón de cotización se ven juntos. Una frase de zona de servicio hace más que una lista de pueblos clonados."),
    },
    "a1-services": {
        "alt": ("Screenshot of separate hardscape service cards on the A1 Property Services site.", "Captura de tarjetas de hardscape separadas en el sitio de A1 Property Services."),
        "caption": ("Live client. Walls, patios, driveways, and water features each link to their own page. Maintenance and design-build should stay that distinct.", "Cliente real. Muros, patios, entradas y fuentes enlazan a su propia página. El mantenimiento y el diseño-obra deberían quedar igual de separados."),
    },
    "a1-proof": {
        "alt": ("Screenshot of before-and-after project photos on the A1 Property Services site.", "Captura de fotos de antes y después en el sitio de A1 Property Services."),
        "caption": ("Live client. The proof is a real job with a town on it, not a stock yard. Reviews work better when this kind of evidence is already on the page.", "Cliente real. La prueba es un trabajo real con su pueblo, no un jardín de catálogo. Las reseñas funcionan mejor cuando esta evidencia ya está en la página."),
    },
    "hvac": {
        "alt": TEMPLATE_ALT,
        "caption": ("Portfolio template (Switchyard Heating & Air), not a live client. Check the phone frame: the work, the city, and the quote button still have to fit.", "Plantilla del portafolio (Switchyard Heating & Air), no un cliente real. Revisa el teléfono: el trabajo, la ciudad y el botón de cotización tienen que caber."),
    },
    "electrical": {
        "alt": TEMPLATE_ALT,
        "caption": ("Portfolio template (Union Electric), not a live client. The phone shows the service chips and the quote button without a desktop menu.", "Plantilla del portafolio (Union Electric), no un cliente real. El teléfono muestra los servicios y el botón de cotización sin el menú de escritorio."),
    },
    "roofing": {
        "alt": TEMPLATE_ALT,
        "caption": ("Portfolio template (Red Oak Roofing), not a live client. Use it to judge the first screen, not as photos of your roofs.", "Plantilla del portafolio (Red Oak Roofing), no un cliente real. Úsala para juzgar la primera pantalla, no como fotos de tus techos."),
    },
    "garage": {
        "alt": TEMPLATE_ALT,
        "caption": ("Portfolio template (Liftline Garage Doors), not a live client. The phone layout is the one to copy: work, place, and one next step.", "Plantilla del portafolio (Liftline Garage Doors), no un cliente real. El layout del teléfono es el que se copia: trabajo, lugar y un siguiente paso."),
    },
    "remodel": {
        "alt": TEMPLATE_ALT,
        "caption": ("Portfolio template (Tileline Bath & Tile), not a live remodeling client. A bath project page should lead with the finished room and a consult, the way this first screen leads with the work.", "Plantilla del portafolio (Tileline Bath & Tile), no un cliente real de remodelación. Una página de baño debe abrir con el cuarto terminado y una consulta, como esta primera pantalla abre con el trabajo."),
    },
    "pressure": {
        "alt": TEMPLATE_ALT,
        "caption": ("Portfolio template (Rinseworks), not a live client. The first screen names the work and the next step on the phone, which is the part house, concrete, and roof pages each need.", "Plantilla del portafolio (Rinseworks), no un cliente real. La primera pantalla nombra el trabajo y el siguiente paso en el teléfono, que es lo que necesitan las páginas de casa, concreto y techo."),
    },
    "windows": {
        "alt": TEMPLATE_ALT,
        "caption": ("Portfolio template (ClearPeak), not a live client. Home and storefront routes should be this obvious on a phone, with different forms behind them.", "Plantilla del portafolio (ClearPeak), no un cliente real. Las rutas de casa y escaparate deberían verse así de claras en el teléfono, con formularios distintos detrás."),
    },
    "junk": {
        "alt": TEMPLATE_ALT,
        "caption": ("Portfolio template (Good Riddance Junk), not a live client. A haul and a cleanout should not share one vague first screen.", "Plantilla del portafolio (Good Riddance Junk), no un cliente real. Un retiro y un vaciado no deberían compartir una primera pantalla vaga."),
    },
    "tree": {
        "alt": TEMPLATE_ALT,
        "caption": ("Portfolio template (Graft Tree Care), not a live client. Storm calls and planned trims need different buttons even when the homepage looks this simple.", "Plantilla del portafolio (Graft Tree Care), no un cliente real. Las llamadas por tormenta y las podas planeadas necesitan botones distintos aunque la página se vea así de simple."),
    },
}


def add_pillars(shots, figures: dict) -> None:
    prices = bar_chart(
        "plans-24mo",
        ("Published 24-month illustration", "Ilustración publicada a 24 meses"),
        ("The numbers you can check. Freelancer and agency quotes are not on this chart.", "Los números que puedes verificar. Las cotizaciones de freelancer y agencia no están en esta gráfica."),
        PRICE_ROWS,
        PRICE_NOTE,
    )
    pages = bar_chart(
        "plan-pages",
        ("Pages included before you add more", "Páginas incluidas antes de agregar más"),
        ("Fix the pages that take the call inside this ceiling.", "Arregla las páginas que reciben la llamada dentro de este límite."),
        PAGE_ROWS,
        PAGE_NOTE,
    )
    textback = bar_chart(
        "textback-price",
        ("What missed-call text-back costs here", "Qué cuesta el texto por llamada perdida aquí"),
        ("Optional. It is not included free on every plan.", "Opcional. No está incluido gratis en todos los planes."),
        TEXT_ROWS,
        TEXT_NOTE,
    )
    mistakes = flow(
        "fix-order",
        ("Fix the first broken step", "Arregla el primer paso roto"),
        ("Stop after the step that is actually losing the call.", "Detente en el paso que de verdad está perdiendo la llamada."),
        [
            (("Phone", "Teléfono"), ("On the first phone screen", "En la primera pantalla del teléfono")),
            (("One job", "Un trabajo"), ("Its own page", "Su propia página")),
            (("Proof", "Prueba"), ("Next to the ask", "Junto a la petición")),
            (("Area", "Zona"), ("The towns you cover", "Los pueblos que sí cubres")),
        ],
        ("A buried number makes the rest of the page unread.", "Un número escondido hace que el resto de la página no se lea."),
    )
    two_doors = split(
        "two-doors",
        ("Emergency and estimate are different doors", "La emergencia y el estimado son puertas distintas"),
        ("One main next step per page.", "Un siguiente paso principal por página."),
        (("Call now", "Llamar ahora"), [
            ("Active failure", "Falla activa"),
            ("The number is the button", "El número es el botón"),
            ("A short form only if you miss the ring", "Un formulario corto solo si no contestas"),
        ]),
        (("Get a quote", "Pedir cotización"), [
            ("The visitor has time", "La visita tiene tiempo"),
            ("Name, phone, job, city", "Nombre, teléfono, trabajo, ciudad"),
            ("Proof beside the form", "La prueba junto al formulario"),
        ]),
        ("If both doors say the same thing, neither visitor is sure.", "Si las dos puertas dicen lo mismo, ninguna visita está segura."),
    )
    nap = split(
        "profile-and-site",
        ("The profile and the site do different jobs", "El perfil y el sitio hacen trabajos distintos"),
        ("You usually need both. They have to match.", "Casi siempre necesitas los dos. Tienen que coincidir."),
        (("Google Business Profile", "Perfil de Google"), [
            ("Map, hours, reviews", "Mapa, horario, reseñas"),
            ("Photos of the real work", "Fotos del trabajo real"),
            ("A call button", "Un botón para llamar"),
        ]),
        (("The website", "El sitio web"), [
            ("A page per job", "Una página por trabajo"),
            ("The form and the proof", "El formulario y la prueba"),
            ("English and Spanish, on Plus", "Inglés y español, en Plus"),
        ]),
        ("Name, phone, and hours have to be the same in both places.", "Nombre, teléfono y horario tienen que ser los mismos en los dos lugares."),
    )
    review_flow = flow(
        "review-ask",
        ("Ask while the result is still there", "Pide la reseña mientras el resultado sigue ahí"),
        ("One direct link. Three ways to hand it over.", "Un enlace directo. Tres formas de entregarlo."),
        [
            (("Driveway", "Entrada"), ("Ask when the job is done", "Pide cuando el trabajo terminó")),
            (("Text", "Texto"), ("Send the review link", "Envía el enlace de la reseña")),
            (("Email or paper", "Correo o papel"), ("For people who will not text", "Para quien no va a textear")),
            (("Profile", "Perfil"), ("You reply. You do not invent one.", "Respondes. No inventas una.")),
        ],
        ("Do not offer a discount for a review, and do not post one yourself.", "No ofrezcas un descuento por una reseña, y no publiques una tú."),
    )
    spend_order = flow(
        "spend-order",
        ("Where the marketing money goes first", "A dónde va primero el dinero de marketing"),
        ("Name the website line before you buy more traffic.", "Nombra la partida del sitio antes de comprar más tráfico."),
        [
            (("Site", "Sitio"), ("A page that can take the call", "Una página que puede recibir la llamada")),
            (("Follow-up", "Seguimiento"), ("Missed calls and review asks", "Llamadas perdidas y reseñas")),
            (("Profile", "Perfil"), ("Hours and photos that match", "Horario y fotos que coinciden")),
            (("Then traffic", "Luego tráfico"), ("SEO or ads, after the page converts", "SEO o anuncios, cuando la página convierte")),
        ],
        ("Ads to a page with no phone are a second bill for the same miss.", "Anuncios a una página sin teléfono son una segunda factura por la misma pérdida."),
    )
    choose_path = split(
        "who-holds-files",
        ("Who has the site files", "Quién tiene los archivos del sitio"),
        ("Monthly plans and Own It are different purchases.", "Los planes mensuales y Own It son compras distintas."),
        (("Monthly plan", "Plan mensual"), [
            ("$97, $197, or $297 a month", "$97, $197 o $297 al mes"),
            ("Kinexis hosts it while you pay", "Kinexis lo hospeda mientras pagas"),
            ("Buyout of the files is $1,497", "La compra de los archivos es $1,497"),
        ]),
        (("Own It", "Own It"), [
            ("$1,497 once", "$1,497 una vez"),
            ("Files are yours on launch day", "Los archivos son tuyos el día del lanzamiento"),
            ("12 months of hosting included", "12 meses de hosting incluidos"),
        ]),
        ("Cancel anytime on monthly plans. The 24-month figure is not a contract.", "En los planes mensuales cancelas cuando quieras. La cifra de 24 meses no es un contrato."),
    )
    text_wait = flow(
        "carrier-wait",
        ("Why the text does not start on day one", "Por qué el texto no empieza el día uno"),
        ("Carrier approval is the calendar, not a switch in the footer.", "La aprobación del operador es el calendario, no un interruptor en el pie."),
        [
            (("Day 0", "Día 0"), ("You ask to turn it on", "Pides activarlo")),
            (("About 10–15 days", "Unos 10–15 días"), ("Typical review window", "Ventana típica de revisión")),
            (("Not guaranteed", "No garantizado"), ("The carrier can say no", "El operador puede decir que no")),
            (("Then it sends", "Luego se envía"), ("On the tracking number", "En el número de rastreo")),
        ],
        ("Tell the crew this before launch so a missed call in week one is not a surprise.", "Dile esto al equipo antes del lanzamiento para que una llamada perdida en la primera semana no sea una sorpresa."),
    )
    text_draft = phone(
        "sms-draft",
        ("A draft, not a campaign", "Un borrador, no una campaña"),
        ("Have a compliance review before you send it.", "Haz una revisión de cumplimiento antes de enviarlo."),
        [
            ("Your business name", "El nombre de tu negocio"),
            ("We missed your call", "Perdimos tu llamada"),
            ("Reply with the job", "Responde con el trabajo"),
            ("The best number", "El mejor número"),
        ],
        ("Example only", "Solo un ejemplo"),
        ("Name the business, name the miss, and ask for the job type. Opt-out rules still apply.", "Nombra el negocio, di que perdiste la llamada y pide el tipo de trabajo. Las reglas de baja siguen aplicando."),
    )
    short_form = phone(
        "short-form",
        ("Fields worth keeping", "Campos que sí valen"),
        ("Everything else can wait for the callback.", "Todo lo demás puede esperar a la llamada de regreso."),
        [
            ("Name", "Nombre"),
            ("Phone", "Teléfono"),
            ("Job type", "Tipo de trabajo"),
            ("City", "Ciudad"),
        ],
        ("Send", "Enviar"),
        ("Four fields. Photos, gate codes, and budgets belong in the follow-up, not in front of the submit button.", "Cuatro campos. Fotos, códigos de portón y presupuestos van en el seguimiento, no antes del botón."),
    )
    keep_cut = split(
        "form-keep-cut",
        ("What to ask, what to cut", "Qué preguntar y qué cortar"),
        ("A long first form loses the emergency and the after-work visit.", "Un primer formulario largo pierde la emergencia y la visita después del trabajo."),
        (("Keep", "Dejar"), [
            ("Name and phone", "Nombre y teléfono"),
            ("The job, in their words", "El trabajo, en sus palabras"),
            ("City or ZIP", "Ciudad o código postal"),
        ]),
        (("Cut from the first screen", "Cortar de la primera pantalla"), [
            ("Room-by-room inventories", "Inventarios cuarto por cuarto"),
            ("A required budget", "Un presupuesto obligatorio"),
            ("Uploads before they can send", "Archivos antes de poder enviar"),
        ]),
        ("Say what happens after submit, and keep that promise.", "Di qué pasa después de enviar, y cumple esa promesa."),
    )
    questions = flow(
        "designer-questions",
        ("Ask these before a deposit", "Pregunta esto antes de un anticipo"),
        ("Fifteen questions collapse into four checks.", "Quince preguntas se reducen a cuatro revisiones."),
        [
            (("Ownership", "Propiedad"), ("Domain and the files", "Dominio y archivos")),
            (("Money", "Dinero"), ("Monthly, once, cancel", "Mensual, una vez, cancelar")),
            (("Scope", "Alcance"), ("Pages, copy, photos", "Páginas, texto, fotos")),
            (("Leads", "Clientes"), ("Form, reviews, missed calls", "Formulario, reseñas, llamadas perdidas")),
        ],
        ("Also ask to see a real phone page before you pay. A desktop mockup is not the test.", "Pide también ver una página real en el teléfono antes de pagar. Un mockup de escritorio no es la prueba."),
    )
    redirect = flow(
        "redirect-order",
        ("Redesign without losing the old URLs", "Rediseño sin perder las URLs viejas"),
        ("Change the design after the map is written down.", "Cambia el diseño después de escribir el mapa."),
        [
            (("Inventory", "Inventario"), ("URLs that earn calls", "URLs que consiguen llamadas")),
            (("Map", "Mapa"), ("Old address to new address", "Dirección vieja a dirección nueva")),
            (("301", "301"), ("Test one before launch day", "Prueba una antes del día de lanzamiento")),
            (("Check", "Revisa"), ("Search Console after, not instead", "Search Console después, no en vez de")),
        ],
        ("A prettier homepage does not forward the old service URL by itself.", "Una página más bonita no redirige sola la URL vieja del servicio."),
    )
    mobile_check = flow(
        "mobile-check",
        ("Check the phone you already have", "Revisa el teléfono que ya tienes"),
        ("Do this in daylight, on a cellular bar, before you buy another page.", "Hazlo de día, con una barra de señal, antes de comprar otra página."),
        [
            (("Number", "Número"), ("Thumb can hit it", "El pulgar puede tocarlo")),
            (("Job", "Trabajo"), ("Named without scrolling", "Nombrado sin desplazarse")),
            (("Form", "Formulario"), ("Usable with the keyboard open", "Útil con el teclado abierto")),
            (("Speed", "Velocidad"), ("The number shows up", "El número aparece")),
        ],
        ("Pop-ups and chat that sit on the number fail this check.", "Ventanas y chats que tapan el número reprueban esta revisión."),
    )
    gbp_steps = flow(
        "gbp-steps",
        ("A pass you can finish", "Una revisión que sí terminas"),
        ("Claim it before you decorate it.", "Reclámalo antes de decorarlo."),
        [
            (("Claim", "Reclama"), ("The name on the truck", "El nombre que va en el camión")),
            (("Hours", "Horario"), ("Including the quiet weeks", "Incluidas las semanas tranquilas")),
            (("Photos", "Fotos"), ("Your work, not a stock hat", "Tu trabajo, no un casco de catálogo")),
            (("Then the site", "Luego el sitio"), ("When a profile cannot hold the job page", "Cuando el perfil no puede tener la página del trabajo")),
        ],
        ("Set the review link while you are in there. Do not steer the star rating.", "Deja el enlace de reseña mientras estás ahí. No dirijas la calificación."),
    )
    diy = split(
        "diy-or-managed",
        ("What you are actually comparing", "Qué estás comparando de verdad"),
        ("Price the evenings, the edits, and the exit. Not a scare line.", "Calcula las noches, los cambios y la salida. No un susto."),
        (("You build it", "Lo construyes tú"), [
            ("A draft can be fast", "Un borrador puede ser rápido"),
            ("Evenings go to edits and the form", "Las noches se van en cambios y el formulario"),
            ("Follow-up is a separate tool", "El seguimiento es otra herramienta"),
        ]),
        (("A managed plan", "Un plan administrado"), [
            ("Site, hosting, and edits in one price", "Sitio, hosting y cambios en un precio"),
            ("You can see it before you pay", "Puedes verlo antes de pagar"),
            ("Cancel monthly, or own the files", "Cancelas al mes, o te quedas los archivos"),
        ]),
        ("Check current Wix or Squarespace prices on their sites. They are not estimated here.", "Revisa los precios actuales de Wix o Squarespace en sus sitios. Aquí no se estiman."),
    )

    def use(key: str, after: int):
        src, size = shots[key]
        note = SHOT_COPY[key]
        return shot_fig(after, src, size, note["alt"], note["caption"])

    figures["website-mistakes-that-cost-you-calls"] = [
        fig("diagram", 3, mistakes, ("Four-step diagram: phone, one page per job, proof, then service area.", "Diagrama de cuatro pasos: teléfono, una página por trabajo, prueba y zona."), ("The buried number is step one. The other mistakes matter after someone can still call.", "El número escondido es el paso uno. Los otros errores importan después de que alguien todavía puede llamar.")),
        fig("chart", 4, pages, ("Bar chart of pages included on each Kinexis plan.", "Gráfica de páginas incluidas en cada plan de Kinexis."), ("Give the main job its own page inside this ceiling. A blog that outshouts that page is the mistake, not a content strategy.", "Dale al trabajo principal su propia página dentro de este límite. Un blog que tapa esa página es el error, no una estrategia de contenido.")),
    ]
    figures["turn-clicks-into-calls"] = [
        fig("diagram", 2, two_doors, ("Diagram splitting call-now pages from estimate pages.", "Diagrama que separa las páginas de llamar ahora y las de estimado."), ("Count conversations, not sessions. These are the two conversations worth designing.", "Cuenta conversaciones, no sesiones. Estas son las dos conversaciones que vale la pena diseñar.")),
        fig("chart", 3, pages, ("Bar chart of how many pages each plan includes.", "Gráfica de cuántas páginas incluye cada plan."), ("A shorter form on the right door is worth more than another page from this chart.", "Un formulario más corto en la puerta de la derecha vale más que otra página de esta gráfica.")),
    ]
    figures["small-business-marketing-budget"] = [
        fig("diagram", 0, spend_order, ("Sequence diagram: site, follow-up, profile, then ads or SEO.", "Diagrama de secuencia: sitio, seguimiento, perfil y luego anuncios o SEO."), ("This is the order the article defends. Skip a step and the next bill is harder to explain.", "Este es el orden que defiende el artículo. Si te saltas un paso, la siguiente factura es más difícil de explicar.")),
        fig("chart", 7, prices, ("Bar chart of the published 24-month website totals.", "Gráfica de los totales publicados del sitio a 24 meses."), ("This is the website line you can name for a year. It is not an ad budget.", "Esta es la partida del sitio que puedes nombrar por un año. No es un presupuesto de anuncios.")),
        use("a1-hero", 1),
    ]
    figures["make-your-website-mobile-ready"] = [
        fig("diagram", 0, mobile_check, ("Four-step phone check: number, job, form, and speed.", "Revisión del teléfono en cuatro pasos: número, trabajo, formulario y velocidad."), ("Walk this list on your own phone before you pay for another page.", "Recorre esta lista en tu propio teléfono antes de pagar por otra página.")),
        fig("chart", 10, pages, ("Bar chart of included pages by plan.", "Gráfica de páginas incluidas por plan."), ("Another page does not fix a number the thumb cannot hit.", "Otra página no arregla un número que el pulgar no puede tocar.")),
    ]
    figures["local-seo-get-found-get-called"] = [
        fig("diagram", 2, nap, ("Diagram comparing a Google Business Profile with a website.", "Diagrama que compara un Perfil de Google Business con un sitio web."), ("The map pack can show hours and reviews. The job still needs its own page on the site.", "El mapa puede mostrar horario y reseñas. El trabajo todavía necesita su propia página en el sitio.")),
        fig("chart", 5, pages, ("Bar chart of page ceilings by plan.", "Gráfica de límites de páginas por plan."), ("One real service-area page plus a page per job fits inside this. A pile of town clones does not, and it is the thing to avoid.", "Una página real de zona más una página por trabajo cabe aquí. Una pila de clones por pueblo no, y es lo que hay que evitar.")),
        use("a1-hero", 4),
    ]
    figures["build-trust-with-reviews"] = [
        fig("diagram", 0, review_flow, ("Diagram of when and how to ask for a review.", "Diagrama de cuándo y cómo pedir una reseña."), ("Specific and soon beats a perfect speech a month later.", "Lo específico y pronto gana a un discurso perfecto un mes después.")),
        fig("chart", 10, textback, ("Bar chart of optional text-back pricing by plan.", "Gráfica del precio opcional del texto por llamada perdida, por plan."), ("Review requests are included on Lead System and Plus. Text-back is the separate optional line on this chart.", "Las solicitudes de reseña están incluidas en Lead System y Plus. El texto por llamada perdida es la línea opcional aparte en esta gráfica.")),
        use("a1-proof", 2),
    ]
    figures["monthly-website-vs-own-it"] = [
        fig("diagram", 0, choose_path, ("Diagram of monthly plans versus Own It file ownership.", "Diagrama de los planes mensuales frente a la propiedad de archivos de Own It."), ("Pick the column that matches how you buy equipment, then stop shopping the label.", "Elige la columna que coincide con cómo compras equipo, y deja de comparar el nombre.")),
        fig("chart", 1, prices, ("Bar chart comparing 24-month plan totals with the one-time Own It price.", "Gráfica que compara los totales a 24 meses con el precio único de Own It."), ("These are the figures in the article. The Own It bar is one payment, not a cheaper monthly rate.", "Estas son las cifras del artículo. La barra de Own It es un solo pago, no una mensualidad más barata.")),
        use("plumb-hero", 2),
    ]
    figures["missed-call-text-back-templates"] = [
        fig("diagram", 0, text_wait, ("Timeline from requesting text-back to carrier approval.", "Línea de tiempo desde pedir el texto hasta la aprobación del operador."), ("Read this before you copy a template. The text does not send on the day you approve the site.", "Lee esto antes de copiar una plantilla. El texto no se envía el día que apruebas el sitio.")),
        fig("diagram", 1, text_draft, ("Phone wireframe of a missed-call text draft.", "Esquema de teléfono con un borrador de texto por llamada perdida."), ("Swap in the job words from the trade section below. Keep the business name and a way to reply.", "Cambia las palabras del trabajo en la sección del oficio de abajo. Conserva el nombre del negocio y una forma de responder.")),
        fig("chart", 13, textback, ("Bar chart of missed-call text-back pricing.", "Gráfica del precio del texto por llamada perdida."), ("The templates are free to read. Turning the feature on is the price on this chart, plus carrier rates.", "Las plantillas se pueden leer gratis. Activar la función cuesta lo que muestra esta gráfica, más las tarifas del operador.")),
    ]
    figures["how-to-ask-for-google-reviews-contractor"] = [
        fig("diagram", 0, review_flow, ("Diagram of driveway, text, and email review asks.", "Diagrama de cómo pedir la reseña en la entrada, por texto y por correo."), ("The link matters more than the speech. All three paths should use the same direct review link.", "El enlace importa más que el discurso. Los tres caminos deben usar el mismo enlace directo.")),
        fig("chart", 11, prices, ("Bar chart of plan prices, for the plans that include review requests.", "Gráfica de precios de los planes, para ver cuáles incluyen solicitudes de reseña."), ("Lead System ($197/mo, $4,728 illustrated) and Plus include review requests. Website and Own It do not.", "Lead System ($197/mes, $4,728 en la ilustración) y Plus incluyen solicitudes de reseña. Website y Own It no.")),
        use("a1-proof", 1),
    ]
    figures["missed-call-text-delayed-10dlc"] = [
        fig("diagram", 0, text_wait, ("Timeline of carrier review for missed-call text-back.", "Línea de tiempo de la revisión del operador para el texto por llamada perdida."), ("The surprise is this calendar. Plan the crew’s Monday around it.", "La sorpresa es este calendario. Planea el lunes del equipo alrededor de él.")),
        fig("diagram", 2, text_draft, ("Example of the text a caller eventually receives.", "Ejemplo del texto que la persona finalmente recibe."), ("It is still a text from the business. Say that out loud before you promise instant replies.", "Sigue siendo un texto del negocio. Dilo en voz alta antes de prometer respuestas instantáneas.")),
        fig("chart", 6, textback, ("Bar chart showing how each plan prices text-back.", "Gráfica de cómo cada plan cobra el texto."), ("This is the “which plan prices it which way” section, in one picture.", "Esta es la sección de cómo lo cobra cada plan, en una sola imagen.")),
    ]
    figures["google-business-profile-vs-website"] = [
        fig("diagram", 0, nap, ("Two-column diagram of profile jobs versus website jobs.", "Diagrama de dos columnas: trabajo del perfil y trabajo del sitio."), ("They show up in the same search and then do different work. Match the name, hours, and number.", "Aparecen en la misma búsqueda y luego hacen un trabajo distinto. Haz coincidir el nombre, el horario y el número.")),
        fig("chart", 4, prices, ("Bar chart of website plan prices beside a free profile.", "Gráfica de precios del sitio junto a un perfil gratis."), ("The profile is free to claim. The site is this separate line. You need the site when a job needs its own page.", "El perfil se reclama gratis. El sitio es esta partida aparte. Necesitas el sitio cuando un trabajo requiere su propia página.")),
        use("plumb-services", 2),
    ]
    figures["freelancer-vs-agency-vs-subscription-website"] = [
        fig("diagram", 3, choose_path, ("Diagram of monthly website plans versus owning the files.", "Diagrama de planes mensuales frente a ser dueño de los archivos."), ("A freelancer sells time. An agency adds meetings. This is the plan side of that choice, including the exit.", "Un freelancer vende tiempo. Una agencia suma reuniones. Este es el lado del plan en esa decisión, incluida la salida.")),
        fig("chart", 9, prices, ("Bar chart of published plan totals. Other quotes are not estimated.", "Gráfica de totales publicados. Las otras cotizaciones no se estiman."), ("Put freelancer and agency numbers in the blank columns yourself. These bars are the only prices this site will state.", "Anota tú los números del freelancer y de la agencia en las columnas vacías. Estas barras son los únicos precios que este sitio afirma.")),
        use("plumb-hero", 4),
    ]
    figures["wix-vs-squarespace-vs-managed-website-contractors"] = [
        fig("diagram", 2, diy, ("Diagram comparing a DIY builder with a managed website plan.", "Diagrama que compara un constructor DIY con un plan de sitio administrado."), ("Line up the bill you can see, then the evenings. Do not invent a DIY total here.", "Alinea la factura que sí ves, y luego las noches. No inventes aquí un total de DIY.")),
        fig("chart", 3, prices, ("Bar chart of the managed-plan totals.", "Gráfica de los totales del plan administrado."), ("Wix and Squarespace prices change on their sites. Compare those live numbers with this chart, not with a guessed average.", "Los precios de Wix y Squarespace cambian en sus sitios. Compara esos números en vivo con esta gráfica, no con un promedio adivinado.")),
    ]
    figures["web-design-for-contractors"] = [
        fig("diagram", 0, mobile_check, ("Checklist diagram for the first phone screen.", "Diagrama de revisión de la primera pantalla del teléfono."), ("Start here, in the driveway. The rest of the checklist hangs off a screen that already names the work.", "Empieza aquí, en la entrada. El resto de la lista cuelga de una pantalla que ya nombra el trabajo.")),
        fig("diagram", 1, two_doors, ("Diagram of one page per job and two next steps.", "Diagrama de una página por trabajo y dos siguientes pasos."), ("One page for the job, not a pile of towns. Two next steps, and only those.", "Una página para el trabajo, no una pila de pueblos. Dos siguientes pasos, y solo esos.")),
    ]
    plumb_paths = split(
        "plumb-call-paths",
        ("A leak and a heater quote", "Una fuga y una cotización de calentador"),
        ("Someone with water on the floor is not reading the about page.", "Alguien con agua en el piso no está leyendo la página de nosotros."),
        (("Leak", "Fuga"), [("The number", "El número"), ("Honest hours", "Horario real"), ("Can you come", "Si puedes ir")]),
        (("Heater", "Calentador"), [("Brands you install", "Marcas que instalas"), ("A short form", "Un formulario corto"), ("Photos of your work", "Fotos de tu trabajo")]),
        ("Two buyers. Two paths.", "Dos compradores. Dos caminos."),
    )
    figures["pagina-web-para-plomeros"] = [
        fig(
            "diagram",
            2,
            plumb_paths,
            ("Diagram of a plumber leak path versus a heater quote.", "Diagrama del camino de una fuga y el de una cotización de calentador."),
            ("The first screen has to serve the leak. The heater page can be calmer.", "La primera pantalla tiene que servir a la fuga. La página del calentador puede ser más calmada."),
        ),
        fig(
            "chart",
            7,
            price_chart("plumb-plans-legacy", ("plumbing", "plomería")),
            ("Bar chart of the four published website prices.", "Gráfica de los cuatro precios publicados del sitio."),
            ("The four plans are the same prices as every other trade. This page is about the call, not a plumbing surcharge.", "Los cuatro planes cuestan lo mismo que en cualquier oficio. Esta página es sobre la llamada, no un recargo de plomería."),
        ),
        use("plumb-hero", 1),
    ]
    figures["como-pedir-resenas-en-google"] = [
        fig("diagram", 3, review_flow, ("Diagram of the timing and the direct review link.", "Diagrama del momento y del enlace directo de reseña."), ("The direct link beats “find us on Google.” Send it when the job is done.", "El enlace directo gana a “búscanos en Google”. Envíalo cuando el trabajo terminó.")),
        fig("chart", 9, prices, ("Bar chart marking which plans include review requests.", "Gráfica que marca qué planes incluyen solicitudes de reseña."), ("Optional automation, when you want it, is Lead System or Plus. The ask itself is still yours to make.", "La automatización opcional, si la quieres, es Lead System o Plus. Pedir la reseña sigue siendo tuyo.")),
        use("a1-proof", 4),
    ]
    figures["google-business-profile-checklist"] = [
        fig("diagram", 0, gbp_steps, ("Four-step Google Business Profile checklist.", "Lista de cuatro pasos para el Perfil de Google Business."), ("Claim, hours, real photos, then decide if a website still has a job to do.", "Reclama, horario, fotos reales, y luego decide si el sitio todavía tiene un trabajo.")),
        fig("diagram", 7, nap, ("Diagram of what the profile will not replace.", "Diagrama de lo que el perfil no reemplaza."), ("The profile will not hold a full service page. That is the limit to remember before you skip the site.", "El perfil no va a contener una página de servicio completa. Ese es el límite que hay que recordar antes de saltarte el sitio.")),
        use("a1-hero", 5),
    ]
    figures["contractor-website-redesign-checklist"] = [
        fig("diagram", 2, redirect, ("Diagram of URL inventory, mapping, 301 tests, and Search Console.", "Diagrama de inventario de URLs, mapa, pruebas 301 y Search Console."), ("Write the map before launch day. The example in the article is this sequence.", "Escribe el mapa antes del día de lanzamiento. El ejemplo del artículo es esta secuencia.")),
        fig("chart", 6, pages, ("Bar chart of how many new pages each plan includes.", "Gráfica de cuántas páginas nuevas incluye cada plan."), ("Do not add pages on launch day until the old URLs answer. The ceiling can wait.", "No agregues páginas el día del lanzamiento hasta que las URLs viejas respondan. El límite puede esperar.")),
    ]
    figures["how-to-choose-contractor-web-designer"] = [
        fig("diagram", 1, questions, ("Diagram grouping designer questions into ownership, money, scope, and leads.", "Diagrama que agrupa las preguntas al diseñador en propiedad, dinero, alcance y clientes."), ("Get the answers in writing before a deposit. A nice mockup is not one of the four checks.", "Pide las respuestas por escrito antes de un anticipo. Un mockup bonito no es una de las cuatro revisiones.")),
        fig("chart", 2, prices, ("Bar chart of Kinexis plan prices to compare with any other quote.", "Gráfica de precios de Kinexis para comparar con cualquier otra cotización."), ("Ask every designer for the same columns: monthly or once, what cancel does, and who keeps the files. These bars are one published answer.", "Pide a cada diseñador las mismas columnas: mensual o una vez, qué pasa si cancelas y quién se queda los archivos. Estas barras son una respuesta publicada.")),
    ]
    figures["contractor-website-quote-form"] = [
        fig("diagram", 1, short_form, ("Phone wireframe of a four-field contractor quote form.", "Esquema de teléfono de un formulario de cotización de cuatro campos."), ("This is the default set: name, phone, job, city. The plumbing example below only changes the job words.", "Este es el conjunto base: nombre, teléfono, trabajo, ciudad. El ejemplo de plomería de abajo solo cambia las palabras del trabajo.")),
        fig("diagram", 3, keep_cut, ("Diagram of form fields to keep and fields to remove.", "Diagrama de campos que se quedan y campos que se quitan."), ("Cut the inventory off the first screen. Emergency traffic and after-work traffic both quit on it.", "Quita el inventario de la primera pantalla. El tráfico de emergencia y el de después del trabajo lo abandonan.")),
        fig("diagram", 4, two_doors, ("Diagram of a phone-first emergency page versus a form-first estimate page.", "Diagrama de una página de emergencia con teléfono primero y una de estimado con formulario primero."), ("The form is not the only door. A leak page should still lead with the phone.", "El formulario no es la única puerta. Una página de fugas debería seguir abriendo con el teléfono.")),
    ]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for stale in OUT.glob("preview-*"):
        stale.unlink()
    shots: dict[str, tuple[str, tuple[int, int]]] = {}
    for key, (filename, box) in SHOT_SOURCES.items():
        src, width, height = export_shot(key, filename, box)
        shots[key] = (src, (width, height))
        SHOT_COPY[key]  # fail early if copy is missing
    figures: dict[str, list] = {}
    build_trades(shots, figures)
    add_pillars(shots, figures)
    content = (ROOT / "src" / "lib" / "content.ts").read_text(encoding="utf-8")
    chunk = content.split("export const POSTS", 1)[1].split("export const REVIEWS", 1)[0]
    slugs = re.findall(r'slug: "([^"]+)"', chunk)
    missing = [slug for slug in slugs if slug not in figures]
    extra = sorted(set(figures) - set(slugs))
    if missing or extra:
        raise SystemExit(f"slug mismatch missing={missing} extra={extra}")
    kinds = {"diagram", "chart", "screenshot"}
    for slug, items in figures.items():
        present = {item["kind"] for item in figures[slug]}
        if slug == "contractor-website-quote-form":
            continue
        if not ({"diagram", "chart"} <= present or "diagram" in present and "screenshot" in present):
            pass
        if "diagram" not in present:
            raise SystemExit(f"{slug} has no diagram")
    payload = {slug: figures[slug] for slug in slugs}
    dest = ROOT / "src" / "data" / "blog-figures.json"
    dest.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {dest} ({len(payload)} posts)")


if __name__ == "__main__":
    main()
