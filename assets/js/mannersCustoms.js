const INDEX_PATH = "../assets/data/mannersCustoms.index.json";
const grid = document.getElementById("customsGrid");

/* Modal References */
const modal = document.getElementById("customModal");
const mImg   = document.getElementById("modalImage");
const mTitle = document.getElementById("modalTitle");
const mSum   = document.getElementById("modalSummary");
const mCat   = document.getElementById("metaCategory");
const mOrigin= document.getElementById("metaOrigin");
const mFacts = document.getElementById("modalFacts");
const mMap   = document.getElementById("modalMap");
const slides = document.getElementById("slides");
const openBtn= document.getElementById("openFullPage");

let currentSlide = 0;
let allCustoms = []; 
let currentCategory = "all";

/* Fetch and Initialize Initial Grid */
fetch(INDEX_PATH)
  .then(r => r.json())
  .then(list => {
    allCustoms = list;
    renderGrid(allCustoms);
    setupFilterEvents();
  })
  .catch(err => grid.innerHTML = `<p style="color:#f66">${err.message}</p>`);

/* Render Cards Grid */
function renderGrid(data) {
  grid.innerHTML = "";
  if(data.length === 0) {
    grid.innerHTML = `<p style="color:#aeb6bf; grid-column: 1/-1;">No customs found matching your criteria.</p>`;
    return;
  }
  
  data.forEach((d, i) => {
    const el = document.createElement("article");
    el.className = "card";
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    
    // آدرس‌دهی پویا به پوشه تصاویر آداب و رسوم
    const imageSrc = d.image ? `../images/mannersCustoms/${d.image}` : `../images/mannersCustoms/CST_${i+1}.png`;
    
    el.innerHTML = `
      <img src="${imageSrc}" alt="${d.title}" loading="lazy">
      <div class="overlay">
        <h2>${d.title}</h2>
        <p>${d.era}</p>
      </div>`;
      
    el.addEventListener("click", () => openModal(d, i+1));
    el.addEventListener("keydown", (e) => { if(e.key === "Enter") openModal(d, i+1); });
    grid.appendChild(el);
  });
}

/* Connect Search and Category Buttons */
function setupFilterEvents() {
  const searchInput = document.getElementById("searchCustom");
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

/* Dual Filter & Search Engine */
function applyFilterAndSearch(textQuery) {
  const query = textQuery.toLowerCase().trim();
  
  const filtered = allCustoms.filter(d => {
    const matchesCategory = (currentCategory === "all" || d.category === currentCategory);
    const matchesSearch = d.title.toLowerCase().includes(query) || (d.era && d.era.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });
  
  renderGrid(filtered);
}

/* Lazy Load Modal Details */
function openModal(custom, indexNo) {
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const imageSrc = custom.image ? `../images/mannersCustoms/${custom.image}` : `../images/mannersCustoms/CST_${indexNo}.png`;
  mImg.src   = imageSrc;
  mTitle.textContent = custom.title;
  mCat.textContent   = custom.category ? custom.category.toUpperCase() : "—";
  mOrigin.textContent = custom.era || "—";
  mSum.textContent   = custom.summary || "";

  openBtn.href = custom.page || "#";

  /* Reset layout fields */
  mMap.src = ""; mMap.style.display = "none";
  mFacts.innerHTML = ""; slides.innerHTML = ""; currentSlide = 0;
  updateSlider();

  /* Lazy loading detail data from JSON file */
  if(custom.dataPath) {
    fetch(custom.dataPath)
      .then(r => r.json())
      .then(full => {
        /* Map or infographic illustration */
        if (full.map) { mMap.src = full.map; mMap.style.display = "block"; }

        /* Render custom facts */
        (full.facts || custom.facts || []).forEach(f => {
          const li = document.createElement("li"); li.textContent = f; mFacts.appendChild(li);
        });

        /* Render inner slide sub-elements */
        (full.slides || []).forEach(sItem => {
          const s = document.createElement("div");
          s.className = "slide";
          s.innerHTML = `
            <img src="../images/mannersCustoms/${sItem.image}" alt="${sItem.name || ''}" loading="lazy">
            <h4>${sItem.name || ''}</h4>
            <p>${sItem.description || ""}</p>`;
          slides.appendChild(s);
        });
        updateSlider();
      })
      .catch(err => {
        const li = document.createElement("li");
        li.textContent = `Could not load custom details: ${err.message}`;
        mFacts.appendChild(li);
      });
  }
}

/* Window & UI Closures */
function closeModal(){ modal.setAttribute("aria-hidden","true"); document.body.style.overflow = "" }
modal.addEventListener("click", e => { if (e.target.hasAttribute("data-close-modal")) closeModal() });
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.getAttribute("aria-hidden")==="false") closeModal() });

/* Slider Engine */
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
