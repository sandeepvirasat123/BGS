/* =========================================================
   BGS Industrial Solution — site behaviour
   ========================================================= */
(function () {
  "use strict";

  const C = BGS.contact;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- Icons ---------------- */
  const svg = (p, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${p}</svg>`;
  const I = {
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    arrowUR: svg('<path d="M7 17 17 7M8 7h9v9"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    mail: svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
    pin: svg('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    globe: svg('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>'),
    close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    checkCircle: svg('<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>'),
    box: svg('<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>'),
    clock: svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    search: svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
    spark: svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>'),
    brush: svg('<path d="m9.1 11.9 7.4-7.4a2.1 2.1 0 0 1 3 3l-7.4 7.4"/><path d="M7 14c-1.7 0-3 1.3-3 3 0 1.3-1 2-2 2 1 1.5 2.7 2 4 2a4 4 0 0 0 4-4c0-1.7-1.3-3-3-3z"/>'),
    spray: svg('<path d="M3 3h.01M7 5h.01M11 7h.01M3 7h.01M7 9h.01M3 11h.01"/><rect x="15" y="5" width="4" height="4"/><path d="m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2"/>'),
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.2 0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 6.9 2.9 1.9 1.9 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.2.1 12 .1 5.5.1.2 5.4.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.7c1.7.9 3.7 1.4 5.6 1.4 6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.4-8.3z"/></svg>',
  };
  BGS.icons = I;

  /* ---------------- Header & footer ---------------- */
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
    <div class="topbar">
      <div class="container">
        <span class="topbar__msg">Stickova Adhesives — Tile, Rubber &amp; Wood adhesive solutions</span>
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
          <span class="brand__text"><span class="brand__name">BGS Industrial</span><span class="brand__sub">Stickova Adhesives</span></span>
        </a>
        <nav class="nav" id="siteNav" aria-label="Main">
          ${navItems.map(([id, href, label]) => `<a href="${href}"${id === page ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
          <a class="btn btn--blue nav__cta" href="contact.html#enquiry">Get a Quote</a>
        </nav>
        <div class="header-cta">
          <a class="btn btn--blue btn--sm" href="contact.html#enquiry">Get a Quote ${I.arrow}</a>
          <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="siteNav"><span></span></button>
        </div>
      </div>
    </header>`;

  const footerHTML = `
    <footer class="site-footer">
      <div class="container">
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
              <li><a href="index.html#finder">Product Finder</a></li>
              <li><a href="STICKOVA%20CATALOG.pdf" download>Download Catalog (PDF)</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="about.html#leadership">Leadership</a></li>
              <li><a href="about.html#how-we-work">How We Work</a></li>
              <li><a href="partner.html">Become a Partner</a></li>
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
    <a class="wa-fab" href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent("Hello BGS Industrial Solution, I'd like to know more about Stickova adhesives.")}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${I.whatsapp}</a>`;

  const hMount = $("#header");
  const fMount = $("#footer");
  if (hMount) hMount.outerHTML = headerHTML;
  if (fMount) fMount.outerHTML = footerHTML;

  /* Sticky header state + mobile menu */
  const header = $("#siteHeader");
  const toggle = $("#menuToggle");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) document.documentElement.style.setProperty("--nav-top", header.getBoundingClientRect().bottom + "px");
  }
  if (toggle) {
    toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    $$("#siteNav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
    window.addEventListener("resize", () => window.innerWidth > 980 && setMenu(false));
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal(root = document) {
    const els = $$(".reveal:not(.is-in)", root);
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("is-in"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((e) => io.observe(e));
  }

  /* ---------------- Count-up stats ---------------- */
  function initCounters() {
    const els = $$("[data-count]");
    if (!els.length) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = (el) => {
      const end = +el.dataset.count;
      if (reduce) return (el.textContent = end);
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 1400);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: 0.5 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------------- Product rendering ---------------- */
  const catOf = (id) => BGS.categories.find((c) => c.id === id);
  const byId = (id) => BGS.products.find((p) => p.id === id);

  function mediaHTML(p, { eager = false } = {}) {
    const m = p.media;
    const load = eager ? "eager" : "lazy";
    if (m.type === "img") return `<img src="${m.src}" alt="${esc(p.name)} pack" loading="${load}" decoding="async" />`;
    return `
      <div class="pack pack--${m.type}">
        <img src="${m.src}" alt="" loading="${load}" decoding="async" />
        <div class="pack__label" aria-hidden="true">
          <img src="assets/img/stickova-logo.png" alt="" loading="lazy" />
          <span class="pack__brand">STICKOBOND</span>
          <span class="pack__code">${esc(m.code)}</span>
          ${m.fr ? '<span class="pack__fr">FR GRADE</span>' : ""}
          <span class="pack__strip"></span>
        </div>
      </div>`;
  }
  const mediaClass = (p) => (p.media.type === "img" ? (p.media.light ? "is-light" : "") : "is-pack");

  function cardHTML(p, i = 0) {
    const cat = catOf(p.category);
    const chips = [`<span class="chip">${I.box}${esc(p.packaging.join(" · "))}</span>`];
    if (p.method) chips.push(`<span class="chip">${p.method.includes("Spray") ? I.spray : I.brush}${esc(p.method.join(" + "))}</span>`);
    return `
      <a class="p-card reveal" href="products.html#${p.id}" style="--accent:${p.accent};--d:${(i % 4) * 0.06}s" data-product="${p.id}" aria-haspopup="dialog">
        <div class="p-card__media ${mediaClass(p)}">
          <span class="p-card__tag">${esc(cat.short)}</span>
          ${p.media.fr ? '<span class="p-card__fr">FR</span>' : ""}
          ${mediaHTML(p)}
        </div>
        <div class="p-card__body">
          <span class="p-card__line">${esc(p.line)}</span>
          <h3>${esc(p.name.replace(/^Sticko(Strong|Bond)\s/, ""))}</h3>
          <p class="p-card__desc">${esc(p.tagline)}</p>
          <div class="p-card__meta">${chips.join("")}</div>
        </div>
        <span class="p-card__cta">View details ${I.arrow}</span>
      </a>`;
  }
  BGS.cardHTML = cardHTML;

  /* ---------------- Product dialog ---------------- */
  let dialog;
  function ensureDialog() {
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.className = "p-dialog";
    dialog.setAttribute("aria-labelledby", "pdTitle");
    document.body.appendChild(dialog);
    dialog.addEventListener("click", (e) => { if (e.target === dialog) closeDialog(); });
    dialog.addEventListener("close", () => {
      if (location.hash && byId(location.hash.slice(1))) history.replaceState(null, "", location.pathname + location.search);
    });
    return dialog;
  }
  function closeDialog() { dialog && dialog.open && dialog.close(); }

  function openProduct(id, { push = true } = {}) {
    const p = byId(id);
    if (!p) return;
    const d = ensureDialog();
    const cat = catOf(p.category);
    const wa = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(`Hello BGS Industrial Solution, I'm interested in ${p.name}. Please share pricing and availability.`)}`;
    d.style.setProperty("--accent", p.accent);
    d.innerHTML = `
      <button class="p-dialog__close" type="button" aria-label="Close">${I.close}</button>
      <div class="p-dialog__inner">
        <div class="p-dialog__media ${mediaClass(p)}">${mediaHTML(p, { eager: true })}</div>
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
            <a class="btn btn--blue" href="contact.html?product=${encodeURIComponent(p.id)}#enquiry">Request a quote ${I.arrow}</a>
            <a class="btn btn--ghost" href="${wa}" target="_blank" rel="noopener">${I.whatsapp} WhatsApp</a>
          </div>
        </div>
      </div>`;
    $(".p-dialog__close", d).addEventListener("click", closeDialog);
    if (!d.open) d.showModal();
    $(".p-dialog__inner", d).scrollTop = 0;
    if (push) history.replaceState(null, "", "#" + p.id);
  }
  BGS.openProduct = openProduct;

  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-product]");
    if (card) { e.preventDefault(); openProduct(card.dataset.product); }
  });

  /* ---------------- Home: featured + finder ---------------- */
  const featured = $("#featuredProducts");
  if (featured) {
    const picks = ["ruby", "sapphire", "sp-1411-b", "super-plus"].map(byId);
    featured.innerHTML = picks.map(cardHTML).join("");
  }
  $$("[data-cat-count]").forEach((el) => {
    const n = BGS.products.filter((p) => p.category === el.dataset.catCount).length;
    el.textContent = `${n} product${n > 1 ? "s" : ""}`;
  });

  const finder = $("#finder");
  if (finder) {
    const optsEl = $("#finderOptions", finder);
    const resEl = $("#finderResults", finder);
    const selected = new Set();
    optsEl.innerHTML = BGS.finder.map((o) => `<button type="button" class="opt" aria-pressed="false" data-tag="${o.id}">${esc(o.label)}</button>`).join("");

    const labelOf = (t) => (BGS.finder.find((o) => o.id === t) || {}).label || t;
    function renderFinder() {
      if (!selected.size) {
        resEl.innerHTML = `<div class="finder__empty">${I.spark}<div><strong style="color:var(--ink)">Pick what you're working on</strong><br />We'll match the right Stickova product instantly.</div></div>`;
        return;
      }
      const tags = [...selected];
      const scored = BGS.products
        .map((p) => ({ p, hits: tags.filter((t) => p.tags.includes(t)) }))
        .filter((x) => x.hits.length)
        .sort((a, b) => b.hits.length - a.hits.length || (b.p.featured ? 1 : 0) - (a.p.featured ? 1 : 0));
      if (!scored.length) {
        resEl.innerHTML = `<div class="finder__empty">${I.search}<div><strong style="color:var(--ink)">No single product covers that combination</strong><br />Try fewer options, or <a class="text-blue" href="contact.html#enquiry">ask our technical team</a>.</div></div>`;
        return;
      }
      resEl.innerHTML = scored.slice(0, 4).map(({ p, hits }, i) => `
        <button type="button" class="match${i === 0 && hits.length === tags.length ? " match--best" : ""}" data-product="${p.id}" style="animation-delay:${i * 0.06}s">
          <span class="match__thumb ${mediaClass(p)}">${mediaHTML(p)}</span>
          <span>
            <span class="match__name">${esc(p.name)}</span>
            <span class="match__why" style="display:block">Suits: ${esc(hits.map(labelOf).join(", "))}</span>
          </span>
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

  /* ---------------- Products page ---------------- */
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
      const match = (p) => !q || [p.name, p.tagline, p.description, ...p.applications, ...p.tags].join(" ").toLowerCase().includes(q);
      const cats = BGS.categories.filter((c) => active === "all" || c.id === active);
      let html = "";
      let total = 0;
      cats.forEach((c) => {
        const list = BGS.products.filter((p) => p.category === c.id && match(p));
        if (!list.length) return;
        total += list.length;
        html += `
          <section class="cat-block" id="cat-${c.id}" aria-labelledby="h-${c.id}">
            <div class="cat-block__head">
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
    searchEl.addEventListener("input", render);

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

  /* ---------------- Enquiry forms ---------------- */
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
        f && f.classList.toggle("has-error", !valid);
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
        const label = ($(`[name="${k}"]`, form).closest(".field") || {}).dataset?.label || k;
        lines.push(`${label}: ${v}`);
      }
      return lines.join("\n");
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;
      const via = (e.submitter && e.submitter.value) || "whatsapp";
      const msg = compose();
      if (via === "email") {
        location.href = `mailto:${C.email}?subject=${encodeURIComponent(`Website enquiry — ${form.dataset.enquiry}`)}&body=${encodeURIComponent(msg)}`;
      } else {
        window.open(`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
      }
      const ok = $(".form-success", form.parentElement);
      if (ok) { form.hidden = true; ok.classList.add("is-visible"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  });
  $$("[data-form-reset]").forEach((b) => b.addEventListener("click", () => {
    const wrap = b.closest(".form-card");
    const form = $("form", wrap);
    form.reset(); form.hidden = false;
    $(".form-success", wrap).classList.remove("is-visible");
  }));

  /* ---------------- Marquee (duplicate for seamless loop) ---------------- */
  $$(".marquee__track").forEach((t) => { t.innerHTML += t.innerHTML; $$(":scope > *", t).forEach((el, i, arr) => i >= arr.length / 2 && el.setAttribute("aria-hidden", "true")); });

  /* ---------------- Map tabs (contact) ---------------- */
  const mapFrame = $("#mapFrame");
  $$("[data-map]").forEach((b) => b.addEventListener("click", () => {
    mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(b.dataset.map)}&output=embed`;
    $$("[data-map]").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
  }));

  initReveal();
  initCounters();
})();
