// 1. Database of Iranian Manners and Customs
const customsData = [
  {
    id: 1,
    title: "Ta'arof (Cultural Etiquette)",
    era: "Ancient Roots",
    category: "etiquette",
    image: "../images/taarof.jpg",
    summary: "The complex system of politeness, hospitality, and respect that governs social interactions in Iranian daily life.",
    origin: "Deep cultural evolution",
    map: "../images/maps/iran_general.jpg",
    slides: [
      { img: "../images/taarof_shop.jpg", title: "Commercial Ta'arof", desc: "Refusing payment initially as a sign of respect." },
      { img: "../images/taarof_home.jpg", title: "Hosting Ta'arof", desc: "Offering the best food and seat to guests repeatedly." }
    ],
    facts: ["It balances social hierarchies.", "Never accept an offer on the very first try.", "Always express humble appreciation."]
  },
  {
    id: 2,
    title: "Nowruz (Persian New Year)",
    era: "Zoroastrian Era",
    category: "festivals",
    image: "../images/nowruz.jpg",
    summary: "The traditional celebration of the vernal equinox, marking the beginning of spring and the new year on the Iranian calendar.",
    origin: "Over 3,000 years old",
    map: "../images/maps/nowruz_spread.jpg",
    slides: [
      { img: "../images/haftsin.jpg", title: "Haft-Sin Table", desc: "7 symbolic items starting with the Persian letter 'S'." },
      { img: "../images/sizdah.jpg", title: "Sizdah Bedar", desc: "Spending the 13th day of the new year outdoors in nature." }
    ],
    facts: ["Recognized globally by UNESCO.", "Involves thorough spring cleaning (Khaneh-Tekani).", "Focuses heavily on visiting elders and family members."]
  }
];

// 2. DOM Elements Selection
const customsGrid = document.getElementById("customsGrid");
const searchInput = document.getElementById("searchCustom");
const filterButtons = document.querySelectorAll(".filter-btn");

// Modal Selection
const modal = document.getElementById("customModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalSummary = document.getElementById("modalSummary");
const metaCategory = document.getElementById("metaCategory");
const metaOrigin = document.getElementById("metaOrigin");
const modalMap = document.getElementById("modalMap");
const slidesContainer = document.getElementById("slides");
const openFullPageBtn = document.getElementById("openFullPage");
const modalFacts = document.getElementById("modalFacts");

// Filter & Slider State Management
let currentCategory = "all";
let searchQuery = "";
let currentSlideIndex = 0;

// 3. Dynamic Rendering Function
function renderCustoms() {
  customsGrid.innerHTML = "";
  
  const filteredData = customsData.filter(custom => {
    const matchesCategory = currentCategory === "all" || custom.category === currentCategory;
    const matchesSearch = custom.title.toLowerCase().includes(searchQuery) || 
                          custom.era.toLowerCase().includes(searchQuery) ||
                          custom.summary.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filteredData.length === 0) {
    customsGrid.innerHTML = `<p class="subtitle" style="grid-column: 1/-1;">No customs found matching your criteria.</p>`;
    return;
  }

  filteredData.forEach(custom => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
      <img src="${custom.image}" alt="${custom.title}" loading="lazy" />
      <div class="overlay">
        <h2>${custom.title}</h2>
        <p>${custom.era}</p>
      </div>
    `;
    
    // Binding Open Actions
    card.addEventListener("click", () => openModal(custom));
    card.addEventListener("keydown", (e) => { if(e.key === "Enter") openModal(custom); });
    
    customsGrid.appendChild(card);
  });
}

// 4. Input & Filter Controls
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderCustoms();
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.getAttribute("data-cat");
    renderCustoms();
  });
});

// 5. Modal and Slides Control Logic
function openModal(custom) {
  modalTitle.textContent = custom.title;
  modalImage.src = custom.image;
  modalImage.alt = custom.title;
  modalSummary.textContent = custom.summary;
  metaCategory.textContent = custom.category.toUpperCase();
  metaOrigin.textContent = custom.origin;
  modalMap.src = custom.map;
  openFullPageBtn.href = `customs/${custom.id}.html`; 

  // Load List Items
  modalFacts.innerHTML = custom.facts.map(fact => `<li>${fact}</li>`).join("");

  // Load Visual Carousel Slides
  if (custom.slides && custom.slides.length > 0) {
    slidesContainer.innerHTML = custom.slides.map(slide => `
      <div class="slide">
        <img src="${slide.img}" alt="${slide.title}" loading="lazy" />
        <h4>${slide.title}</h4>
        <p>${slide.desc}</p>
      </div>
    `).join("");
    document.querySelector(".slider-nav").style.display = "flex";
  } else {
    slidesContainer.innerHTML = "";
    document.querySelector(".slider-nav").style.display = "none";
  }

  // Reset Index
  currentSlideIndex = 0;
  updateSliderPosition();

  // Show Modal Overlay Safely
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; 
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; 
}

// Global Event Binding for Closures
document.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", closeModal);
});

// Carousel Transform Offset Updates
function updateSliderPosition() {
  slidesContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

document.querySelector(".next").addEventListener("click", () => {
  const totalSlides = slidesContainer.children.length;
  if (totalSlides > 0) {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSliderPosition();
  }
});

document.querySelector(".prev").addEventListener("click", () => {
  const totalSlides = slidesContainer.children.length;
  if (totalSlides > 0) {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
  }
});

// Handle Hardware Escape Button
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

// Primary Render Engine Hook
document.addEventListener("DOMContentLoaded", renderCustoms);
