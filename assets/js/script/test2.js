const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

document.documentElement.classList.add('js');

const ACC1 = '#81e4ff';   // فیروزه‌ای
const ACC2 = '#e5e5e5';   // نقره‌ای

document.addEventListener("DOMContentLoaded", () => {
  const container = $("#eraContainer");

  // ===== ساخت ساختار صفحه =====
  container.innerHTML = "";
  reformersData.timelineGroups.forEach(group => {
    const sec = document.createElement("section");
    sec.className = "era fade-in";
    sec.innerHTML = `
      <h2 class="era__title">${group.era}</h2>
      <p class="era__desc">${group.description}</p>
      <div class="grid"></div>
    `;
    const grid = $(".grid", sec);

    group.members.forEach(m => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card__media">
          <img class="card__img" src="${m.image}" alt="${m.name}" loading="lazy"
               onerror="this.onerror=null; this.src='../images/placeholder.png'">
        </div>
        <div class="card__body">
          <h3 class="card__title">${m.name}</h3>
          <p class="card__meta">${m.century} — ${m.field}</p>
        </div>
      `;
      card.addEventListener("click", e => {
        e.preventDefault(); e.stopPropagation();
        openModal(m);
      });
      grid.appendChild(card);
    });

    container.appendChild(sec);
  });

  // ===== انیمیشن ظاهر شدن کارت‌ها =====
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
  $$(".card").forEach(c => io.observe(c));

  // ===== عناصر مودال =====
  const modal = $("#personModal");
  const dialog = $("#modalDialog");
  const modalClose = $("#modalClose");
  const imgEl = $("#modalImage");
  const titleEl = $("#modalTitle");
  const metaEl = $("#modalMeta");
  const descEl = $("#modalDesc");
  const tlCanvas = $("#timelineCanvas");
  const infCanvas = $("#influenceCanvas");
  const mapCanvas = $("#mapCanvas");
  let resizeHandler = null;

  // ===== باز کردن مودال =====
  function openModal(m) {
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.classList.add("active");

    imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = '../images/placeholder.png'; };
    imgEl.src = m.image || '../images/placeholder.png';
    imgEl.alt = m.name;

    titleEl.textContent = m.name;
    metaEl.textContent = `${m.century} — ${m.field}`;
    descEl.textContent = m.summary;

    requestAnimationFrame(() => requestAnimationFrame(() => renderAll(m)));
    resizeHandler = () => renderAll(m);
    window.addEventListener("resize", resizeHandler);
  }

  // ===== بستن مودال =====
  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    window.removeEventListener("resize", resizeHandler);
  }
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
  });

  // ===== رندر نمودارها =====
  function renderAll(m) {
    drawTimeline(tlCanvas, m);
    drawInfluence(infCanvas, m.influence || {});
    drawMap(mapCanvas, m.regions || []);
  }

  // ===== Canvas Utility =====
  function fitCanvas(canvas, wRatio = 16, hRatio = 9) {
    const parent = canvas.parentElement;
    const w = Math.max(300, parent.clientWidth);
    const h = Math.round(w * (hRatio / wRatio));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  // ===== Timeline =====
  function drawTimeline(c, m) {
    const { ctx, w, h } = fitCanvas(c, 16, 4.5);
    ctx.clearRect(0, 0, w, h);

    const birth = m.birth ?? 0;
    const death = m.death ?? (birth + 60);
    const margin = 40, y = h / 2;

    const safeDiff = Math.max(60, death - birth);
    const minYear = birth - 20;
    const maxYear = birth + safeDiff + 20;

    const x = yr => margin + ((yr - minYear) / (maxYear - minYear)) * (w - margin * 2);

    ctx.strokeStyle = "rgba(255,255,255,.25)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(margin, y); ctx.lineTo(w - margin, y); ctx.stroke();

    const x1 = x(birth), x2 = x(death);
    const g = ctx.createLinearGradient(x1, y, x2, y);
    g.addColorStop(0, ACC1); g.addColorStop(1, ACC2);
    ctx.strokeStyle = g; ctx.lineWidth = 6; ctx.lineCap = "round";
    ctx.shadowColor = ACC1; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.shadowBlur = 0;

    ctx.fillStyle = ACC1; dot(ctx, x1, y, 6); dot(ctx, x2, y, 6);
    ctx.fillStyle = "rgba(255,255,255,.9)"; ctx.font = "12px Inter"; ctx.textAlign = "center";
    ctx.fillText(formatYear(birth), x1, y - 12);
    ctx.fillText(formatYear(death), x2, y - 12);
  }

  function formatYear(y) {
    if (y === null || y === undefined) return "Present";
    if (y < 0) return `${Math.abs(y)} BC`;
    return String(y);
  }

  // ===== Influence Bars =====
  function drawInfluence(c, inf) {
    const { ctx, w, h } = fitCanvas(c, 16, 9);
    ctx.clearRect(0, 0, w, h);
    const keys = Object.keys(inf);
    if (!keys.length) return;

    const margin = 18, labelW = 96;
    const barH = Math.min(26, (h - margin * 2) / (keys.length + 0.5));
    const gap = barH * 0.7;

    ctx.font = "12px Inter";
    ctx.textBaseline = "middle";

    keys.forEach((k, i) => {
      const v = Math.max(0, Math.min(100, inf[k]));
      const y = margin + i * (barH + gap);
      const x0 = margin + labelW;
      const maxW = w - x0 - margin - 6;

      ctx.fillStyle = "rgba(255,255,255,.07)";
      roundRect(ctx, x0, y, maxW, barH, 6); ctx.fill();

      const g = ctx.createLinearGradient(x0, y, x0 + maxW, y);
      g.addColorStop(0, ACC1); g.addColorStop(1, ACC2);
      ctx.fillStyle = g; ctx.shadowColor = ACC1; ctx.shadowBlur = 8;
      roundRect(ctx, x0, y, Math.max(4, maxW * (v / 100)), barH, 6); ctx.fill(); ctx.shadowBlur = 0;

      ctx.fillStyle = "#fff"; ctx.textAlign = "right"; ctx.fillText(k, x0 - 10, y + barH / 2);
      ctx.textAlign = "left"; ctx.fillText(v + "%", x0 + maxW * (v / 100) + 6, y + barH / 2);
    });
  }

  // ===== Map (Global Reach) =====
  function drawMap(c, regions) {
    const { ctx, w, h } = fitCanvas(c, 16, 7);
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(255,255,255,.08)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 8; i++) { const x = i * w / 9; ctx.beginPath(); ctx.moveTo(x, 10); ctx.lineTo(x, h - 10); ctx.stroke(); }
    for (let j = 1; j <= 3; j++) { const y = j * h / 4; ctx.beginPath(); ctx.moveTo(10, y); ctx.lineTo(w - 10, y); ctx.stroke(); }

    const pts = {
      Iran: [w * 0.45, h * 0.55], Europe: [w * 0.25, h * 0.35],
      USA: [w * 0.12, h * 0.40], France: [w * 0.22, h * 0.42],
      "Middle East": [w * 0.55, h * 0.60], "Asia": [w * 0.65, h * 0.55]
    };

    const origin = pts.Iran;
    glowDot(ctx, origin[0], origin[1], 7, ACC1);

    (regions || []).forEach(r => {
      if (!pts[r]) return;
      const [tx, ty] = pts[r];
      drawArc(ctx, origin[0], origin[1], tx, ty, ACC1);
      glowDot(ctx, tx, ty, 5, ACC1);
    });

    ctx.fillStyle = "#fff";
    ctx.font = "12px Inter";
    ctx.textAlign = "center";
    ctx.fillText("Iran", origin[0], origin[1] - 12);
  }

  // ===== Canvas Helpers =====
  function dot(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }
  function glowDot(ctx, x, y, r, c) { ctx.save(); ctx.fillStyle = c; ctx.shadowColor = c; ctx.shadowBlur = 10; dot(ctx, x, y, r); ctx.restore(); }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function drawArc(ctx, x1, y1, x2, y2, color) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 40;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(mx, my, x2, y2);
    ctx.stroke();
    ctx.restore();
  }
});
