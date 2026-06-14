const INDEX_PATH = "../assets/data/criticalEvents.index.json";
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
let allEvents = []; // ذخیره محلی هر ۵۰ رویداد جهت فیلترینگ سریع
let currentCategory = "all";

/* Render grid with Filter and Search logic */
fetch(INDEX_PATH)
  .then(r => r.json())
  .then(list => {
    allEvents = list;
    renderGrid(allEvents);
    setupFilterEvents();
  })
  .catch(err => grid.innerHTML = `<p style="color:#f66">${err.message}</p>`);

function renderGrid(data) {
  grid.innerHTML = "";
  if(data.length === 0) {
    grid.innerHTML = `<p style="color:#aeb6bf; grid-column: 1/-1;">No events found matching your criteria.</p>`;
    return;
  }
  
  data.forEach((d, i) => {
    const el = document.createElement("article");
    el.className = "card";
    // آدرس‌دهی پویا بر اساس ویژگی تصویر درون آبجکت رویداد یا ایندکس آن
    const imageSrc = d.image ? `../images/criticalEvents/${d.image}` : `../images/criticalEvents/EVT_${i+1}.png`;
    
    el.innerHTML = `
      <img src="${imageSrc}" alt="${d.title}" loading="lazy">
      <div class="overlay">
        <h2>${d.title}</h2>
        <p>${d.era}</p>
      </div>`;
    el.addEventListener("click", () => openModal(d, i+1));
    grid.appendChild(el);
  });
}

/* Filter and Search Setup */
function setupFilterEvents() {
  const searchInput = document.getElementById("searchEvent");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // عملکرد بخش فیلتر دکمه‌ای
  filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      filterButtons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentCategory = e.target.getAttribute("data-cat");
      applyFilterAndSearch(searchInput.value);
    });
  });

  // عملکرد بخش نوار جستجو
  searchInput.addEventListener("input", (e) => {
    applyFilterAndSearch(e.target.value);
  });
}

// ترکیب فیلتر دسته‌بندی و سرچ به صورت همزمان
function applyFilterAndSearch(textQuery) {
  const query = textQuery.toLowerCase().trim();
  
  const filtered = allEvents.filter(d => {
    const matchesCategory = (currentCategory === "all" || d.category === currentCategory);
    const matchesSearch = d.title.toLowerCase().includes(query) || (d.era && d.era.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });
  
  renderGrid(filtered);
}

/* Open modal: fetch the full event JSON lazily */
function openModal(dyn, indexNo) {
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const imageSrc = dyn.image ? `../images/criticalEvents/${dyn.image}` : `../images/criticalEvents/EVT_${indexNo}.png`;
  mImg.src   = imageSrc;
  mTitle.textContent = dyn.title;
  mEra.textContent   = dyn.era || "—";
  mCap.textContent   = dyn.capital || "—";
  mSum.textContent   = dyn.summary || "";

  openBtn.href = dyn.page || "#";

  /* reset modal state */
  mMap.src = ""; mMap.style.display = "none";
  mFacts.innerHTML = ""; slides.innerHTML = ""; currentSlide = 0;
  updateSlider();

  /* fetch full data file */
  if(dyn.dataPath) {
    fetch(dyn.dataPath)
      .then(r => r.json())
      .then(full => {
        /* map */
        if (full.map) { mMap.src = full.map; mMap.style.display = "block"; }

        /* facts */
        (full.facts || dyn.facts || []).forEach(f => {
          const li = document.createElement("li"); li.textContent = f; mFacts.appendChild(li);
        });

        /* elements slider (Key people or document images) */
        (full.rulers || full.slides || []).forEach(sItem => {
          const s = document.createElement("div");
          s.className = "slide";
          s.innerHTML = `
            <img src="../images/criticalEvents/${sItem.image}" alt="${sItem.name || ''}">
            <h4>${sItem.name || ''}</h4>
            <p>${sItem.description || ""}</p>`;
          slides.appendChild(s);
        });
        updateSlider();
      })
      .catch(err => {
        const li = document.createElement("li");
        li.textContent = `Could not load event details: ${err.message}`;
        mFacts.appendChild(li);
      });
  }
}

function closeModal(){ modal.setAttribute("aria-hidden","true"); document.body.style.overflow = "" }
modal.addEventListener("click", e => { if (e.target.hasAttribute("data-close-modal")) closeModal() });
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.getAttribute("aria-hidden")==="false") closeModal() });

/* Slider Logic */
function updateSlider(){ 
  // حرکت بر اساس جهت استاندارد چپ به راست در استایل فلکس چیده شده
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
