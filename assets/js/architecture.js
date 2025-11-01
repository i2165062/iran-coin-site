/*
📸 IMAGE STRUCTURE REMINDER:
Each architecture item uses its "key" field to automatically load images:
  - Card (thumbnail): ../images/architecture/<key>-2.png
  - Modal (detail view): ../images/architecture/<key>-1.png
So you only need to add images with correct filenames — no need to edit paths.
*/

const container = document.getElementById("architectureContainer");
const modal = document.getElementById("archModal");
const mImg = document.getElementById("modalImage");
const mTitle = document.getElementById("modalTitle");
const mSummary = document.getElementById("modalSummary");
const mEra = document.getElementById("metaEra");
const mLoc = document.getElementById("metaLocation");
const mStyle = document.getElementById("metaStyle");
const mMat = document.getElementById("metaMaterials");
const mFacts = document.getElementById("modalFacts");

fetch("../assets/data/architecture.json")
  .then(r => r.json())
  .then(data => renderArchitecture(data))
  .catch(err => console.error("Error loading architecture.json:", err));

function renderArchitecture(data) {
  const categories = [
    { key: "ancient", title: "Ancient Architecture" },
    { key: "islamic", title: "Islamic Architecture" },
    { key: "qajar", title: "Qajar & Modern" },
    { key: "regional", title: "Regional Styles" },
    { key: "coming", title: "Coming Soon" }
  ];

  categories.forEach(cat => {
    const section = document.createElement("section");
    section.className = "section";

    const heading = document.createElement("h2");
    heading.className = "section-title";
    heading.textContent = cat.title;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "grid";

    data
      .filter(item => item.category === cat.key)
      .forEach(item => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
          <img class="card__img" src="../images/architecture/${item.key}-2.png" alt="${item.title}">
          <div class="card__title">${item.title}</div>
          <div class="card__tag">${item.style.split(" ")[0]}</div>
        `;
        card.addEventListener("click", () => openModal(item));
        grid.appendChild(card);
      });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

function openModal(item) {
  mImg.src = `../images/architecture/${item.key}-1.png`;
  mTitle.textContent = item.title;
  mSummary.textContent = item.summary;
  mEra.textContent = item.era;
  mLoc.textContent = item.location;
  mStyle.textContent = item.style;
  mMat.textContent = item.materials;

  mFacts.innerHTML = "";
  (item.facts || []).forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    mFacts.appendChild(li);
  });

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  mImg.src = "";
}

modal.addEventListener("click", e => {
  if (e.target.hasAttribute("data-close-modal")) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
});
document.querySelectorAll("[data-close-modal]").forEach(btn => btn.addEventListener("click", closeModal));
