#!/usr/bin/env python3
"""Convert a BibTeX file into the publications.yaml format used by this site.

Usage:
    python3 scripts/bib2yaml.py publications.bib > data/publications.yaml

Requires: pip install bibtexparser
Review the output afterwards — set `featured: true` on highlights, and double
check the `type` mapping below.
"""
import sys

try:
    import bibtexparser
except ImportError:
    sys.exit("Please run: pip install bibtexparser")

TYPE_MAP = {
    "article": "journal",
    "inproceedings": "conference",
    "conference": "conference",
    "phdthesis": "thesis",
    "mastersthesis": "thesis",
    "incollection": "chapter",
    "inbook": "chapter",
    "misc": "preprint",
    "unpublished": "preprint",
}


def y(s: str) -> str:
    """Quote a string safely for YAML."""
    return '"' + (s or "").replace('"', "'").replace("\n", " ").strip() + '"'


def main():
    if len(sys.argv) < 2:
        sys.exit("Usage: bib2yaml.py file.bib > data/publications.yaml")
    with open(sys.argv[1], encoding="utf-8") as f:
        db = bibtexparser.load(f)

    entries = sorted(db.entries, key=lambda e: e.get("year", "0"), reverse=True)

    print("# Generated from BibTeX by scripts/bib2yaml.py — review before committing.")
    for e in entries:
        title = e.get("title", "").strip("{}")
        authors = e.get("author", "").replace(" and ", "; ")
        venue = e.get("journal") or e.get("booktitle") or e.get("school") or ""
        ptype = TYPE_MAP.get(e.get("ENTRYTYPE", "").lower(), "journal")
        doi = e.get("doi", "")
        doi = f"https://doi.org/{doi}" if doi and not doi.startswith("http") else doi

        print(f"\n- title: {y(title)}")
        print(f"  authors: {y(authors)}")
        print(f"  venue: {y(venue.strip('{}'))}")
        print(f"  year: {e.get('year', '0')}")
        print(f"  type: {ptype}")
        print(f"  featured: false")
        if doi:
            print(f"  doi: {y(doi)}")


if __name__ == "__main__":
    main()
