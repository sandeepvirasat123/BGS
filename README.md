# BGS Industrial Solution — Stickova Adhesives website

A modern, responsive marketing website for **BGS Industrial Solution Pvt. Ltd.** and the **Stickova** adhesive range, built from the *STICKOVA CATALOG.pdf*.

## Pages

| Page | What's on it |
| --- | --- |
| `index.html` | Hero, industries marquee, three product families, **interactive product finder**, best sellers, about teaser, 5-step process, industries, partner CTA |
| `products.html` | Full catalogue: category tabs, live search and a detail dialog for every product (deep-linkable, e.g. `products.html#ruby`) |
| `about.html` | Company story, stats, leadership messages, How We Work |
| `partner.html` | Dealer / distributor programme, the six partner benefits, partner application form |
| `contact.html` | Phone, WhatsApp, email, both offices, quote form (product pre-selected from the product dialog), Google Map |

## Product range (11 products)

- **Tile Adhesives & Grout (StickoStrong):** Pearl, Ruby, Sapphire, Tile Grout
- **Synthetic Rubber Adhesives (StickoBond):** SR 1386, SP 1411 B, SP 1415 H, SR 1430
- **White / Water-based Adhesives (StickoBond):** Ezee, Super, Super Plus

## Tech

Plain HTML, CSS and JavaScript, with no build step and no dependencies (Google Fonts: Sora + Inter).

```
index.html  products.html  about.html  partner.html  contact.html
assets/
  css/style.css      design system + components
  js/data.js         ← all product data & contact details (edit here)
  js/main.js         header/footer, product cards, dialog, finder, filters, forms
  img/               optimised WebP/PNG images extracted from the catalog
```

- **Edit products or contact details** in `assets/js/data.js`. Every page updates automatically.
- **Edit the header or footer** once in `assets/js/main.js` (`headerHTML` / `footerHTML`).
- **Forms** have no backend. On submit they open WhatsApp (or the email app) with the enquiry pre-filled for `+91-8054004498` / `info@bgsindustrialsolutions.com`. To collect submissions on a server instead, point the form at a service such as Formspree or your own API.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## Deploy

It's a static site, so it works on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root), Netlify, Vercel or any web host.
