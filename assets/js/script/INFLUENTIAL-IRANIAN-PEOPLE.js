document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("categoryGrid");

  categoryData.forEach((cat, i) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.style.setProperty("--i", i);

    card.innerHTML = `
      <div class="category-icon">${cat.icon}</div>
      <div class="category-title">${cat.title}</div>
      <div class="category-desc">${cat.desc}</div>
    `;

    card.addEventListener("click", () => {
      window.location.href = cat.link;
    });

    grid.appendChild(card);
  });
});
// Utility helpers
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

document.addEventListener("DOMContentLoaded", () => {
  const container = $("#erasContainer");
  const searchBox = $("#searchBox");
  const eraFilter = $("#eraFilter");
  const sortBy = $("#sortBy");

  // Render all eras
  function render() {
    const q = (searchBox.value || "").trim().toLowerCase();
    const eraSel = eraFilter.value; // all | Classical | Golden | Modern
    const sortSel = sortBy.value;   // featured | name | century

    container.innerHTML = "";

    poetsData.timelineGroups.forEach(group => {
      // Era filter
      if(eraSel !== "all" && group.eraKey !== eraSel) return;

      // Create era section
      const eraEl = document.createElement("section");
      eraEl.className = "era fade-in";
      eraEl.innerHTML = `
        <div class="era__head">
          <h2 class="era__title">${group.era}</h2>
        </div>
        <p class="era__desc">${group.description}</p>
        <div class="grid"></div>
      `;

      const grid = $(".grid", eraEl);

      // Filter + sort members
      let members = group.members.slice();

      if(q){
        members = members.filter(m =>
          (m.name||"").toLowerCase().includes(q) ||
          (m.field||"").toLowerCase().includes(q) ||
          (m.century||"").toLowerCase().includes(q)
        );
      }

      if(sortSel === "name"){
        members.sort((a,b)=> a.name.localeCompare(b.name));
      } else if(sortSel === "century"){
        // crude parse: prioritize digits inside century text
        const num = s => parseInt((s||"").match(/\d+/)?.[0] || (s.includes("BC")?-1e6:1e6), 10);
        members.sort((a,b)=> num(a.century) - num(b.century));
      }

      // Build cards
      members.forEach((m, i) => {
        const card = document.createElement("article");
        card.className = "card";
        card.setAttribute("tabindex","0");
        card.innerHTML = `
          <div class="card__media">
            <img class="card__img" src="${m.image}" alt="${m.name}" loading="lazy" />
            <div class="card__tint"></div>
          </div>
          <div class="card__body">
            <h3 class="card__title">${m.name}</h3>
            <p class="card__meta">${m.century} — ${m.field}</p>
          </div>
        `;

        card.addEventListener("click", () => openModal(m));
        card.addEventListener("keydown", (e)=>{
          if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openModal(m); }
        });

        grid.appendChild(card);
      });

      // Only append era if there is at least one member left after filtering
      if(members.length) container.appendChild(eraEl);
    });

    // Intersection observers for card reveals
    revealOnScroll();
  }

  function revealOnScroll(){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.dataset.io = "in";
          io.unobserve(ent.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold:.05 });

    $$(".card").forEach(c=> io.observe(c));
  }

  // Modal logic
  const modal = $("#personModal");
  const modalClose = $("#modalClose");
  const modalImage = $("#modalImage");
  const modalTitle = $("#modalTitle");
  const modalMeta = $("#modalMeta");
  const modalDesc = $("#modalDesc");
  let lastFocus = null;

  function openModal(m){
    lastFocus = document.activeElement;
    modalImage.src = m.image;
    modalImage.alt = m.name;
    modalTitle.textContent = m.name;
    modalMeta.textContent = `${m.century} — ${m.field}`;
    modalDesc.textContent = expandBio(m);

    modal.setAttribute("aria-hidden","false");
    modalClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    if(lastFocus) lastFocus.focus();
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape" && modal.getAttribute("aria-hidden")==="false") closeModal(); });

  // Expand short summary into a richer paragraph (light enhancement)
  function expandBio(m){
    // If you later add a dedicated long field, simply return that.
    // For now we craft a readable paragraph from known fields + summary:
    return `${m.summary} ${m.name} is widely regarded as a key figure of the ${m.century.toLowerCase()} in ${m.field.toLowerCase()}, shaping Persian and global thought with enduring influence.`;
  }

  // Events
  [searchBox, eraFilter, sortBy].forEach(el => el.addEventListener("input", render));

  // Initial render
  render();
});
