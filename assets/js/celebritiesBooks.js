const INDEX_PATH = "../assets/data/celebritiesBooks.index.json";
const grid = document.getElementById("celebritiesGrid");

/* Modal Node Connectors */
const modal = document.getElementById("celebrityModal");
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
let allItems = []; 
let currentCategory = "all";

/* Fetch and Bootstrap Initial Display List */
fetch(INDEX_PATH)
  .then(r => r.json())
  .then(list => {
    allItems = list;
    renderGrid(allItems);
    setupFilterEvents();
  })
  .catch(err => grid.innerHTML = `<p style="color:#f66">${err.message}</p>`);

/* Main Grid Generation Logic */
function renderGrid(data) {
  grid.innerHTML = "";
  if(data.length === 0) {
    grid.innerHTML = `<p style="color:#aeb6bf; grid-column: 1/-1;">No records match your filters.</p>`;
    return;
  }
  
  data.forEach((item, idx) => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    
    const imageSrc = item.image ? `../images/celebritiesBooks/${item.image}` : `../images/celebritiesBooks/ITEM_${idx+1}.png`;
    
    card.innerHTML = `
      <img src="${imageSrc}" alt="${item.title}" loading="lazy">
      <div class="overlay">
        <h2>${item.title}</h2>
        <p>${item.era}</p>
      </div>`;
      
    card.addEventListener("click", () => openModal(item, idx+1));
    card.addEventListener("keydown", (e) => { if(e.key === "Enter") openModal(item, idx+1); });
    grid.appendChild(card);
  });
}

/* Event Binding Engine for Search & Filters */
function setupFilterEvents() {
  const searchInput = document.getElementById("searchItem");
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

/* Combined Real-Time Filtering Logic */
function applyFilterAndSearch(textQuery) {
  const query = textQuery.toLowerCase().trim();
  
  const filtered = allItems.filter(item => {
    const matchesCategory = (currentCategory === "all" || item.category === currentCategory);
    const matchesSearch = item.title.toLowerCase().includes(query) || (item.era && item.era.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });
  
  renderGrid(filtered);
}

/* Lazy-Load Data Fields into Modal Window */
function openModal(item, indexNo) {
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const imageSrc = item.image ? `../images/celebritiesBooks/${item.image}` : `../images/celebritiesBooks/ITEM_${indexNo}.png`;
  mImg.src   = imageSrc;
  mTitle.textContent = item.title;
  mCat.textContent   = item.category ? item.category.toUpperCase() : "—";
  mEra.textContent   = item.era || "—";
  mSum.textContent   = item.summary || "";

  openBtn.href = item.page || "#";

  /* Clear existing content fields */
  mMap.src = ""; mMap.style.display = "none";
  mFacts.innerHTML = ""; slides.innerHTML = ""; currentSlide = 0;
  updateSlider();

  /* Remote fetch operation for detailed profiles */
  if(item.dataPath) {
    fetch(item.dataPath)
      .then(r => r.json())
      .then(full => {
        /* Optional geographic map / signature manuscript */
        if (full.map) { mMap.src = full.map; mMap.style.display = "block"; }

        /* Append bulleted factual records */
        (full.facts || []).forEach(factText => {
          const li = document.createElement("li"); li.textContent = factText; mFacts.appendChild(li);
        });

        /* Append associated sub-images into carousel tracks */
        (full.slides || []).forEach(slideItem => {
          const s = document.createElement("div");
          s.className = "slide";
          s.innerHTML = `
            <img src="../images/celebritiesBooks/${slideItem.image}" alt="${slideItem.name || ''}" loading="lazy">
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

/* Close UI Routines */
function closeModal(){ modal.setAttribute("aria-hidden","true"); document.body.style.overflow = "" }
modal.addEventListener("click", e => { if (e.target.hasAttribute("data-close-modal")) closeModal() });
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.getAttribute("aria-hidden")==="false") closeModal() });

/* Transform Animation Trackers */
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
