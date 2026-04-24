"""
Extract embedded images from Chrome/Blink saved .mhtml (multipart/related).
Keeps parts with Content-Type image/* and decodes base64 or quoted-printable bodies.
"""

from __future__ import annotations

import base64
import quopri
import re
import sys
from pathlib import Path


def find_boundary(header_region: str) -> str | None:
    m = re.search(r'boundary="([^"]+)"', header_region, re.I)
    return m.group(1) if m else None


def decode_body(raw: bytes, encoding: str) -> bytes:
    enc = (encoding or "8bit").lower().strip()
    if enc == "base64":
        cleaned = b"".join(raw.split())
        return base64.b64decode(cleaned, validate=False)
    if enc in ("quoted-printable", "qp"):
        return quopri_decode(raw)
    return raw


def quopri_decode(raw: bytes) -> bytes:
    return quopri.decodestring(raw)


def extract_images(mhtml_path: Path, out_dir: Path) -> list[tuple[Path, int]]:
    raw = mhtml_path.read_bytes()
    # Normalise newlines for header scan
    text_head = raw[:20000].decode("utf-8", errors="replace")
    boundary = find_boundary(text_head)
    if not boundary:
        print(f"No boundary: {mhtml_path}", file=sys.stderr)
        return []

    delim = b"--" + boundary.encode("ascii")
    parts = raw.split(delim)
    saved: list[tuple[Path, int]] = []

    post_slug = "ig"
    mloc = re.search(r"Snapshot-Content-Location:\s*https://www\.instagram\.com/p/([^/\s]+)/", text_head, re.I)
    if mloc:
        post_slug = mloc.group(1)

    for i, part in enumerate(parts[1:], start=0):
        part = part.strip()
        if not part or part == b"--\r\n" or part == b"--":
            continue
        header_end = part.find(b"\r\n\r\n")
        if header_end == -1:
            header_end = part.find(b"\n\n")
            sep = 2
        else:
            sep = 4
        if header_end == -1:
            continue
        headers = part[:header_end].decode("latin-1", errors="replace")
        body = part[header_end + sep :]
        if body.endswith(b"\r\n"):
            body = body[:-2]
        elif body.endswith(b"\n"):
            body = body[:-1]

        ct = None
        cte = "8bit"
        for line in headers.splitlines():
            low = line.lower()
            if low.startswith("content-type:"):
                ct = line.split(":", 1)[1].strip().split(";")[0].strip()
            elif low.startswith("content-transfer-encoding:"):
                cte = line.split(":", 1)[1].strip()

        if not ct or not ct.startswith("image/"):
            continue

        try:
            data = decode_body(body, cte)
        except Exception as e:
            print(f"skip decode {mhtml_path.name} part {i}: {e}", file=sys.stderr)
            continue
        if len(data) < 5000:  # skip tiny icons / avatars
            continue

        ext = ct.split("/")[-1]
        if ext == "jpeg":
            ext = "jpg"
        out_dir.mkdir(parents=True, exist_ok=True)
        fn = out_dir / f"{post_slug}_{len(data)}_{i}.{ext}"
        fn.write_bytes(data)
        saved.append((fn, len(data)))
        print(f"Wrote {fn} ({len(data)} bytes)")

    return saved


def main() -> None:
    downloads = Path(r"c:\Users\habin\Downloads")
    out = Path(__file__).resolve().parent.parent / "public" / "oryx" / "ig_extracted"
    files = [
        downloads / "(3) Instagram.mhtml",
        downloads / "(3) Instagram1.mhtml",
        downloads / "(3) Instagram2.mhtml",
        downloads / "(3) Instagram33.mhtml",
        downloads / "4.mhtml",
        downloads / "5.mhtml",
    ]
    all_saved: list[tuple[Path, int]] = []
    for f in files:
        if not f.exists():
            print(f"Missing: {f}", file=sys.stderr)
            continue
        print(f"=== {f.name} ===")
        all_saved.extend(extract_images(f, out))

    if not all_saved:
        print("No images extracted.", file=sys.stderr)
        sys.exit(1)
    # Report largest overall
    all_saved.sort(key=lambda x: -x[1])
    print("\nLargest 12 files:")
    for p, sz in all_saved[:12]:
        print(f"  {sz:>8}  {p.name}")


if __name__ == "__main__":
    main()
