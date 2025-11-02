/*
Rulers & Governments Page Script
---------------------------------
- Loads dynasty data from JSON
- Creates cards dynamically
- Shows cinematic modal with ruler slider
- Allows link to full HTML page per dynasty
*/

const JSON_PATH = "/assets/data/rulers.json";
const grid = document.getElementById("rulersGrid");

const modal = document.getElementById("rulerModal");
const mImg = document.getElementById("modalImage");
const mTitle = document.getElementById("modalTitle");
const mSummary = document.getElementById("modalSummary");
const mEra = document.getElementById("metaEra");
const mCapital = document.getElementById("metaCapital");
const mFacts = document.getElementById("modalFacts");
const slidesContainer = document.getElementById("slides");
const openPageBtn = document.getElementById("openFullPage");

let currentSlide = 0;

fetch(JSON_PATH)
  .then(res => res.json())
  .then(data => renderList(data))
  .catch(err => {
    grid.innerHTML = `<p style="text-align:center;color:#c55">Cannot load data: ${err.message}</p>`;
  });

function renderList(items) {
  items.forEach(item => {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <img src="../images/rulers/${item.key}-2.png" alt="${item.title}" loading="lazy">
      <div class="overlay">
        <h2>${item.title}</h2>
        <p>${item.era}</p>
      </div>
    `;
    el.addEventListener("click", () => openModal(item));
    grid.appendChild(el);
  });
}

function openModal(item) {
  mImg.src = `../images/rulers/${item.key}-1.png`;
  mImg.alt = item.title;
  mTitle.textContent = item.title;
  mSummary.textContent = item.summary || "";
  mEra.textContent = item.era || "—";
  mCapital.textContent = item.capital || "—";

  mFacts.innerHTML = "";
  (item.facts || []).forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    mFacts.appendChild(li);
  });

  // Build slider
  slidesContainer.innerHTML = "";
  if (item.rulers && item.rulers.length) {
    item.rulers.forEach(r => {
      const s = document.createElement("div");
      s.className = "slide";
      s.innerHTML = `
        <img src="../images/rulers/${r.image}" alt="${r.name}">
        <h4>${r.name}</h4>
        <p>${r.description}</p>
      `;
      slidesContainer.appendChild(s);
    });
  }

  // Full page link
  if (item.page) {
    openPageBtn.href = item.page;
    openPageBtn.classList.remove("btn-hidden");
  } else {
    openPageBtn.classList.add("btn-hidden");
  }

  currentSlide = 0;
  updateSlider();

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  mImg.src = "";
}

// SLIDER
function updateSlider() {
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}
document.querySelector(".prev").addEventListener("click", () => {
  if (currentSlide > 0) currentSlide--;
  else currentSlide = slidesContainer.children.length - 1;
  updateSlider();
});
document.querySelector(".next").addEventListener("click", () => {
  if (currentSlide < slidesContainer.children.length - 1) currentSlide++;
  else currentSlide = 0;
  updateSlider();
});

modal.addEventListener("click", e => {
  if (e.target.hasAttribute("data-close-modal")) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
  if (e.key === "ArrowRight") document.querySelector(".next").click();
  if (e.key === "ArrowLeft") document.querySelector(".prev").click();
});
