/* Hussainburger portfolio: interactions */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- split titles into letters ---------- */
  $$(".split").forEach(el => {
    const text = el.dataset.text || el.textContent;
    el.textContent = "";
    [...text].forEach((c, i) => {
      const wrap = document.createElement("span");
      wrap.className = "split-wrap";
      const ch = document.createElement("span");
      ch.className = "ch";
      ch.textContent = c === " " ? " " : c;
      ch.style.transitionDelay = `${i * 45}ms`;
      wrap.appendChild(ch);
      el.appendChild(wrap);
    });
  });

  /* ---------- build work grid ---------- */
  const grid = $("#grid");
  const works = window.WORKS || (typeof WORKS !== "undefined" ? WORKS : []);
  works.forEach((w, i) => {
    const card = document.createElement("article");
    card.className = `card ${w.size || ""}`;
    card.dataset.cat = w.category;
    card.dataset.index = i;
    card.tabIndex = 0;
    const media = w.image
      ? `<img src="${w.image}" alt="${w.title}" loading="lazy">`
      : `<div class="ph" style="--c:${w.color || "#ff3b1f"}"><span class="ph__burst">${w.title.split(" ")[0].toUpperCase()}!</span></div>`;
    card.innerHTML = `
      <span class="card__num">${String(i + 1).padStart(2, "0")}</span>
      <div class="card__media">${media}</div>
      <div class="card__info">
        <div>
          <h3 class="card__title">${w.title}</h3>
          ${w.client ? `<p class="card__client">${w.client}</p>` : ""}
        </div>
        <span class="card__tag">${w.category}</span>
      </div>`;
    card.addEventListener("click", () => openLightbox(w));
    card.addEventListener("keydown", e => { if (e.key === "Enter") openLightbox(w); });
    grid.appendChild(card);
  });

  /* ---------- filters ---------- */
  $$("#filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      $$("#filters button").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      $$(".card").forEach(c => c.classList.toggle("is-hidden", f !== "all" && c.dataset.cat !== f));
    });
  });

  /* ---------- reveal on scroll ---------- */
  $$(".lead, .skill, .about__text > *, .about__portrait, .contact__title, .contact__mail, .contact__grid").forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
  $$(".split, .card, .reveal").forEach(el => io.observe(el));
  // hero name animates right away
  requestAnimationFrame(() => $$(".hero .split").forEach(el => el.classList.add("is-in")));

  /* ---------- rotating role word ---------- */
  const roles = ["graphic designer", "3D artist", "marketer", "storyteller", "brand builder"];
  const rot = $("#rotator");
  let r = 0;
  setInterval(() => {
    r = (r + 1) % roles.length;
    rot.innerHTML = `<span>${roles[r]}</span>`;
  }, 2200);

  /* ---------- nav ---------- */
  const nav = $("#nav"), toggle = $("#navToggle");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", false); document.body.style.overflow = "";
  }));

  /* ---------- Maldives clock ---------- */
  const tick = () => {
    const now = new Date();
    const t = now.toLocaleTimeString("en-GB", { timeZone: "Indian/Maldives", hour: "2-digit", minute: "2-digit" });
    const d = now.toLocaleDateString("en-GB", { timeZone: "Indian/Maldives", weekday: "short", day: "numeric", month: "short", year: "numeric" });
    $("#clockTop").textContent = t;
    $("#clockBottom").textContent = `${d} • ${t}`;
  };
  tick(); setInterval(tick, 15000);
  $("#year").textContent = new Date().getFullYear();

  /* ---------- lightbox ---------- */
  const lb = $("#lightbox");
  function openLightbox(w) {
    $("#lbMedia").innerHTML = w.image
      ? `<img src="${w.image}" alt="${w.title}">`
      : `<div class="ph" style="--c:${w.color || "#ff3b1f"}"><span class="ph__burst">${w.title.split(" ")[0].toUpperCase()}!</span></div>`;
    $("#lbCat").textContent = `${w.category}${w.client ? " — " + w.client : ""}`;
    $("#lbTitle").textContent = w.title;
    $("#lbDesc").innerHTML = (w.desc || "") + (w.link ? `<br><a href="${w.link}" target="_blank" rel="noopener">View project ↗</a>` : "");
    lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  const closeLb = () => { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };
  $("#lbClose").addEventListener("click", closeLb);
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });
})();
