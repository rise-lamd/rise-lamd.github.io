# How to update this website

This site is built with [Hugo](https://gohugo.io). **You almost never edit HTML.**
Everything that changes often lives in plain-text files in `data/` and `content/`.
Pick the task below and follow the steps.

> **Golden rule:** content is bilingual (English + Portuguese). Wherever you see
> `en:` and `pt:` fields, fill in **both**.

---

## 0. One-time setup (to preview changes on your computer)

1. Install Hugo (the "extended" version):
   - macOS: `brew install hugo`
   - Windows: `winget install Hugo.Hugo.Extended`
   - Or download from <https://github.com/gohugoio/hugo/releases>
2. In a terminal, from this folder, run:
   ```
   hugo server
   ```
3. Open <http://localhost:1313> in your browser. The site reloads automatically
   as you save files. Press `Ctrl+C` to stop.

You do **not** need to install Hugo just to make a small text edit through
GitHub's website — but previewing locally is recommended before publishing.

---

## 1. Add or update a team member

Edit **`data/people.yaml`**. Copy an existing block and change the fields.

- Photos: drop a square image (~400×400) into `static/img/people/` and set
  `photo: "/img/people/their-file.jpg"`. Leave `photo` out to use a placeholder.
- **When someone graduates / leaves:** change `alumni: false` to `alumni: true`
  and add a `now:` field with their new position. They move to the Alumni section
  automatically — don't delete them.

## 2. Add a publication

Edit **`data/publications.yaml`**. Copy the top block, fill it in. Newest papers
go at the top. Set `featured: true` to also show it on the home page.
(Prefer importing from BibTeX? See the last section.)

## 3. Add / archive a project

Edit **`data/projects.yaml`**. To retire a finished project, just change
`status: active` to `status: archived`.

## 4. Post news (new paper, award, defense, event)

Copy the two sample files in `content/news/` — there's an `.en.md` and a `.pt.md`
for each post. Rename **both** with today's date, e.g.:

```
content/news/2026-03-15-best-paper-award.en.md
content/news/2026-03-15-best-paper-award.pt.md
```

Edit the `title`, `date`, `summary`, and body text in each. Newest posts appear
first automatically, and the 3 latest show on the home page.

## 5. Change contact info, funding logos, the menu

- Contact details: `data/contact.yaml`
- Funding agency logos: `data/funding.yaml` (put logo images in `static/img/funding/`)
- Menu order / labels: menu structure is in `hugo.toml`; the visible labels are
  in `i18n/en.toml` and `i18n/pt.toml`.
- Colors / branding: the variables at the top of `static/css/style.css`.

## 6. Edit the static page text (Home, Join us, Contact intro)

Those live in `content/` as Markdown, one file per language
(`_index.en.md` / `_index.pt.md`). Edit the text below the `---` block.

---

## Publishing your changes

If using GitHub: commit and push (or open a Pull Request for review). The site
rebuilds and deploys automatically via GitHub Actions — see
`.github/workflows/deploy.yml`. Give it ~1 minute, then refresh the live site.

---

## Optional: importing publications from BibTeX

If your group keeps references in Zotero/Mendeley, you can avoid typing entries by
hand. Export your library as `publications.bib`, place it in the project root, and
run the helper script:

```
python3 scripts/bib2yaml.py publications.bib > data/publications.yaml
```

Review the result (you may want to set `featured: true` on a few, and the script
can't know publication `type` perfectly). Requires `pip install bibtexparser`.
