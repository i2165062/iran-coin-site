const INDEX_PATH = "../assets/data/rulers.index.json";
const grid = document.getElementById("rulersGrid");

/* Modal refs */
const modal = document.getElementById("rulerModal");
const mImg   = document.getElementById("modalImage");
const mTitle = document.getElementById("modalTitle");
const mSum   = document.getElementById("modalSummary");
const mEra   = document.getElementById("metaEra");
const mCap   = document.getElementById("metaCapital");
const mFacts = document.getElementById("modalFacts");
const mMap   = document.getElementById("modalMap");
const slides = document.getElementById("slides");
const openBtn= document.getElementById("openFullPage");

let currentSlide = 0;

/* Render grid from the light-weight index */
fetch(INDEX_PATH)
  .then(r => r.json())
  .then(list => {
    list.forEach((d, i) => {
      const el = document.createElement("article");
      el.className = "card";
      el.innerHTML = `
        <img src="../images/rulers/RUL${i+1}.png" alt="${d.title}" loading="lazy">
        <div class="overlay">
          <h2>${d.title}</h2>
          <p>${d.era}</p>
        </div>`;
      el.addEventListener("click", () => openModal(d, i+1));
      grid.appendChild(el);
    });
  })
  .catch(err => grid.innerHTML = `<p style="color:#f66">${err.message}</p>`);

/* Open modal: fetch the full dynasty JSON lazily */
function openModal(dyn, indexNo) {
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  /* basic fields from index immediately */
  mImg.src   = `../images/rulers/RUL${indexNo}.png`;
  mTitle.textContent = dyn.title;
  mEra.textContent   = dyn.era || "—";
  mCap.textContent   = dyn.capital || "—";
  mSum.textContent   = dyn.summary || "";

  openBtn.href = dyn.page || "#";

  /* reset */
  mMap.src = ""; mMap.style.display = "none";
  mFacts.innerHTML = ""; slides.innerHTML = ""; currentSlide = 0;

  /* fetch full data file */
  fetch(dyn.dataPath)
    .then(r => r.json())
    .then(full => {
      /* map */
      if (full.map) { mMap.src = full.map; mMap.style.display = "block"; }

      /* facts */
      (full.facts || dyn.facts || []).forEach(f => {
        const li = document.createElement("li"); li.textContent = f; mFacts.appendChild(li);
      });

      /* rulers slider */
      (full.rulers || []).forEach(r => {
        const s = document.createElement("div");
        s.className = "slide";
        s.innerHTML = `
          <img src="../images/rulers/${r.image}" alt="${r.name}">
          <h4>${r.name}</h4>
          <p>${r.description || ""}</p>`;
        slides.appendChild(s);
      });
      updateSlider();
    })
    .catch(err => {
      const li = document.createElement("li");
      li.textContent = `Could not load rulers: ${err.message}`;
      mFacts.appendChild(li);
    });
}

function closeModal(){ modal.setAttribute("aria-hidden","true"); document.body.style.overflow = "" }
modal.addEventListener("click", e => { if (e.target.hasAttribute("data-close-modal")) closeModal() });
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.getAttribute("aria-hidden")==="false") closeModal() });

/* Slider */
function updateSlider(){ slides.style.transform = `translateX(-${currentSlide*100}%)` }
document.querySelector(".prev").addEventListener("click", () => {
  const total = slides.children.length || 1;
  currentSlide = (currentSlide - 1 + total) % total; updateSlider();
});
document.querySelector(".next").addEventListener("click", () => {
  const total = slides.children.length || 1;
  currentSlide = (currentSlide + 1) % total; updateSlider();
});
