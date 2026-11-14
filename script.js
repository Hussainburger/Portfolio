/* Hussain Rizaan portfolio: interactions */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- split hero name into letters ---------- */
  $$(".split").forEach(el => {
    const text = el.dataset.text || el.textContent;
    el.textContent = "";
    [...text].forEach((c, i) => {
      const w = document.createElement("span"); w.className = "w";
      const ch = document.createElement("span"); ch.className = "ch";
      ch.textContent = c; ch.style.transitionDelay = `${150 + i * 55}ms`;
      w.appendChild(ch); el.appendChild(w);
    });
  });
  requestAnimationFrame(() => setTimeout(() => $$(".split").forEach(el => el.classList.add("is-in")), 60));

  /* ---------- build work grid from works.js ---------- */
  const works = typeof WORKS !== "undefined" ? WORKS : [];
  const grid = $("#grid");
  const pad = n => String(n).padStart(2, "0");
  const visual = w => w.image
    ? `<img src="${esc(w.image)}" alt="${esc(w.title)}" loading="lazy">`
    : `<div class="ph" style="--c:${esc(w.color || "#00e5ff")}"><i></i></div>`;

  works.forEach((w, i) => {
    const el = document.createElement("article");
    el.className = `work work--${w.size || "md"} reveal`;
    el.tabIndex = 0;
    el.innerHTML = `
      <span class="work__index">${pad(i + 1)} / ${pad(works.length)}</span>
      <div class="work__visual">${visual(w)}</div>
      <div class="work__meta">
        <h3 class="work__title">${esc(w.title)}</h3>
        <span class="work__type">${esc(w.type)}</span>
      </div>`;
    el.addEventListener("click", () => openViewer(w));
    el.addEventListener("keydown", e => { if (e.key === "Enter") openViewer(w); });
    grid.appendChild(el);
  });
  $("#workCount").textContent = `${pad(works.length)} projects`;

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => io.observe(el));

  /* ---------- mobile menu ---------- */
  const toggle = $("#navToggle"), menu = $("#menu");
  const setMenu = open => {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.setAttribute("aria-hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("resize", () => { if (window.innerWidth > 900) setMenu(false); });

  /* ---------- Maldives clock ---------- */
  const tick = () => {
    $("#clock").textContent = new Date().toLocaleTimeString("en-GB", { timeZone: "Indian/Maldives", hour: "2-digit", minute: "2-digit" });
  };
  tick(); setInterval(tick, 15000);
  $("#year").textContent = new Date().getFullYear();

  /* ---------- work viewer ---------- */
  const viewer = $("#viewer");
  function openViewer(w) {
    $("#vMedia").innerHTML = visual(w);
    $("#vType").textContent = w.type || "";
    $("#vTitle").textContent = w.title || "";
    $("#vDesc").innerHTML = esc(w.desc) + (w.link ? `<br><a href="${esc(w.link)}" target="_blank" rel="noopener">View project ↗</a>` : "");
    viewer.classList.add("is-open"); viewer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  const closeViewer = () => { viewer.classList.remove("is-open"); viewer.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };
  $("#viewerClose").addEventListener("click", closeViewer);
  viewer.addEventListener("click", e => { if (e.target === viewer) closeViewer(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeViewer(); setMenu(false); } });
})();
