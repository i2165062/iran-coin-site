const INDEX_PATH = "../assets/data/ethnicities.index.json";
const grid = document.getElementById("ethnicitiesGrid");

/* Modal Node Mappings */
const modal = document.getElementById("ethnicityModal");
const mImg   = document.getElementById("modalImage");
const mTitle = document.getElementById("modalTitle");
const mSum   = document.getElementById("modalSummary");
const mCat   = document.getElementById("metaCategory");
const mEra   = document.getElementById("metaEra");
const mFacts = document.getElementById("modalFacts");
const mMap   = document.getElementById("modalMap");
const slides = document.getElementById("slides");
const openBtn= document.getElementById("openFullPage");

let currentSlide = 0;
let allGroups = []; 
let currentCategory = "all";

/* Fetch and Populate Grid System */
fetch(INDEX_PATH)
  .then(r => r.json())
  .then(list => {
    allGroups = list;
    renderGrid(allGroups);
    setupFilterEvents();
  })
  .catch(err => grid.innerHTML = `<p style="color:#f66">${err.message}</p>`);

/* Main Card Grid Generator */
function renderGrid(data) {
  grid.innerHTML = "";
  if(data.length === 0) {
    grid.innerHTML = `<p style="color:#aeb6bf; grid-column: 1/-1;">No ethnic groups match your criteria.</p>`;
    return;
  }
  
  data.forEach((group, idx) => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    
    const imageSrc = group.image ? `../images/ethnicities/${group.image}` : `../images/ethnicities/GROUP_${idx+1}.png`;
    
    card.innerHTML = `
      <img src="${imageSrc}" alt="${group.title}" loading="lazy">
      <div class="overlay">
        <h2>${group.title}</h2>
        <p>${group.era}</p>
      </div>`;
      
    card.addEventListener("click", () => openModal(group, idx+1));
    card.addEventListener("keydown", (e) => { if(e.key === "Enter") openModal(group, idx+1); });
    grid.appendChild(card);
  });
}

/* Event Connectors for UI Controls */
function setupFilterEvents() {
  const searchInput = document.getElementById("searchEthnicity");
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      filterButtons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentCategory = e.target.getAttribute("data-cat");
      applyFilterAndSearch(searchInput.value);
    });
  });

  searchInput.addEventListener("input", (e) => {
    applyFilterAndSearch(e.target.value);
  });
}

/* Synchronous Query Execution Filter */
function applyFilterAndSearch(textQuery) {
  const query = textQuery.toLowerCase().trim();
  
  const filtered = allGroups.filter(group => {
    const matchesCategory = (currentCategory === "all" || group.category === currentCategory);
    const matchesSearch = group.title.toLowerCase().includes(query) || (group.era && group.era.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });
  
  renderGrid(filtered);
}

/* Lazy-Load Details Into Modal */
function openModal(group, indexNo) {
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const imageSrc = group.image ? `../images/ethnicities/${group.image}` : `../images/ethnicities/GROUP_${indexNo}.png`;
  mImg.src   = imageSrc;
  mTitle.textContent = group.title;
  mCat.textContent   = group.category ? group.category.toUpperCase() : "—";
  mEra.textContent   = group.era || "—";
  mSum.textContent   = group.summary || "";

  openBtn.href = group.page || "#";

  /* Clear lingering structural nodes */
  mMap.src = ""; mMap.style.display = "none";
  mFacts.innerHTML = ""; slides.innerHTML = ""; currentSlide = 0;
  updateSlider();

  /* Remote fetch operation for full profile records */
  if(group.dataPath) {
    fetch(group.dataPath)
      .then(r => r.json())
      .then(full => {
        /* Map or localized infographic target */
        if (full.map) { mMap.src = full.map; mMap.style.display = "block"; }

        /* Append bulleted lists */
        (full.facts || []).forEach(factText => {
          const li = document.createElement("li"); li.textContent = factText; mFacts.appendChild(li);
        });

        /* Append images to carousel track */
        (full.slides || []).forEach(slideItem => {
          const s = document.createElement("div");
          s.className = "slide";
          s.innerHTML = `
            <img src="../images/ethnicities/${slideItem.image}" alt="${slideItem.name || ''}" loading="lazy">
            <h4>${slideItem.name || ''}</h4>
            <p>${slideItem.description || ""}</p>`;
          slides.appendChild(s);
        });
        updateSlider();
      })
      .catch(err => {
        const li = document.createElement("li");
        li.textContent = `Error compiling profile resources: ${err.message}`;
        mFacts.appendChild(li);
      });
  }
}

/* UI Closures */
function closeModal(){ modal.setAttribute("aria-hidden","true"); document.body.style.overflow = "" }
modal.addEventListener("click", e => { if (e.target.hasAttribute("data-close-modal")) closeModal() });
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.getAttribute("aria-hidden")==="false") closeModal() });

/* Animation Transformations tracking */
function updateSlider(){ 
  slides.style.transform = `translateX(-${currentSlide * 100}%)`; 
}
document.querySelector(".prev").addEventListener("click", () => {
  const total = slides.children.length || 1;
  currentSlide = (currentSlide - 1 + total) % total; 
  updateSlider();
});
document.querySelector(".next").addEventListener("click", () => {
  const total = slides.children.length || 1;
  currentSlide = (currentSlide + 1) % total; 
  updateSlider();
});
