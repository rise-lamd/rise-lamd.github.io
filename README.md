# RISE-LAMD — Research Group Website

Bilingual (English 🇬🇧 + Portuguese 🇧🇷) website for **RISE-LAMD — Recognition,
Inference and Search on Language and Multimedia Data**, a research laboratory at
**UNESP** (DEMAC / IGCE — Câmpus de Rio Claro, linked to UNESPetro), built with [Hugo](https://gohugo.io).

It is designed around one principle: **anyone in the group can keep it up to date
by editing plain-text files.** You do not need to know HTML, CSS, or web
development for day-to-day updates (adding a member, a paper, a news post). You
only edit simple `.yaml` and `.md` files; the site rebuilds itself.

- 👉 **Just want to add content?** Jump to [Creating content](#creating-content),
  or read the short cheat sheet in [CONTRIBUTING.md](CONTRIBUTING.md).
- 🧠 **Want to understand how it works?** Read [Architecture](#architecture).

---

## Table of contents

1. [Quick start](#quick-start)
2. [Architecture](#architecture)
3. [Directory structure](#directory-structure)
4. [How the data-driven rendering works](#how-the-data-driven-rendering-works)
5. [Creating content](#creating-content)
6. [Bilingual content (EN / PT)](#bilingual-content-en--pt)
7. [Styling & branding](#styling--branding)
8. [Previewing locally](#previewing-locally)
9. [Deploying (GitHub Pages)](#deploying-github-pages)
10. [Importing publications from BibTeX](#importing-publications-from-bibtex)
11. [Before going live](#before-going-live)
12. [Troubleshooting](#troubleshooting)

---

## Quick start

```bash
brew install hugo     # macOS. Windows/Linux: see "Previewing locally" below
hugo server           # run from this folder
```

Open <http://localhost:1313>. The site reloads automatically as you save files.
Press `Ctrl+C` to stop.

---

## Architecture

### The big idea: content is separated from layout

A research group website's pain point is that **content changes constantly**
(papers, members, awards) while the **design stays the same**. So we keep the two
completely separate:

```
        WHAT CHANGES OFTEN                  WHAT RARELY CHANGES
    ┌─────────────────────────┐        ┌──────────────────────────┐
    │  data/*.yaml             │        │  layouts/*.html (design) │
    │  content/**/*.md         │  ───▶  │  static/css/style.css    │  ───▶  public/
    │  (people, papers, news)  │        │  i18n/*.toml (UI labels) │       (the website)
    └─────────────────────────┘        └──────────────────────────┘
         you edit these                  you rarely touch these          generated — never edit
```

To add a person you edit a YAML file. Hugo (the "static site generator") reads
your data, pours it into the HTML templates, and produces a plain folder of HTML
files (`public/`) that can be hosted anywhere. There is **no database and no
server-side code** — that is what makes it fast, free to host, and low-maintenance.

### Why these technology choices

| Choice | Why |
|---|---|
| **Hugo** (static site generator) | Single binary, installs in seconds, never breaks between versions. Best-in-class multilingual support. Reads YAML/JSON data natively. |
| **No external theme** | The templates in `layouts/` are *ours*. Many academic sites broke when their upstream theme (e.g. Wowchemy/HugoBlox) rebranded. Owning the layouts means nothing changes underneath us. |
| **Data files for dynamic content** | A student can edit `people.yaml` without understanding HTML. One source of truth → no inconsistent copies. |
| **GitHub Pages + Actions** | Free hosting, automatic rebuild on every push, full version history (you can undo any change). |

---

## Directory structure

```
RISE-LAMD/
├── hugo.toml                 # Site config: name, languages, menu, base URL
│
├── data/                     # ★ THE CONTENT YOU EDIT MOST ★ (structured data)
│   ├── people.yaml           #   team members & alumni
│   ├── publications.yaml     #   papers
│   ├── projects.yaml         #   research lines / projects
│   ├── funding.yaml          #   funding agency logos
│   └── contact.yaml          #   contact details & social links
│
├── content/                  # ★ Page text & news, as Markdown ★
│   ├── _index.en.md          #   home page text (English)
│   ├── _index.pt.md          #   home page text (Portuguese)
│   ├── about/                #   history, mission, coordination & partners
│   ├── people/               #   intro text for the People page
│   ├── research/             #   intro text for the Research page
│   ├── publications/         #   intro text for the Publications page
│   ├── news/                 #   one file pair (.en.md/.pt.md) per news post
│   ├── opportunities/        #   opportunities & joining the lab (alias: /join/)
│   └── contact/              #   intro text for the Contact page
│
├── layouts/                  # HTML templates (the design — rarely touched)
│   ├── _default/             #   baseof (page skeleton), single, list
│   ├── partials/             #   reusable bits: header, footer, person-card, funding
│   ├── index.html            #   home page layout
│   ├── about/list.html       #   about page layout
│   ├── people/list.html      #   renders data/people.yaml
│   ├── research/list.html    #   renders data/projects.yaml
│   ├── publications/list.html#   renders data/publications.yaml
│   ├── news/                 #   news list + single-post layouts
│   └── contact/list.html     #   renders data/contact.yaml
│
├── i18n/                     # UI labels ("People", "Equipe", etc.)
│   ├── en.toml
│   └── pt.toml
│
├── static/                   # Files served as-is
│   ├── css/style.css         #   all styling (The Signal Field design tokens & themes)
│   └── img/                  #   photos & logos go here
│
├── scripts/
│   └── bib2yaml.py           # optional: convert BibTeX → publications.yaml
│
├── .github/workflows/
│   └── deploy.yml            # auto-build & deploy to GitHub Pages
│
├── CONTRIBUTING.md           # short task-oriented cheat sheet
├── DESIGN.md                 # visual system & design tokens guide
└── README.md                 # this file
```

---

## How the data-driven rendering works

You don't need this section to add content, but it helps to understand the magic.

Take the People page. The file `data/people.yaml` contains a list of people:

```yaml
- name: "Ana Silva"
  pi: false
  alumni: false
  role: { en: "MSc Student", pt: "Mestranda" }
```

The template `layouts/people/list.html` loops over that list and decides which
section each person belongs in:

```go-html-template
{{ $people := sort hugo.Data.people "weight" }}

{{ with where $people "pi" true }}          <!-- the PI -->
{{ with where ... "alumni" "!=" true }}      <!-- current members -->
{{ with where $people "alumni" true }}       <!-- alumni -->
```

So when you flip `alumni: false → true` on someone, they automatically move from
the Members section to the Alumni section. **You never edit HTML to do this.**
Publications (grouped by year), projects (active vs. archived), and the home page's
"latest news" work the same way.

---

## Creating content

> Reminder: every text field has an English (`en`) and Portuguese (`pt`) version.
> **Fill in both.** See [Bilingual content](#bilingual-content-en--pt).

### ➕ Add a team member

Edit [`data/people.yaml`](data/people.yaml). Copy an existing block and edit it:

```yaml
- name: "Full Name"
  pi: false              # true only for the Principal Investigator
  alumni: false
  weight: 20             # lower number = listed higher up
  photo: "/img/people/filename.jpg"   # optional; omit for a placeholder
  role:
    en: "PhD Student"
    pt: "Doutorando(a)"
  interests:
    en: "One line on their research."
    pt: "Uma linha sobre a pesquisa."
  email: "name@unesp.br"
  links:
    lattes: "http://lattes.cnpq.br/XXXX"
    scholar: "https://scholar.google.com/..."   # optional
    orcid: "https://orcid.org/..."              # optional
```

- **Photos:** put a square image (~400×400 px) in `static/img/people/` and point
  `photo` to `/img/people/your-file.jpg`.
- **When someone graduates / leaves:** do *not* delete them. Set `alumni: true`
  and add a `now:` field — they move to the Alumni section automatically:
  ```yaml
  alumni: true
  now: { en: "Data Scientist at Company X", pt: "Cientista de Dados na Empresa X" }
  ```

### ➕ Add a publication

Edit [`data/publications.yaml`](data/publications.yaml). Add a block at the **top**
(newest first):

```yaml
- title: "Title of the paper"
  authors: "Silva, A.; Almeida, T."
  venue: "Journal or Conference name"
  year: 2026
  type: journal          # journal | conference | thesis | preprint | chapter
  featured: true         # true → also appears on the home page
  doi: "https://doi.org/..."
  pdf: ""                # optional direct PDF link
  code: ""               # optional code link
  project: ""            # optional project page
  supplementary: ""      # optional supplementary material
  poster: ""              # optional poster
  dataset: ""             # optional dataset
  video: ""               # optional video
```

Papers are grouped by year automatically. (Have a `.bib` file? See
[Importing from BibTeX](#importing-publications-from-bibtex).)

For a compact visual publication row, use the GRaCE entry in `data/publications.yaml` as a
template. Add `showcase: true`, a bilingual `summary`, bilingual `highlights`,
and a `visual` block pointing to an image under `static/img/publications/`.

### ➕ Add or archive a project

Edit [`data/projects.yaml`](data/projects.yaml):

```yaml
- title: { en: "Project title", pt: "Título do projeto" }
  status: active         # active → "Active projects"; archived → "Past projects"
  weight: 1
  image: "/img/projects/file.jpg"   # optional
  abstract:
    en: "One short paragraph for a non-specialist."
    pt: "Um parágrafo curto para não especialistas."
  funding: "FAPESP #2026/00000-0"
  collaborators: ["Partner Lab, University Y"]
  links: { code: "https://github.com/...", paper: "https://doi.org/..." }
```

To retire a finished project, just change `status: active` → `status: archived`.

### ➕ Post news (paper accepted, award, thesis defense, event)

News posts are Markdown files, **one pair per post** (English + Portuguese).
The easiest way is to copy the existing example:

1. Copy `content/news/2025-09-29-group-officialized.en.md` and its `.pt.md` twin.
2. Rename **both**, starting with today's date:
   ```
   content/news/2026-03-15-best-paper-award.en.md
   content/news/2026-03-15-best-paper-award.pt.md
   ```
3. Edit the front matter (between the `---` lines) and the text below it:
   ```markdown
   ---
   title: "We won the Best Paper Award at ICMLA 2026"
   date: 2026-03-15
   summary: "One-sentence teaser shown in the news list."
   ---

   Full text of the announcement goes here. **Markdown** works:
   links, **bold**, lists, images, etc.
   ```

Newest posts appear first, and the 3 most recent show on the home page — all
automatically.

### ✏️ Edit fixed page text (Home, About, Opportunities, Contact)

These live in `content/` as Markdown, one file pair per page
(`_index.en.md` / `_index.pt.md`):
- **Home:** `content/_index.{en,pt}.md` (intro statement, callout)
- **About:** `content/about/_index.{en,pt}.md` (institutional history, mission, coordination, partner labs)
- **Opportunities:** `content/opportunities/_index.{en,pt}.md` (open positions, profiles sought, application process; aliases: `/join/`)
- **Contact:** `content/contact/_index.{en,pt}.md` (intro paragraph above the contact grid)

Edit the text below the `---` frontmatter block.

### ✏️ Change contact info / funding logos / menu

- **Contact:** [`data/contact.yaml`](data/contact.yaml) (email, phone, address, maps, social)
- **Funding logos:** [`data/funding.yaml`](data/funding.yaml) (put logo files in `static/img/funding/`)
- **Menu order:** `[menus]` section in [`hugo.toml`](hugo.toml)
- **Menu labels:** `nav_*` keys in `i18n/en.toml` and `i18n/pt.toml`

---

## Bilingual content (EN / PT)

The site is fully bilingual. There are two mechanisms, depending on the file:

- **Data files (`data/*.yaml`):** bilingual fields are written inline as
  `{ en: "...", pt: "..." }` (or as two indented lines). Fill in both.
- **Content pages (`content/`):** there are two separate files per page, suffixed
  `.en.md` and `.pt.md`.
- **UI labels** (button text, section titles like "Publications"/"Publicações")
  live in `i18n/en.toml` and `i18n/pt.toml`, keyed by name.

The language switcher (top-right **EN / PT**) links each page to its translation.

> **Translation policy tip:** keep the home page and research descriptions in both
> languages, but you may decide that some institutional/local content is
> Portuguese-only. Agree on a policy so translations don't fall behind.

---

## Styling & branding

The site uses **The Signal Field** design system — an instrument-grade aesthetic built with modern CSS OKLCH tokens, supporting automatic/manual dark and light modes.

All styling lives in [`static/css/style.css`](static/css/style.css) and is thoroughly documented in [`DESIGN.md`](DESIGN.md).

Design tokens are defined as CSS variables at the top of `style.css`:

```css
/* Theme: DARK (default) */
:root {
  --bg:        oklch(0.185 0.028 260);   /* deep navy canvas */
  --surface:   oklch(0.225 0.034 260);   /* cards & containers */
  --ink:       oklch(0.955 0.008 250);   /* crisp luminous text */
  --muted:     oklch(0.74 0.022 250);    /* secondary text */
  --line:      oklch(0.32 0.03 260);     /* borders & dividers */
  --accent:    oklch(0.74 0.135 228);   /* cyan signal */
  --link:      oklch(0.82 0.11 220);    /* WCAG AA text-safe accent */
  --grow:      oklch(0.76 0.15 150);    /* green growth accent */
}

/* Theme: LIGHT */
[data-theme="light"] {
  --bg:        oklch(0.992 0.004 250);   /* paper canvas */
  --surface:   oklch(0.965 0.006 250);
  --ink:       oklch(0.25 0.022 255);
  --accent:    oklch(0.46 0.11 230);
  ...
}
```

Theme switching is persistent via a top-right theme toggle button (`localStorage`). Accessible contrast (WCAG AA/AAA) and responsive mobile touch targets (44px minimum) are built-in.

---

## Previewing locally

**Install Hugo (extended version):**

| OS | Command |
|---|---|
| macOS | `brew install hugo` |
| Windows | `winget install Hugo.Hugo.Extended` |
| Linux | `sudo snap install hugo` (or download a release) |
| Any | Download from <https://github.com/gohugoio/hugo/releases> |

Then, from this folder:

```bash
hugo server
```

Open <http://localhost:1313>. Edits appear instantly. You do **not** need Hugo to
make a small text edit through GitHub's web interface — but local preview is
recommended before publishing.

---

## Deploying (GitHub Pages)

Hosting is **free** via GitHub Pages, and the site rebuilds automatically on every
change.

**One-time setup:**

1. Push this repository to GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
3. Set your real URL in [`hugo.toml`](hugo.toml) (`baseURL`), e.g.
   `https://your-org.github.io/`.

After that, **every push to the `main` branch** triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
site and publishes it in about a minute.

**Recommended workflow for the group:** members propose changes via a Pull
Request; a faculty member or the site maintainer reviews and merges. This gives you
review + a full undo history.

---

## Importing publications from BibTeX

If your group keeps references in Zotero or Mendeley, you can avoid typing entries
by hand:

```bash
pip install bibtexparser
python3 scripts/bib2yaml.py publications.bib > data/publications.yaml
```

Then review the output — set `featured: true` on a few highlights, and check the
`type` of each entry (the script guesses from the BibTeX entry type). Hugo cannot
read `.bib` files directly, which is why this conversion step exists.

---

## Before going live

- [x] Configure group name, email, and bilingual taglines in [`hugo.toml`](hugo.toml).
- [x] Configure institutional contact & DEMAC/IGCE Rio Claro address in [`data/contact.yaml`](data/contact.yaml).
- [x] Establish design system and theme tokens in [`static/css/style.css`](static/css/style.css) (The Signal Field).
- [x] Set the real production `baseURL` in [`hugo.toml`](hugo.toml) (`https://siam-unesp.github.io/RISE-LAMD/`).
- [x] Add real member photos to `static/img/people/`.
- [x] Add funding agency logos to `static/img/funding/`.
- [x] Populate real people, projects, and publications in `data/`.
- [x] Verify visual appearance, responsive layout, and bilingual symmetry.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `hugo: command not found` | Hugo isn't installed — see [Previewing locally](#previewing-locally). |
| Page shows a broken image | The `photo`/`logo` path doesn't match a file in `static/img/...`. Check the path and filename (case-sensitive). |
| A YAML edit broke the build | YAML is indentation-sensitive. Don't use tabs; keep the same indentation as the surrounding lines. The terminal running `hugo server` prints the line number of the error. |
| Portuguese text not showing | Make sure you filled in the `pt:` field (data files) or created the `.pt.md` file (content pages). |
| Changes not live on the public site | Confirm you pushed to `main`, then check the **Actions** tab on GitHub for the build status. |
