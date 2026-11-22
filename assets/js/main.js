/* =========================================================
   BGS Industrial Solution — site behaviour
   Sections:
     1. Helpers & icons        9. Command palette (Ctrl+K)
     2. Header / footer       10. Home: finder, calculator, FAQ
     3. Theme                 11. Products page
     4. Loader / progress     12. Forms
     5. Toasts                13. Contact helpers
     6. Enquiry list          14. Motion & effects
     7. Product cards/dialog  15. PWA
     8. Compare
   ========================================================= */
(function () {
  "use strict";

  /* ======================================================
     1. Helpers & icons
     ====================================================== */
  const C = BGS.contact;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const store = {
    get(k, fallback, s = localStorage) { try { const v = s.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
    set(k, v, s = localStorage) { try { s.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
  };
  let io; // IntersectionObserver for .reveal (see section 14)
  const waLink = (text) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
  const absUrl = (path) => new URL(path, location.href).href;

  const svg = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const I = {
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    left: svg('<path d="m15 18-6-6 6-6"/>'),
    right: svg('<path d="m9 18 6-6-6-6"/>'),
    up: svg('<path d="M12 19V5M5 12l7-7 7 7"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    mail: svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
    close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    checkCircle: svg('<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>'),
    box: svg('<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>'),
    search: svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
    spark: svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>'),
    brush: svg('<path d="m9.1 11.9 7.4-7.4a2.1 2.1 0 0 1 3 3l-7.4 7.4"/><path d="M7 14c-1.7 0-3 1.3-3 3 0 1.3-1 2-2 2 1 1.5 2.7 2 4 2a4 4 0 0 0 4-4c0-1.7-1.3-3-3-3z"/>'),
    spray: svg('<path d="M3 3h.01M7 5h.01M11 7h.01M3 7h.01M7 9h.01M3 11h.01"/><rect x="15" y="5" width="4" height="4"/><path d="m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    list: svg('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>'),
    bag: svg('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>'),
    compare: svg('<path d="M16 3h5v5M8 21H3v-5M21 3l-7 7M3 21l7-7"/>'),
    share: svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>'),
    moon: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    file: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/>'),
    home: svg('<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>'),
    grid: svg('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'),
    info: svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
    users: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),
    calc: svg('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h4"/>'),
    target: svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
    copy: svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.2 0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 6.9 2.9 1.9 1.9 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.2.1 12 .1 5.5.1.2 5.4.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.7c1.7.9 3.7 1.4 5.6 1.4 6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.4-8.3z"/></svg>',
  };
  BGS.icons = I;

  const catOf = (id) => BGS.categories.find((c) => c.id === id);
  const byId = (id) => BGS.products.find((p) => p.id === id);

  /* ======================================================
     2. Header / footer
     ====================================================== */
  const page = document.body.dataset.page || "";
  const navItems = [
    ["home", "index.html", "Home"],
    ["products", "products.html", "Products"],
    ["about", "about.html", "About"],
    ["partner", "partner.html", "Partner With Us"],
    ["contact", "contact.html", "Contact"],
  ];

  const headerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="progress" id="progress" aria-hidden="true"></div>
    <div class="topbar">
      <div class="container">
        <span class="topbar__msg"><span class="live"></span>Stickova Adhesives — Tile, Rubber &amp; Wood adhesive solutions</span>
        <div class="topbar__links">
          <a href="${C.phoneHref}">${I.phone}<span>${C.phone}</span></a>
          <a href="mailto:${C.email}">${I.mail}<span>${C.email}</span></a>
        </div>
      </div>
    </div>
    <header class="site-header" id="siteHeader">
      <div class="container">
        <a class="brand" href="index.html" aria-label="BGS Industrial Solution — home">
          <img src="assets/img/bgs-logo.png" alt="" width="46" height="46" />
        </a>
        <nav class="nav" id="siteNav" aria-label="Main">
          <span class="nav__pill" aria-hidden="true"></span>
          ${navItems.map(([id, href, label]) => `<a href="${href}"${id === page ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
          <a class="btn btn--blue nav__cta" href="contact.html#enquiry">Get a Quote</a>
          <button class="nav__theme" type="button" data-theme-toggle><span class="moon">${I.moon}</span><span class="sun">${I.sun}</span><span>Switch theme</span></button>
        </nav>
        <div class="header-cta">
          <button class="header-search" type="button" data-palette aria-label="Search products and pages (Ctrl+K)">${I.search}<span class="label">Search</span><span class="kbd">Ctrl K</span></button>
          <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="Toggle dark mode"><span class="moon">${I.moon}</span><span class="sun">${I.sun}</span></button>
          <button class="icon-btn" type="button" data-drawer aria-label="Open enquiry list">${I.bag}<span class="badge" data-enquiry-count>0</span></button>
          <a class="btn btn--blue btn--sm" href="contact.html#enquiry" data-magnetic>Get a Quote ${I.arrow}</a>
          <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="siteNav"><span></span></button>
        </div>
      </div>
    </header>`;

  const footerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-news reveal">
          <div>
            <h3>Get the complete Stickova catalog.</h3>
            <p>All 11 products, application areas, packaging and shelf life in one PDF.</p>
          </div>
          <div class="footer-news__actions">
            <a class="btn btn--blue" href="STICKOVA%20CATALOG.pdf" download>${I.file} Download PDF</a>
            <a class="btn btn--outline-light" href="${waLink("Hello BGS Industrial Solution, please share the Stickova catalog and price list.")}" target="_blank" rel="noopener">${I.whatsapp} Ask on WhatsApp</a>
          </div>
        </div>
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="index.html"><img src="assets/img/bgs-logo.png" alt="" width="46" height="46" /><span class="brand__text"><span class="brand__name">BGS Industrial Solution</span><span class="brand__sub">Stickova Adhesives</span></span></a>
            <p>A sister concern of Bharat DyeChem Pvt Ltd — 70 years of industry leadership — delivering high-performance adhesive solutions with consistent quality and competitive pricing.</p>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              <li><a href="products.html#tile">Tile Adhesives &amp; Grout</a></li>
              <li><a href="products.html#rubber">Synthetic Rubber Adhesives</a></li>
              <li><a href="products.html#wood">White / Wood Adhesives</a></li>
              <li><a href="index.html#tools">Product Finder</a></li>
              <li><a href="index.html#calculator">Adhesive Calculator</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="about.html#leadership">Leadership</a></li>
              <li><a href="about.html#how-we-work">How We Work</a></li>
              <li><a href="partner.html">Become a Partner</a></li>
              <li><a href="index.html#faq">FAQs</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer-addr">
            <h4>Reach us</h4>
            <div><strong>Head Office</strong><p>A-43, Sector 65, Noida,<br />Uttar Pradesh – 201301</p></div>
            <div><strong>Amritsar Office</strong><p>Opp. Valmiki Mandir, Bali Singh Bhagwan Singh Road, O/S Ghee Mandi Gate, Amritsar – 143001</p></div>
            <div><p><a href="${C.phoneHref}">${C.phone}</a><br /><a href="mailto:${C.email}">${C.email}</a></p></div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} BGS Industrial Solution Pvt. Ltd. All rights reserved.</span>
          <span>Stickova Adhesives · StickoStrong · StickoBond</span>
        </div>
      </div>
      <div class="footer-big" aria-hidden="true">STICKOVA</div>
    </footer>
    <a class="wa-fab" href="${waLink("Hello BGS Industrial Solution, I'd like to know more about Stickova adhesives.")}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${I.whatsapp}</a>
    <button class="to-top" type="button" id="toTop" aria-label="Back to top">
      <svg class="ring" viewBox="0 0 48 48" aria-hidden="true"><circle class="track" cx="24" cy="24" r="22"/><circle class="bar" cx="24" cy="24" r="22"/></svg>
      <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
    <nav class="m-bar" id="mBar" aria-label="Quick actions">
      <a href="${C.phoneHref}">${I.phone}Call</a>
      <a class="is-wa" href="${waLink("Hello BGS Industrial Solution, I'd like to know more about Stickova adhesives.")}" target="_blank" rel="noopener">${I.whatsapp}WhatsApp</a>
      <button type="button" data-drawer>${I.bag}Enquiry<span class="badge" data-enquiry-count>0</span></button>
    </nav>
    <div class="toasts" id="toasts" role="status" aria-live="polite"></div>`;

  const hMount = $("#header");
  const fMount = $("#footer");
  if (hMount) hMount.outerHTML = headerHTML;
  if (fMount) fMount.outerHTML = footerHTML;

  const header = $("#siteHeader");
  const toggle = $("#menuToggle");

  function setMenu(open) {
    if (!toggle) return;
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) document.documentElement.style.setProperty("--nav-top", header.getBoundingClientRect().bottom + "px");
  }
  if (toggle) {
    toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    $$("#siteNav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    window.addEventListener("resize", () => window.innerWidth > 1040 && setMenu(false));
  }

  /* Sliding pill under nav links (desktop) */
  const nav = $("#siteNav");
  const pill = nav && $(".nav__pill", nav);
  if (pill) {
    const links = $$("a:not(.nav__cta)", nav);
    const current = links.find((a) => a.hasAttribute("aria-current"));
    const moveTo = (a) => {
      if (!a) { pill.style.opacity = "0"; return; }
      pill.style.width = a.offsetWidth + "px";
      pill.style.transform = `translateX(${a.offsetLeft}px)`;
      pill.style.opacity = "1";
    };
    links.forEach((a) => a.addEventListener("mouseenter", () => moveTo(a)));
    nav.addEventListener("mouseleave", () => moveTo(current));
    requestAnimationFrame(() => moveTo(current));
    document.fonts && document.fonts.ready.then(() => moveTo(current));
  }

  /* ======================================================
     3. Theme
     ====================================================== */
  const root = document.documentElement;
  function setTheme(t, announce) {
    root.dataset.theme = t;
    store.set("bgs-theme", t);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = t === "dark" ? "#0b1120" : "#ffffff";
    if (announce) toast(t === "dark" ? "Dark mode on" : "Light mode on");
  }
  const toggleTheme = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
  document.addEventListener("click", (e) => { if (e.target.closest("[data-theme-toggle]")) toggleTheme(); });

  /* ======================================================
     4. Loader, scroll progress, header auto-hide, back-to-top
     ====================================================== */
  const loading = root.classList.contains("is-loading");
  if (loading) {
    const l = document.createElement("div");
    l.className = "loader";
    l.innerHTML = `<div class="loader__inner"><img class="loader__logo" src="assets/img/bgs-logo.png" alt="" /><div class="loader__word">${"STICKOVA".split("").map((c, i) => `<span style="animation-delay:${0.15 + i * 0.04}s">${c}</span>`).join("")}</div><div class="loader__bar"></div></div>`;
    document.body.prepend(l);
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      root.classList.remove("is-loading");
      startMotion();
      l.classList.add("is-done");
      setTimeout(() => l.remove(), 600);
      try { sessionStorage.setItem("bgs-seen", "1"); } catch (e) { /* ignore */ }
    };
    const t0 = performance.now();
    const finish = () => setTimeout(done, Math.max(0, 1000 - (performance.now() - t0)));
    if (document.readyState === "complete") finish(); else window.addEventListener("load", finish, { once: true });
    setTimeout(done, 2500); // never block longer than this
  }

  const progress = $("#progress");
  const toTop = $("#toTop");
  const mBar = $("#mBar");
  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? y / max : 0;
    progress && progress.style.setProperty("--p", p.toFixed(4));
    toTop && toTop.style.setProperty("--p", p.toFixed(4));
    toTop && toTop.classList.toggle("is-visible", y > 600);
    if (header) {
      header.classList.toggle("is-scrolled", y > 8);
      const menuOpen = document.body.classList.contains("menu-open");
      const hide = !menuOpen && y > 400 && y > lastY + 2;
      const show = y < lastY - 2 || y < 400;
      if (hide) { header.classList.add("is-hidden"); document.body.classList.add("header-hidden"); }
      else if (show) { header.classList.remove("is-hidden"); document.body.classList.remove("header-hidden"); }
    }
    lastY = y;
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  toTop && toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  /* ======================================================
     5. Toasts
     ====================================================== */
  function toast(msg, action) {
    const box = $("#toasts");
    if (!box) return;
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `${I.checkCircle}<span>${esc(msg)}</span>${action ? `<button type="button">${esc(action.label)}</button>` : ""}`;
    if (action) $("button", t).addEventListener("click", () => { action.run(); dismiss(); });
    box.appendChild(t);
    while (box.children.length > 3) box.firstElementChild.remove();
    let gone = false;
    function dismiss() { if (gone) return; gone = true; t.classList.add("is-leaving"); setTimeout(() => t.remove(), 350); }
    setTimeout(dismiss, 3200);
  }
  BGS.toast = toast;

  /* ======================================================
     6. Enquiry list (persisted in localStorage)
     ====================================================== */
  let enquiry = store.get("bgs-enquiry", []).filter((x) => byId(x.id));
  const saveEnquiry = () => { store.set("bgs-enquiry", enquiry); syncEnquiryUI(); };
  const inEnquiry = (id) => enquiry.some((x) => x.id === id);

  function addToEnquiry(id, qty = 1, pack) {
    const p = byId(id);
    if (!p) return;
    const ex = enquiry.find((x) => x.id === id);
    if (ex) ex.qty = clamp(ex.qty + qty, 1, 9999);
    else enquiry.push({ id, qty: clamp(qty, 1, 9999), pack: pack || p.packaging[0] });
    saveEnquiry();
    $$("[data-enquiry-count]").forEach((b) => { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); });
    toast(`${p.name} added to enquiry`, { label: "View list", run: openDrawer });
  }
  BGS.addToEnquiry = addToEnquiry;

  function enquiryText() {
    if (!enquiry.length) return "";
    return enquiry.map((x, i) => `${i + 1}. ${byId(x.id).name} — ${x.qty} × ${x.pack}`).join("\n");
  }

  function syncEnquiryUI() {
    const n = enquiry.length;
    $$("[data-enquiry-count]").forEach((b) => { b.textContent = n; b.classList.toggle("has-items", n > 0); });
    $$("[data-add]").forEach((b) => {
      const added = inEnquiry(b.dataset.add);
      b.classList.toggle("is-added", added);
      const label = $(".add-label", b);
      if (label) label.textContent = added ? "Added" : b.dataset.labelDefault || "Enquire";
    });
    renderDrawer();
    renderFormItems();
  }

  /* Drawer */
  const drawer = document.createElement("div");
  drawer.className = "drawer";
  drawer.setAttribute("aria-hidden", "true");
  drawer.innerHTML = `
    <div class="drawer__scrim" data-drawer-close></div>
    <aside class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="drawerTitle">
      <div class="drawer__head"><h2 id="drawerTitle">Your enquiry list</h2><button class="modal__close" type="button" data-drawer-close aria-label="Close">${I.close}</button></div>
      <div class="drawer__body" id="drawerBody"></div>
      <div class="drawer__foot" id="drawerFoot"></div>
    </aside>`;
  document.body.appendChild(drawer);
  let drawerReturn = null;

  function openDrawer() {
    drawerReturn = document.activeElement;
    renderDrawer();
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => $(".modal__close", drawer).focus(), 50);
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    drawerReturn && drawerReturn.focus && drawerReturn.focus();
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-drawer]")) { e.preventDefault(); setMenu(false); openDrawer(); }
    else if (e.target.closest("[data-drawer-close]")) closeDrawer();
  });

  function renderDrawer() {
    const body = $("#drawerBody");
    const foot = $("#drawerFoot");
    if (!body) return;
    if (!enquiry.length) {
      body.innerHTML = `<div class="drawer__empty">${I.bag}<div><strong style="color:var(--text-strong)">Your list is empty</strong><br />Add products with the <b>Enquire</b> button to request one combined quote.</div><a class="btn btn--ghost btn--sm" href="products.html">Browse products</a></div>`;
      foot.innerHTML = "";
      return;
    }
    body.innerHTML = enquiry.map((x) => {
      const p = byId(x.id);
      return `
        <div class="e-item" data-eid="${p.id}">
          <span class="e-item__thumb ${mediaClass(p)}">${mediaHTML(p)}</span>
          <div>
            <div class="e-item__name">${esc(p.name)}</div>
            <div class="e-item__row">
              <span class="stepper"><button type="button" data-step="-1" aria-label="Decrease">−</button><input type="number" min="1" max="9999" value="${x.qty}" aria-label="Quantity" /><button type="button" data-step="1" aria-label="Increase">+</button></span>
              ${p.packaging.length > 1 ? `<select aria-label="Pack size">${p.packaging.map((k) => `<option${k === x.pack ? " selected" : ""}>${esc(k)}</option>`).join("")}</select>` : `<span class="chip">${esc(x.pack)}</span>`}
              <button class="e-item__remove" type="button" data-remove>Remove</button>
            </div>
          </div>
        </div>`;
    }).join("");
    foot.innerHTML = `
      <a class="btn btn--blue btn--block" href="${waLink(`Hello BGS Industrial Solution, please share a quote for:\n\n${enquiryText()}`)}" target="_blank" rel="noopener">${I.whatsapp} Send list on WhatsApp</a>
      <a class="btn btn--ghost btn--block" href="contact.html#enquiry">Continue to quote form ${I.arrow}</a>
      <button class="link-arrow" type="button" data-clear-enquiry style="justify-self:center;color:var(--muted);font-size:14px">Clear list</button>`;
  }
  drawer.addEventListener("click", (e) => {
    const item = e.target.closest(".e-item");
    if (e.target.closest("[data-clear-enquiry]")) { enquiry = []; saveEnquiry(); return; }
    if (!item) return;
    const entry = enquiry.find((x) => x.id === item.dataset.eid);
    const step = e.target.closest("[data-step]");
    if (step) { entry.qty = clamp(entry.qty + +step.dataset.step, 1, 9999); saveEnquiry(); }
    if (e.target.closest("[data-remove]")) {
      item.classList.add("is-removing");
      setTimeout(() => { enquiry = enquiry.filter((x) => x !== entry); saveEnquiry(); }, 300);
    }
  });
  drawer.addEventListener("change", (e) => {
    const item = e.target.closest(".e-item");
    if (!item) return;
    const entry = enquiry.find((x) => x.id === item.dataset.eid);
    if (e.target.matches("input")) entry.qty = clamp(parseInt(e.target.value, 10) || 1, 1, 9999);
    if (e.target.matches("select")) entry.pack = e.target.value;
    saveEnquiry();
  });

  /* ======================================================
     7. Product media, cards & detail dialog
     ====================================================== */
  function mediaHTML(p, { eager = false } = {}) {
    const m = p.media;
    const load = eager ? "eager" : "lazy";
    if (m.type === "img") return `<img src="${m.src}" alt="${esc(p.name)} pack" loading="${load}" decoding="async" />`;
    return `
      <div class="pack pack--${m.type}">
        <img src="${m.src}" alt="${esc(p.name)} pack" loading="${load}" decoding="async" />
        <div class="pack__label" aria-hidden="true">
          <span class="pack__brand">STICKOBOND</span>
          <span class="pack__code">${esc(m.code)}</span>
          ${m.fr ? '<span class="pack__fr">FR GRADE</span>' : ""}
        </div>
      </div>`;
  }
  const mediaClass = (p) => (p.media.type === "img" ? (p.media.light ? "is-light" : "") : "is-pack");
  const shortName = (p) => p.name.replace(/^Sticko(Strong|Bond)\s/, "");

  function cardHTML(p, i = 0) {
    const cat = catOf(p.category);
    const chips = [`<span class="chip">${I.box}${esc(p.packaging.join(" · "))}</span>`];
    if (p.method) chips.push(`<span class="chip">${p.method.includes("Spray") ? I.spray : I.brush}${esc(p.method.join(" + "))}</span>`);
    return `
      <article class="p-card reveal spot" data-tilt style="--accent:${p.accent};--d:${(i % 4) * 0.07}s">
        <div class="p-card__media ${mediaClass(p)}">
          <span class="p-card__tag">${esc(cat.short)}</span>
          ${p.media.fr ? '<span class="p-card__fr">FR GRADE</span>' : ""}
          <div class="p-card__actions">
            <button class="p-card__act" type="button" data-compare="${p.id}" aria-pressed="${compare.includes(p.id)}" aria-label="Compare ${esc(p.name)}" title="Compare">${I.compare}</button>
            <button class="p-card__act" type="button" data-share="${p.id}" aria-label="Share ${esc(p.name)}" title="Share">${I.share}</button>
          </div>
          ${mediaHTML(p)}
        </div>
        <div class="p-card__body">
          <span class="p-card__line">${esc(p.line)}</span>
          <h3><a class="p-card__link" href="products.html#${p.id}" data-product="${p.id}">${esc(shortName(p))}</a></h3>
          <p class="p-card__desc">${esc(p.tagline)}</p>
          <div class="p-card__meta">${chips.join("")}</div>
        </div>
        <div class="p-card__cta">
          <span>View details ${I.arrow}</span>
          <button class="add-btn${inEnquiry(p.id) ? " is-added" : ""}" type="button" data-add="${p.id}" aria-label="Add ${esc(p.name)} to enquiry">${I.plus}<span class="add-label">${inEnquiry(p.id) ? "Added" : "Enquire"}</span></button>
        </div>
      </article>`;
  }
  BGS.cardHTML = cardHTML;

  /* Dialog */
  let dialog;
  let currentId = null;
  function ensureDialog() {
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.className = "modal p-dialog";
    dialog.setAttribute("aria-labelledby", "pdTitle");
    document.body.appendChild(dialog);
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => {
      currentId = null;
      if (location.hash && byId(location.hash.slice(1))) history.replaceState(null, "", location.pathname + location.search);
    });
    dialog.addEventListener("keydown", (e) => {
      if (e.target.matches("input, select, textarea")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); stepProduct(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); stepProduct(-1); }
    });
    return dialog;
  }
  function stepProduct(dir) {
    const list = BGS.products;
    const i = list.findIndex((p) => p.id === currentId);
    openProduct(list[(i + dir + list.length) % list.length].id);
  }

  function openProduct(id, { push = true } = {}) {
    const p = byId(id);
    if (!p) return;
    const d = ensureDialog();
    const cat = catOf(p.category);
    const idx = BGS.products.indexOf(p);
    currentId = p.id;
    d.style.setProperty("--accent", p.accent);
    d.innerHTML = `
      <button class="modal__close" type="button" aria-label="Close" data-close>${I.close}</button>
      <div class="p-dialog__inner">
        <div class="p-dialog__media ${mediaClass(p)}">
          ${mediaHTML(p, { eager: true })}
          <div class="p-dialog__nav">
            <button type="button" data-step-product="-1" aria-label="Previous product">${I.left}</button>
            <span class="p-dialog__counter">${idx + 1} / ${BGS.products.length}</span>
            <button type="button" data-step-product="1" aria-label="Next product">${I.right}</button>
          </div>
        </div>
        <div class="p-dialog__body">
          <div>
            <span class="eyebrow">${esc(cat.name)}</span>
            <h2 id="pdTitle" style="margin-top:14px">${esc(p.name)}</h2>
            <p class="p-dialog__tagline">${esc(p.tagline)}</p>
          </div>
          <ul class="highlights">${p.highlights.map((h) => `<li>${I.checkCircle}${esc(h)}</li>`).join("")}</ul>
          <p>${esc(p.description)}</p>
          <div class="spec">
            <span class="spec__label">Application areas</span>
            <div class="spec__chips">${p.applications.map((a) => `<span class="chip">${esc(a)}</span>`).join("")}</div>
          </div>
          <div class="spec__grid">
            <div class="spec__box"><span class="spec__label">Packaging</span><strong>${esc(p.packaging.join(" · "))}</strong></div>
            ${p.method ? `<div class="spec__box"><span class="spec__label">Application</span><strong>${esc(p.method.join(" + "))}</strong></div>` : ""}
            <div class="spec__box" style="grid-column:1/-1"><span class="spec__label">Shelf life</span><p>${esc(p.shelfLife)}</p></div>
          </div>
          <div class="p-dialog__actions">
            <button class="btn btn--blue" type="button" data-add="${p.id}" data-label-default="Add to enquiry">${I.plus}<span class="add-label">${inEnquiry(p.id) ? "Added" : "Add to enquiry"}</span></button>
            <a class="btn btn--ghost" href="${waLink(`Hello BGS Industrial Solution, I'm interested in ${p.name}. Please share pricing and availability.`)}" target="_blank" rel="noopener">${I.whatsapp} WhatsApp</a>
            <button class="icon-btn" type="button" data-compare="${p.id}" aria-pressed="${compare.includes(p.id)}" aria-label="Compare" title="Compare">${I.compare}</button>
            <button class="icon-btn" type="button" data-share="${p.id}" aria-label="Share" title="Share">${I.share}</button>
          </div>
        </div>
      </div>`;
    if (!d.open) d.showModal();
    $(".p-dialog__inner", d).scrollTop = 0;
    if (push) history.replaceState(null, "", "#" + p.id);
  }
  BGS.openProduct = openProduct;

  async function shareProduct(id) {
    const p = byId(id);
    const url = absUrl(`products.html#${id}`);
    if (navigator.share) {
      try { await navigator.share({ title: p.name, text: p.tagline, url }); } catch (e) { /* cancelled */ }
      return;
    }
    copyText(url, "Product link copied");
  }
  function copyText(text, msg) {
    const done = () => toast(msg);
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => prompt("Copy:", text));
    else { prompt("Copy:", text); }
  }

  /* Global click delegation for product actions */
  document.addEventListener("click", (e) => {
    const t = e.target;
    const add = t.closest("[data-add]");
    if (add) {
      e.preventDefault();
      if (inEnquiry(add.dataset.add)) openDrawer(); else addToEnquiry(add.dataset.add);
      return;
    }
    const cmp = t.closest("[data-compare]");
    if (cmp) { e.preventDefault(); toggleCompare(cmp.dataset.compare); return; }
    const sh = t.closest("[data-share]");
    if (sh) { e.preventDefault(); shareProduct(sh.dataset.share); return; }
    const stepB = t.closest("[data-step-product]");
    if (stepB) { stepProduct(+stepB.dataset.stepProduct); return; }
    if (t.closest("[data-close]")) { const dlg = t.closest("dialog"); dlg && dlg.close(); return; }
    const card = t.closest("[data-product]");
    if (card) { e.preventDefault(); openProduct(card.dataset.product); }
  });

  /* ======================================================
     8. Compare (up to 3, per session)
     ====================================================== */
  let compare = store.get("bgs-compare", [], sessionStorage).filter(byId);
  const tray = document.createElement("div");
  tray.className = "compare-tray";
  tray.setAttribute("aria-live", "polite");
  document.body.appendChild(tray);

  function toggleCompare(id) {
    if (compare.includes(id)) compare = compare.filter((x) => x !== id);
    else {
      if (compare.length >= 3) { toast("You can compare up to 3 products"); return; }
      compare.push(id);
    }
    store.set("bgs-compare", compare, sessionStorage);
    syncCompare();
  }
  function syncCompare() {
    $$("[data-compare]").forEach((b) => b.setAttribute("aria-pressed", String(compare.includes(b.dataset.compare))));
    tray.classList.toggle("is-visible", compare.length > 0);
    tray.innerHTML = `
      <div class="compare-tray__items">${compare.map((id) => { const p = byId(id); return `<span title="${esc(p.name)}">${p.media.type === "img" ? `<img src="${p.media.src}" alt="" />` : `<img src="${p.media.src}" alt="" style="object-fit:contain" />`}</span>`; }).join("")}</div>
      <span class="compare-tray__text">${compare.length} of 3 selected</span>
      <button class="btn btn--blue btn--sm" type="button" data-open-compare ${compare.length < 2 ? "disabled style=opacity:.6" : ""}>${compare.length < 2 ? "Pick 1 more" : "Compare now"}</button>
      <button class="compare-tray__clear" type="button" data-clear-compare>Clear</button>`;
  }
  tray.addEventListener("click", (e) => {
    if (e.target.closest("[data-clear-compare]")) { compare = []; store.set("bgs-compare", compare, sessionStorage); syncCompare(); }
    if (e.target.closest("[data-open-compare]") && compare.length >= 2) openCompare();
  });

  let cDialog;
  function openCompare() {
    if (!cDialog) {
      cDialog = document.createElement("dialog");
      cDialog.className = "modal c-dialog";
      cDialog.setAttribute("aria-labelledby", "cmpTitle");
      cDialog.addEventListener("click", (e) => { if (e.target === cDialog) cDialog.close(); });
      document.body.appendChild(cDialog);
    }
    if (dialog && dialog.open) dialog.close();
    const ps = compare.map(byId);
    const tags = BGS.finder.filter((f) => ps.some((p) => p.tags.includes(f.id)));
    const row = (label, fn) => `<tr><th scope="row">${label}</th>${ps.map((p) => `<td>${fn(p)}</td>`).join("")}</tr>`;
    cDialog.innerHTML = `
      <button class="modal__close" type="button" aria-label="Close" data-close>${I.close}</button>
      <div class="c-dialog__inner">
        <span class="eyebrow">Side-by-side</span>
        <h2 class="h-2" id="cmpTitle" style="margin-top:12px">Compare products</h2>
        <div style="overflow-x:auto">
          <table class="c-table">
            <thead><tr><th></th>${ps.map((p) => `<th scope="col"><div class="c-head"><span class="thumb ${mediaClass(p)}">${mediaHTML(p)}</span><strong>${esc(p.name)}</strong><button class="add-btn${inEnquiry(p.id) ? " is-added" : ""}" type="button" data-add="${p.id}" style="justify-self:start">${I.plus}<span class="add-label">${inEnquiry(p.id) ? "Added" : "Enquire"}</span></button></div></th>`).join("")}</tr></thead>
            <tbody>
              ${row("Category", (p) => esc(catOf(p.category).name))}
              ${row("In short", (p) => esc(p.tagline))}
              ${row("Highlights", (p) => p.highlights.map(esc).join("<br />"))}
              ${row("Application areas", (p) => p.applications.map(esc).join(", "))}
              ${row("Method", (p) => (p.method ? esc(p.method.join(" + ")) : "—"))}
              ${row("Packaging", (p) => esc(p.packaging.join(" · ")))}
              ${row("Shelf life", (p) => esc(p.shelfLife.split(".")[0]))}
              ${tags.map((t) => row(esc(t.label), (p) => (p.tags.includes(t.id) ? '<span class="c-yes">✓ Suitable</span>' : '<span class="c-no">—</span>'))).join("")}
            </tbody>
          </table>
        </div>
      </div>`;
    cDialog.showModal();
  }

  /* ======================================================
     9. Command palette (Ctrl/⌘ + K or "/")
     ====================================================== */
  const pages = [
    { t: "Home", s: "Start page", href: "index.html", icon: I.home },
    { t: "All products", s: "Browse the full Stickova range", href: "products.html", icon: I.grid },
    { t: "Tile Adhesives & Grout", s: "StickoStrong range", href: "products.html#tile", icon: I.grid },
    { t: "Synthetic Rubber Adhesives", s: "StickoBond SR / SP range", href: "products.html#rubber", icon: I.grid },
    { t: "White / Wood Adhesives", s: "StickoBond Ezee, Super, Super Plus", href: "products.html#wood", icon: I.grid },
    { t: "Product finder", s: "Find the right adhesive for your job", href: "index.html#tools", icon: I.target },
    { t: "Adhesive calculator", s: "Estimate bags for your tiling area", href: "index.html#calculator", icon: I.calc },
    { t: "About us", s: "Company, leadership, how we work", href: "about.html", icon: I.info },
    { t: "Partner with us", s: "Dealers, distributors, contractors", href: "partner.html", icon: I.users },
    { t: "Contact & quote", s: "Phone, WhatsApp, email, offices", href: "contact.html", icon: I.phone },
    { t: "FAQs", s: "Common questions answered", href: "index.html#faq", icon: I.info },
  ];
  const actions = [
    { t: "Toggle dark mode", s: "Switch light / dark theme", run: toggleTheme, icon: I.moon },
    { t: "Open enquiry list", s: "Review products you've added", run: openDrawer, icon: I.bag },
    { t: "Call +91-8054004498", s: "Talk to our team", href: C.phoneHref, icon: I.phone },
    { t: "Chat on WhatsApp", s: "Quick answers", href: waLink("Hello BGS Industrial Solution!"), ext: true, icon: I.whatsapp },
    { t: "Email us", s: C.email, href: `mailto:${C.email}`, icon: I.mail },
    { t: "Download catalog (PDF)", s: "Full Stickova catalog", href: "STICKOVA%20CATALOG.pdf", icon: I.file },
  ];

  const palette = document.createElement("dialog");
  palette.className = "modal palette";
  palette.setAttribute("aria-label", "Search");
  palette.innerHTML = `
    <div class="palette__search">${I.search}<input type="text" placeholder="Search products, pages, actions…" aria-label="Search" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="paletteList" /><span class="kbd">Esc</span></div>
    <div class="palette__list" id="paletteList" role="listbox"></div>
    <div class="palette__foot"><span><span class="kbd">↑</span><span class="kbd">↓</span> navigate</span><span><span class="kbd">Enter</span> open</span><span><span class="kbd">Esc</span> close</span></div>`;
  document.body.appendChild(palette);
  const pInput = $("input", palette);
  const pList = $(".palette__list", palette);
  let pItems = [];
  let pActive = 0;
  palette.addEventListener("click", (e) => { if (e.target === palette) palette.close(); });

  function renderPalette() {
    const q = pInput.value.trim().toLowerCase();
    const tokens = q.split(/\s+/).filter(Boolean);
    const hit = (hay) => tokens.every((t) => hay.toLowerCase().includes(t));
    const prods = BGS.products.filter((p) => !q || hit([p.name, p.tagline, catOf(p.category).name, ...p.applications, ...p.tags].join(" ")))
      .map((p) => ({ t: p.name, s: p.tagline, product: p.id, thumb: p }));
    const pg = pages.filter((x) => !q || hit(x.t + " " + x.s));
    const ac = actions.filter((x) => !q || hit(x.t + " " + x.s));
    const groups = [["Products", q ? prods : prods.slice(0, 5)], ["Pages", pg], ["Actions", ac]].filter((g) => g[1].length);
    pItems = groups.flatMap((g) => g[1]);
    pActive = clamp(pActive, 0, Math.max(0, pItems.length - 1));
    let n = 0;
    pList.innerHTML = pItems.length ? groups.map(([g, list]) => `<div class="palette__group">${g}</div>` + list.map((x) => {
      const i = n++;
      const icon = x.thumb ? `<span class="pi ${mediaClass(x.thumb)}">${x.thumb.media.type === "img" ? `<img src="${x.thumb.media.src}" alt="" />` : `<img src="${x.thumb.media.src}" alt="" style="object-fit:contain" />`}</span>` : `<span class="pi">${x.icon}</span>`;
      return `<button type="button" class="palette__item${i === pActive ? " is-active" : ""}" role="option" aria-selected="${i === pActive}" data-pi="${i}">${icon}<span class="pt"><strong>${esc(x.t)}</strong><span>${esc(x.s)}</span></span><span class="go">${I.arrow}</span></button>`;
    }).join("")).join("") : `<div class="palette__empty">No results for “${esc(q)}”.<br /><a class="text-blue" href="contact.html#enquiry">Ask our team instead →</a></div>`;
  }
  function runPalette(i) {
    const x = pItems[i];
    if (!x) return;
    palette.close();
    if (x.product) openProduct(x.product);
    else if (x.run) x.run();
    else if (x.ext) window.open(x.href, "_blank", "noopener");
    else location.href = x.href;
  }
  function openPalette() {
    setMenu(false);
    pInput.value = "";
    pActive = 0;
    renderPalette();
    if (!palette.open) palette.showModal();
    pInput.focus();
  }
  pInput.addEventListener("input", () => { pActive = 0; renderPalette(); });
  pInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      pActive = (pActive + (e.key === "ArrowDown" ? 1 : -1) + pItems.length) % Math.max(1, pItems.length);
      renderPalette();
      const a = $(".is-active", pList);
      a && a.scrollIntoView({ block: "nearest" });
    }
    if (e.key === "Enter") { e.preventDefault(); runPalette(pActive); }
  });
  pList.addEventListener("click", (e) => { const b = e.target.closest("[data-pi]"); if (b) runPalette(+b.dataset.pi); });
  pList.addEventListener("mousemove", (e) => {
    const b = e.target.closest("[data-pi]");
    if (b && +b.dataset.pi !== pActive) { pActive = +b.dataset.pi; $$(".palette__item", pList).forEach((el, i) => { el.classList.toggle("is-active", i === pActive); el.setAttribute("aria-selected", String(i === pActive)); }); }
  });
  document.addEventListener("click", (e) => { if (e.target.closest("[data-palette]")) openPalette(); });
  document.addEventListener("keydown", (e) => {
    const typing = e.target.matches && e.target.matches("input, textarea, select, [contenteditable]");
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); palette.open ? palette.close() : openPalette(); }
    else if (e.key === "/" && !typing && !$("dialog[open]")) { e.preventDefault(); openPalette(); }
    else if (e.key === "Escape") { if (drawer.classList.contains("is-open")) closeDrawer(); setMenu(false); }
  });

  /* ======================================================
     10. Home: featured, tools (finder + calculator), FAQ, rotator
     ====================================================== */
  const featured = $("#featuredProducts");
  if (featured) featured.innerHTML = ["ruby", "sapphire", "sp-1411-b", "super-plus"].map(byId).map(cardHTML).join("");
  $$("[data-cat-count]").forEach((el) => {
    const n = BGS.products.filter((p) => p.category === el.dataset.catCount).length;
    el.textContent = `${n} product${n > 1 ? "s" : ""}`;
  });

  /* Tools tabs */
  const tools = $("#tools");
  if (tools) {
    const tabs = $$(".tools__tab", tools);
    const ind = $(".tools__ind", tools);
    const select = (id, focus) => {
      tabs.forEach((t) => {
        const on = t.dataset.tab === id;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        $("#" + t.getAttribute("aria-controls")).hidden = !on;
        if (on) { ind.style.width = t.offsetWidth + "px"; ind.style.transform = `translateX(${t.offsetLeft}px)`; if (focus) t.focus(); }
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t.dataset.tab));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") select(tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length].dataset.tab, true);
      });
    });
    const fromHash = () => { if (location.hash === "#calculator") { select("calc"); tools.scrollIntoView({ behavior: "smooth" }); } };
    select(location.hash === "#calculator" ? "calc" : "finder");
    document.fonts && document.fonts.ready.then(() => select($('.tools__tab[aria-selected="true"]', tools).dataset.tab));
    window.addEventListener("hashchange", fromHash);
    if (location.hash === "#calculator") setTimeout(fromHash, 300);
    window.addEventListener("resize", () => select($('.tools__tab[aria-selected="true"]', tools).dataset.tab));
  }

  /* Finder */
  const finder = $("#finder");
  if (finder) {
    const optsEl = $("#finderOptions", finder);
    const resEl = $("#finderResults", finder);
    const selected = new Set();
    optsEl.innerHTML = BGS.finder.map((o) => `<button type="button" class="opt" aria-pressed="false" data-tag="${o.id}">${esc(o.label)}</button>`).join("");
    const labelOf = (t) => (BGS.finder.find((o) => o.id === t) || {}).label || t;
    function renderFinder() {
      if (!selected.size) {
        resEl.innerHTML = `<div class="finder__empty">${I.spark}<div><strong style="color:var(--text-strong)">Pick what you're working on</strong><br />We'll match the right Stickova product instantly.</div></div>`;
        return;
      }
      const tags = [...selected];
      const scored = BGS.products
        .map((p) => ({ p, hits: tags.filter((t) => p.tags.includes(t)) }))
        .filter((x) => x.hits.length)
        .sort((a, b) => b.hits.length - a.hits.length || (b.p.featured ? 1 : 0) - (a.p.featured ? 1 : 0));
      if (!scored.length) {
        resEl.innerHTML = `<div class="finder__empty">${I.search}<div><strong style="color:var(--text-strong)">No single product covers that combination</strong><br />Try fewer options, or <a class="text-blue" href="contact.html#enquiry">ask our technical team</a>.</div></div>`;
        return;
      }
      resEl.innerHTML = scored.slice(0, 4).map(({ p, hits }, i) => `
        <button type="button" class="match${i === 0 && hits.length === tags.length ? " match--best" : ""}" data-product="${p.id}" style="animation-delay:${i * 0.07}s">
          <span class="match__thumb ${mediaClass(p)}">${mediaHTML(p)}</span>
          <span><span class="match__name">${esc(p.name)}</span><span class="match__why">Suits: ${esc(hits.map(labelOf).join(", "))}</span></span>
          <span class="match__score">${hits.length === tags.length ? (i === 0 ? "Best match" : "Full match") : `${hits.length}/${tags.length} match`}</span>
        </button>`).join("");
    }
    optsEl.addEventListener("click", (e) => {
      const b = e.target.closest(".opt");
      if (!b) return;
      const t = b.dataset.tag;
      selected.has(t) ? selected.delete(t) : selected.add(t);
      b.setAttribute("aria-pressed", String(selected.has(t)));
      renderFinder();
    });
    const reset = $("#finderReset", finder);
    reset && reset.addEventListener("click", () => { selected.clear(); $$(".opt", optsEl).forEach((b) => b.setAttribute("aria-pressed", "false")); renderFinder(); });
    renderFinder();
  }

  /* Calculator */
  const calc = $("#calc");
  if (calc) {
    const cfg = BGS.calculator;
    const state = { area: 50, unit: "m2", trowel: "8", wastage: 10, product: "ruby" };
    const areaIn = $("#calcArea", calc);
    const areaRange = $("#calcRange", calc);
    const trowelSel = $("#calcTrowel", calc);
    const prodSel = $("#calcProduct", calc);
    trowelSel.innerHTML = cfg.trowels.map((t) => `<option value="${t.id}" title="${esc(t.hint)}"${t.id === state.trowel ? " selected" : ""}>${esc(t.label)}</option>`).join("");
    const hintEl = $("#calcTrowelHint", calc);
    const showHint = () => { if (hintEl) hintEl.textContent = cfg.trowels.find((t) => t.id === state.trowel).hint; };
    showHint();
    trowelSel.addEventListener("change", showHint);
    prodSel.innerHTML = BGS.products.filter((p) => p.category === "tile" && p.id !== "tile-grout").map((p) => `<option value="${p.id}"${p.id === state.product ? " selected" : ""}>${esc(p.name)}</option>`).join("");
    $("#calcWastage", calc).innerHTML = cfg.wastage.map((w) => `<button type="button" data-w="${w}" aria-pressed="${w === state.wastage}">${w}%</button>`).join("");

    let shownBags = 0;
    function compute() {
      const m2 = state.unit === "m2" ? state.area : state.area * 0.092903;
      const t = cfg.trowels.find((x) => x.id === state.trowel);
      const kg = m2 * t.kgPerM2 * (1 + state.wastage / 100);
      const bags = m2 > 0 ? Math.ceil(kg / cfg.bagKg) : 0;
      return { m2, t, kg, bags };
    }
    function animateNumber(el, from, to) {
      if (reduceMotion || from === to) { el.textContent = to; return; }
      const t0 = performance.now();
      const tick = (now) => { const k = Math.min(1, (now - t0) / 500); el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }
    function renderCalc() {
      const r = compute();
      animateNumber($("#calcBags", calc), shownBags, r.bags);
      shownBags = r.bags;
      $("#calcKg", calc).textContent = `${Math.round(r.kg).toLocaleString("en-IN")} kg`;
      $("#calcM2", calc).textContent = `${r.m2.toFixed(1)} m²`;
      $("#calcRate", calc).textContent = `≈ ${r.t.kgPerM2} kg/m²`;
      $("#calcProdName", calc).textContent = byId(state.product).name;
      const shown = Math.min(r.bags, 40);
      $("#calcBagIcons", calc).innerHTML = Array.from({ length: shown }, (_, i) => `<i style="animation-delay:${i * 0.015}s"></i>`).join("") + (r.bags > 40 ? `<i class="more">+${r.bags - 40}</i>` : "");
      const addBtn = $("#calcAdd", calc);
      addBtn.disabled = r.bags === 0;
      $(".lbl", addBtn).textContent = r.bags ? `Add ${r.bags} bag${r.bags > 1 ? "s" : ""} to enquiry` : "Enter an area";
    }
    const setArea = (v, src) => {
      state.area = clamp(+v || 0, 0, 100000);
      if (src !== "input") areaIn.value = state.area;
      if (src !== "range") areaRange.value = Math.min(state.area, +areaRange.max);
      renderCalc();
    };
    areaIn.addEventListener("input", () => setArea(areaIn.value, "input"));
    areaRange.addEventListener("input", () => setArea(areaRange.value, "range"));
    trowelSel.addEventListener("change", () => { state.trowel = trowelSel.value; renderCalc(); });
    prodSel.addEventListener("change", () => { state.product = prodSel.value; renderCalc(); });
    calc.addEventListener("click", (e) => {
      const u = e.target.closest("[data-unit]");
      if (u && u.dataset.unit !== state.unit) {
        const toFt = u.dataset.unit === "ft2";
        state.unit = u.dataset.unit;
        $$("[data-unit]", calc).forEach((b) => b.setAttribute("aria-pressed", String(b === u)));
        areaRange.max = toFt ? 5000 : 500;
        setArea(Math.round(toFt ? state.area / 0.092903 : state.area * 0.092903));
        $("#calcUnitLbl", calc).textContent = toFt ? "sq ft" : "m²";
      }
      const w = e.target.closest("[data-w]");
      if (w) { state.wastage = +w.dataset.w; $$("[data-w]", calc).forEach((b) => b.setAttribute("aria-pressed", String(b === w))); renderCalc(); }
    });
    $("#calcAdd", calc).addEventListener("click", () => {
      const r = compute();
      if (!r.bags) return;
      const ex = enquiry.find((x) => x.id === state.product);
      if (ex) { ex.qty = r.bags; saveEnquiry(); toast(`Updated to ${r.bags} bags of ${byId(state.product).name}`, { label: "View list", run: openDrawer }); }
      else addToEnquiry(state.product, r.bags);
    });
    setArea(state.area);
  }

  /* FAQ */
  const faq = $("#faqList");
  if (faq && BGS.faq) {
    faq.innerHTML = BGS.faq.map((f, i) => `
      <div class="faq__item reveal" style="--d:${(i % 4) * 0.05}s">
        <button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">${esc(f.q)}<span class="faq__icon" aria-hidden="true"></span></button>
        <div class="faq__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><div><p>${f.a}</p></div></div>
      </div>`).join("");
    faq.addEventListener("click", (e) => {
      const q = e.target.closest(".faq__q");
      if (!q) return;
      const item = q.parentElement;
      const open = !item.classList.contains("is-open");
      $$(".faq__item.is-open", faq).forEach((x) => { x.classList.remove("is-open"); $(".faq__q", x).setAttribute("aria-expanded", "false"); });
      if (open) { item.classList.add("is-open"); q.setAttribute("aria-expanded", "true"); }
    });
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: BGS.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") } })),
    });
    document.head.appendChild(ld);
  }

  /* Word rotator */
  $$("[data-rotate]").forEach((el) => {
    const words = el.dataset.rotate.split("|");
    el.innerHTML = words.map((w, i) => `<span class="${i === 0 ? "is-active" : ""}">${esc(w)}</span>`).join("");
    if (reduceMotion || words.length < 2) return;
    const spans = $$("span", el);
    const fit = (s) => { el.style.width = s.offsetWidth + 28 + "px"; };
    let i = 0;
    requestAnimationFrame(() => fit(spans[0]));
    setInterval(() => {
      const cur = spans[i];
      i = (i + 1) % spans.length;
      const next = spans[i];
      cur.classList.remove("is-active");
      cur.classList.add("is-leaving");
      next.classList.remove("is-leaving");
      next.classList.add("is-active");
      fit(next);
      setTimeout(() => cur.classList.remove("is-leaving"), 600);
    }, 2200);
  });

  /* ======================================================
     11. Products page
     ====================================================== */
  const catalog = $("#catalog");
  if (catalog) {
    const tabsEl = $("#catTabs");
    const searchEl = $("#productSearch");
    let active = "all";
    const tabs = [{ id: "all", short: "All products" }, ...BGS.categories];
    tabsEl.innerHTML = tabs.map((c) => {
      const n = c.id === "all" ? BGS.products.length : BGS.products.filter((p) => p.category === c.id).length;
      return `<button type="button" role="tab" class="tab" data-cat="${c.id}" aria-selected="false">${esc(c.short)} <span class="count">${n}</span></button>`;
    }).join("");

    function render() {
      const q = searchEl.value.trim().toLowerCase();
      const tokens = q.split(/\s+/).filter(Boolean);
      const match = (p) => { const hay = [p.name, p.tagline, p.description, ...p.applications, ...p.tags].join(" ").toLowerCase(); return tokens.every((t) => hay.includes(t)); };
      const cats = BGS.categories.filter((c) => active === "all" || c.id === active);
      let html = "";
      let total = 0;
      cats.forEach((c) => {
        const list = BGS.products.filter((p) => p.category === c.id && match(p));
        if (!list.length) return;
        total += list.length;
        html += `
          <section class="cat-block" id="cat-${c.id}" aria-labelledby="h-${c.id}">
            <div class="cat-block__head reveal">
              <div><h2 class="h-2" id="h-${c.id}">${esc(c.name)}</h2><p>${esc(c.blurb)}</p></div>
              <span class="muted">${list.length} product${list.length > 1 ? "s" : ""}</span>
            </div>
            <div class="grid-products">${list.map(cardHTML).join("")}</div>
          </section>`;
      });
      catalog.innerHTML = total ? html : `<div class="no-results"><h3>No products found</h3><p>Try a different search, or <a class="text-blue" href="contact.html#enquiry">ask our team</a> — we'll help you choose.</p></div>`;
      $$(".tab", tabsEl).forEach((t) => t.setAttribute("aria-selected", String(t.dataset.cat === active)));
      initReveal(catalog);
    }
    tabsEl.addEventListener("click", (e) => {
      const t = e.target.closest(".tab");
      if (!t) return;
      active = t.dataset.cat;
      history.replaceState(null, "", active === "all" ? location.pathname : "#" + active);
      render();
    });
    let debounce;
    searchEl.addEventListener("input", () => { clearTimeout(debounce); debounce = setTimeout(render, 120); });

    const h = location.hash.slice(1);
    if (BGS.categories.some((c) => c.id === h)) active = h;
    render();
    if (byId(h)) openProduct(h, { push: false });
    window.addEventListener("hashchange", () => {
      const x = location.hash.slice(1);
      if (BGS.categories.some((c) => c.id === x)) { active = x; searchEl.value = ""; render(); catalog.scrollIntoView({ behavior: "smooth" }); }
      else if (byId(x)) openProduct(x, { push: false });
    });
  } else {
    const h = location.hash.slice(1);
    if (byId(h)) openProduct(h, { push: false });
  }

  /* ======================================================
     12. Forms
     ====================================================== */
  function renderFormItems() {
    $$("[data-form-items]").forEach((box) => {
      if (!enquiry.length) { box.hidden = true; box.innerHTML = ""; return; }
      box.hidden = false;
      box.innerHTML = `
        <div class="form-items__head"><span>${I.bag.replace("<svg", '<svg style="width:16px;height:16px;display:inline;vertical-align:-3px;margin-right:6px"')}Your enquiry list (${enquiry.length})</span><button type="button" data-drawer>Edit</button></div>
        <ul>${enquiry.map((x) => `<li><span>${esc(byId(x.id).name)}</span><b>${x.qty} × ${esc(x.pack)}</b></li>`).join("")}</ul>`;
    });
  }

  $$("form[data-enquiry]").forEach((form) => {
    const productSel = $("select[name=product]", form);
    if (productSel) {
      productSel.insertAdjacentHTML("beforeend", BGS.categories.map((c) =>
        `<optgroup label="${esc(c.name)}">${BGS.products.filter((p) => p.category === c.id).map((p) => `<option value="${esc(p.name)}" data-id="${p.id}">${esc(p.name)}</option>`).join("")}</optgroup>`).join(""));
      const pre = new URLSearchParams(location.search).get("product");
      const opt = pre && $(`option[data-id="${CSS.escape(pre)}"]`, productSel);
      if (opt) opt.selected = true;
    }

    const validate = () => {
      let ok = true;
      $$("[required]", form).forEach((el) => {
        const f = el.closest(".field");
        let valid = el.value.trim() !== "";
        if (valid && el.type === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
        if (valid && el.type === "tel") valid = el.value.replace(/\D/g, "").length >= 10;
        if (f) { f.classList.remove("has-error"); void f.offsetWidth; f.classList.toggle("has-error", !valid); }
        if (!valid && ok) { el.focus(); ok = false; }
      });
      return ok;
    };
    $$("input, select, textarea", form).forEach((el) => el.addEventListener("input", () => { const f = el.closest(".field"); f && f.classList.remove("has-error"); }));

    const compose = () => {
      const data = new FormData(form);
      const lines = [`New enquiry — ${form.dataset.enquiry}`, ""];
      for (const [k, v] of data.entries()) {
        if (!String(v).trim()) continue;
        const el = $(`[name="${k}"]`, form);
        const label = (el && el.closest(".field") && el.closest(".field").dataset.label) || k;
        lines.push(`${label}: ${v}`);
      }
      if (enquiry.length && $("[data-form-items]", form)) lines.push("", "Products requested:", enquiryText());
      return lines.join("\n");
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;
      const via = (e.submitter && e.submitter.value) || "whatsapp";
      const msg = compose();
      if (via === "email") location.href = `mailto:${C.email}?subject=${encodeURIComponent(`Website enquiry — ${form.dataset.enquiry}`)}&body=${encodeURIComponent(msg)}`;
      else window.open(waLink(msg), "_blank", "noopener");
      const ok = $(".form-success", form.parentElement);
      if (ok) { form.hidden = true; ok.classList.add("is-visible"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  });
  $$("[data-form-reset]").forEach((b) => b.addEventListener("click", () => {
    const wrap = b.closest(".form-card");
    const form = $("form", wrap);
    form.reset();
    form.hidden = false;
    $(".form-success", wrap).classList.remove("is-visible");
  }));

  /* ======================================================
     13. Contact helpers
     ====================================================== */
  const mapFrame = $("#mapFrame");
  $$("[data-map]").forEach((b) => b.addEventListener("click", () => {
    mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(b.dataset.map)}&output=embed`;
    $$("[data-map]").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
  }));
  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-copy]");
    if (c) { e.preventDefault(); e.stopPropagation(); copyText(c.dataset.copy, "Copied to clipboard"); }
  });

  /* ======================================================
     14. Motion & effects
     ====================================================== */
  /* Split headline into words */
  function splitWords(el) {
    let i = 0;
    const walk = (node, grad) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(" ")); return; }
            const outer = document.createElement("span");
            outer.className = "split-word";
            const inner = document.createElement("span");
            inner.style.setProperty("--i", i++);
            if (grad) inner.className = "text-grad";
            inner.textContent = w;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          const g = grad || n.classList.contains("text-grad");
          if (n.classList.contains("text-grad")) n.classList.remove("text-grad");
          walk(n, g);
        }
      });
    };
    walk(el, false);
    el.classList.add("is-split");
  }
  $$("[data-split]").forEach(splitWords);

  /* Reveal on scroll (observer `io` is declared at the top: the catalog renders before this point) */
  function initReveal(scope = document) {
    const els = $$(".reveal:not(.is-in), .clip-reveal:not(.is-in), .is-split:not(.is-in)", scope);
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach((e) => e.classList.add("is-in")); return; }
    io = io || new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    els.forEach((e) => io.observe(e));
  }
  /* Safety net: after scrolling stops, show anything at or above the viewport that a
     fast fling skipped past, so no content can stay invisible. */
  let settle;
  function revealPassed() {
    $$(".reveal:not(.is-in), .clip-reveal:not(.is-in), .is-split:not(.is-in)").forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight) { el.classList.add("is-in"); io && io.unobserve(el); }
    });
  }
  window.addEventListener("scroll", () => { clearTimeout(settle); settle = setTimeout(() => { if (!root.classList.contains("is-loading")) revealPassed(); }, 160); }, { passive: true });

  /* Count-up numbers */
  function initCounters() {
    const els = $$("[data-count]");
    if (!els.length || reduceMotion || !("IntersectionObserver" in window)) return; // keep the real numbers from the HTML
    const run = (el) => {
      const end = +el.dataset.count;
      if (reduceMotion) { el.textContent = end; return; }
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 1600);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { run(e.target); cio.unobserve(e.target); } }), { threshold: 0.5 });
    els.forEach((e) => { e.textContent = "0"; cio.observe(e); });
  }

  /* Scroll-linked: parallax + process timeline */
  const parallaxEls = $$("[data-parallax]");
  const processEls = $$(".process");
  let ticking = false;
  function onScrollFx() {
    ticking = false;
    const vh = innerHeight;
    parallaxEls.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const speed = +el.dataset.parallax || 0.1;
      const offset = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    processEls.forEach((pr) => {
      const r = pr.getBoundingClientRect();
      const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.25), 0, 1);
      pr.style.setProperty("--fill", p.toFixed(3));
      const steps = $$(".step", pr);
      steps.forEach((s, i) => s.classList.toggle("is-lit", p >= (i / Math.max(1, steps.length - 1)) * 0.92 + 0.02));
    });
  }
  if (!reduceMotion && (parallaxEls.length || processEls.length)) {
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScrollFx); } }, { passive: true });
    onScrollFx();
  } else processEls.forEach((pr) => { pr.style.setProperty("--fill", 1); $$(".step", pr).forEach((s) => s.classList.add("is-lit")); });

  if (finePointer && !reduceMotion) {
    /* Spotlight glow follows the pointer */
    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest && e.target.closest(".spot");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });

    /* 3D tilt on product cards */
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest && e.target.closest("[data-tilt]");
      $$("[data-tilt].is-tilting").forEach((c) => { if (c !== card) { c.classList.remove("is-tilting"); c.style.transform = ""; } });
      if (!card || !card.classList.contains("is-in")) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.classList.add("is-tilting");
      card.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-6px)`;
    }, { passive: true });
    document.addEventListener("pointerleave", () => $$("[data-tilt].is-tilting").forEach((c) => { c.classList.remove("is-tilting"); c.style.transform = ""; }));

    /* Magnetic buttons */
    $$("[data-magnetic]").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1)}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });

    /* Hero depth parallax */
    const hv = $(".hero__visual");
    if (hv) {
      const layers = $$("[data-depth]", hv);
      const photo = $(".hero__photo", hv);
      hv.closest(".hero").addEventListener("pointermove", (e) => {
        const x = e.clientX / innerWidth - 0.5;
        const y = e.clientY / innerHeight - 0.5;
        layers.forEach((l) => { const d = +l.dataset.depth; l.style.transform = `translate3d(${(x * d).toFixed(1)}px, ${(y * d).toFixed(1)}px, 0)`; });
        if (photo) photo.style.transform = `rotateY(${(x * 6).toFixed(2)}deg) rotateX(${(-y * 6).toFixed(2)}deg)`;
      });
    }
  }

  /* Marquee: duplicate content for a seamless loop */
  $$(".marquee__track").forEach((t) => {
    const n = t.children.length;
    t.innerHTML += t.innerHTML;
    Array.from(t.children).forEach((el, i) => i >= n && el.setAttribute("aria-hidden", "true"));
  });

  /* Initial sync */
  syncEnquiryUI();
  syncCompare();
  function startMotion() { initReveal(); initCounters(); }
  if (!loading) startMotion(); // otherwise the loader starts it when it fades out

  /* ======================================================
     15. PWA — offline support when served over http(s)
     ====================================================== */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
