# BGS Industrial Solution — Stickova Adhesives website

A modern, animated, responsive website for **BGS Industrial Solution Pvt. Ltd.** and the **Stickova** adhesive range, built from *STICKOVA CATALOG.pdf*.

## Pages

| Page | What's on it |
| --- | --- |
| `index.html` | Animated hero, industries marquee, the three product families, **Smart tools** (product finder + bag calculator), best sellers, about, scroll-linked process timeline, industries, FAQ, partner CTA |
| `products.html` | Full catalogue: category tabs, live search, product detail dialog (prev/next, share, compare, enquire), deep links such as `products.html#ruby` |
| `about.html` | Company story, stats, leadership messages, How We Work |
| `partner.html` | Dealer / distributor programme, partner benefits, application form |
| `contact.html` | Phone, WhatsApp, email (copy button), both offices, quote form with your enquiry list, map |
| `404.html` | Friendly not-found page |

## Features

**For visitors**
- **Enquiry list.** Add any products, set quantity and pack size, then send them all as one WhatsApp message or through the quote form. The list is saved on the visitor's device.
- **Compare.** Put up to 3 products side by side, including which jobs each one suits.
- **Product finder.** Pick the job (pools, mosaic, bus seats, laminates…) and get ranked matches.
- **Adhesive calculator.** Enter area, trowel size and wastage to get the number of 20 KG bags, and add them to the enquiry in one click.
- **Ctrl + K / "/" search** across products, pages and actions.
- **Dark mode.** Follows the system setting, with a toggle that is remembered.
- Mobile quick-action bar (Call · WhatsApp · Enquiry), floating WhatsApp button, back-to-top button with progress ring, toasts.

**Motion & design**
- Intro loader (first visit per session), word-by-word headline reveals, animated gradient blobs, rotating "Engineered for…" chip.
- Mouse-depth parallax in the hero, scroll parallax on images, 3D tilt and spotlight glow on cards, magnetic buttons, custom cursor (mouse only).
- Process timeline that fills as you scroll, animated counters, smooth page-to-page transitions (View Transitions API), header that hides on scroll down.
- Every animation is switched off for visitors with *Reduce motion* enabled.

**Technical**
- Installable PWA with offline support (`manifest.webmanifest`, `sw.js`).
- SEO: Organization and FAQ structured data, `sitemap.xml`, `robots.txt`, Open Graph tags.
- Accessible: keyboard navigation, focus states, ARIA on tabs, dialogs and accordion, skip link.

## Tech

Plain HTML, CSS and JavaScript, with no build step and no dependencies (Google Fonts: Sora + Inter).

```
index.html  products.html  about.html  partner.html  contact.html  404.html
manifest.webmanifest  sw.js  sitemap.xml  robots.txt
assets/
  css/style.css      design tokens (light + dark), components, motion
  js/data.js         ← products, contact details, FAQ, calculator rates (edit here)
  js/main.js         header/footer, theme, enquiry list, compare, search, tools, effects
  img/               optimised images extracted from the catalog + PWA icons
```

## Editing

- **Products, contact details, FAQ:** `assets/js/data.js`. Every page updates automatically.
- **Calculator consumption rates:** `BGS.calculator` in `data.js`. ⚠️ These are typical industry figures (3.5–7 kg/m² by trowel size), **not** from the catalog. Replace them with tested Stickova values when you have them.
- **Header / footer:** once in `assets/js/main.js` (`headerHTML` / `footerHTML`).
- **After deploying changes,** bump `VERSION` in `sw.js` so returning visitors get the new files.
- **Forms** have no backend. They open WhatsApp or the email app with the enquiry pre-filled. To store submissions, point them at Formspree or your own API.
- `sitemap.xml`, `robots.txt` and the structured data assume the domain `www.bgsindustrialsolution.com`. Change these if the site goes live elsewhere.

## Run locally

Open `index.html` directly, or serve the folder (needed for the PWA/offline features):

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## Deploy

It's a static site, so it works on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root), Netlify, Vercel or any host.
