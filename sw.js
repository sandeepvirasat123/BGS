/* Service worker — offline support.
   Pages: network first (fresh content), fall back to cache.
   Assets: cache first, refreshed in the background.
   Bump VERSION whenever you deploy changes to CSS/JS/images. */
const VERSION = "bgs-v10";
const CORE = [
  "./",
  "index.html",
  "products.html",
  "about.html",
  "partner.html",
  "contact.html",
  "404.html",
  "assets/css/style.css",
  "assets/js/data.js",
  "assets/js/main.js",
  "assets/img/bgs-logo.png",
  "assets/img/stickova-logo.png",
  "assets/img/favicon.png",
  "assets/img/hero-worker.webp",
  "assets/img/building.webp",
  "assets/img/pearl.webp",
  "assets/img/ruby.webp",
  "assets/img/sapphire.webp",
  "assets/img/tile-grout.webp",
  "assets/img/tin.webp",
  "assets/img/drum.webp",
  "assets/img/amber.webp",
  "assets/img/gaurav-khanna.webp",
  "assets/img/bharat-khanna.webp",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;
  if (url.pathname.endsWith(".pdf")) return; // large file: always from network

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match("index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => { if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});
