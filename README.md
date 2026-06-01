# RISE / LAMD — Research Group Website

Bilingual (English + Portuguese) website for our research group at UNESP, built
with [Hugo](https://gohugo.io). Designed so that **anyone in the group can keep
it up to date by editing plain-text files** — no web-development experience
needed for day-to-day updates.

## Quick start

```bash
brew install hugo        # or see CONTRIBUTING.md for Windows/Linux
hugo server              # preview at http://localhost:1313
```

## How it's organized

| You want to change… | Edit this |
|---|---|
| Team members / alumni | `data/people.yaml` |
| Publications | `data/publications.yaml` |
| Projects / research lines | `data/projects.yaml` |
| News posts | `content/news/*.md` |
| Contact info | `data/contact.yaml` |
| Funding logos | `data/funding.yaml` |
| Page text (Home, Join us…) | `content/**/_index.*.md` |
| Colors / branding | top of `static/css/style.css` |
| Menu labels | `i18n/en.toml`, `i18n/pt.toml` |

**Full step-by-step instructions are in [CONTRIBUTING.md](CONTRIBUTING.md).**

## Design choices

- **Plain Hugo, no external theme** — the layouts in `layouts/` are ours, so
  nothing breaks when some upstream theme changes. Stable for years.
- **Content separated from layout** — everything that changes lives in `data/`
  and `content/`. Editing it never requires touching HTML.
- **Bilingual** via Hugo's built-in i18n (English + Portuguese).
- **Deploys automatically** to GitHub Pages on every push (see
  `.github/workflows/deploy.yml`).

## TODO before going live

- [ ] Replace the placeholder group name/tagline in `hugo.toml`.
- [ ] Set the real `baseURL` in `hugo.toml`.
- [ ] Add real photos to `static/img/people/` and logos to `static/img/funding/`.
- [ ] Fill in real people, projects, and publications.
- [ ] Confirm UNESP brand colors in `static/css/style.css`.
