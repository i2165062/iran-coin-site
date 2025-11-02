/*
📸 IMAGE STRUCTURE REMINDER:
Each architecture item uses its "key" field to automatically load images:
  - Card thumbnail:  ../images/architecture/<key>-2.png
  - Modal (detail view):  ../images/architecture/<key>-1.png
So you only need to add images with correct filenames — no need to edit paths.
*/

// ─────────────────────────────────────────────
// 🔧 CONFIGURATION
// این مسیر برای GitHub Pages ایمن است (همیشه از root می‌خواند)
const JSON_PATH = '/assets/data/architecture.json';

// ─────────────────────────────────────────────
// 📦 ELEMENT REFERENCES
const ROOT = document.documentElement; // <html data-category="...">
const CATEGORY = ROOT.getAttribute('data-category'); // ancient | islamic | qajar | regional
const grid = document.getElementById('architectureGrid');

const modal = document.getElementById('archModal');
const mImg = document.getElementById('modalImage');
const mTitle = document.getElementById('modalTitle');
const mSummary = document.getElementById('modalSummary');
const mEra = document.getElementById('metaEra');
const mLoc = document.getElementById('metaLocation');
const mStyle = document.getElementById('metaStyle');
const mMat = document.getElementById('metaMaterials');
const mFacts = document.getElementById('modalFacts');

// ─────────────────────────────────────────────
// 🚀 LOAD JSON DATA
fetch(JSON_PATH)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    if (!Array.isArray(data)) throw new Error('Invalid JSON format');
    const filtered = data.filter(item => item.category === CATEGORY);
    renderList(filtered);
  })
  .catch(err => {
    console.error('❌ Error loading architecture.json:', err);
    grid.innerHTML = `
      <p class="subtitle" style="text-align:center;color:#c55;">
        Cannot load data. Please check <code>${JSON_PATH}</code><br>
        <small>${err.message}</small>
      </p>`;
  });

// ─────────────────────────────────────────────
// 🧱 RENDER ARCHITECTURE GRID
function renderList(items) {
  if (!items.length) {
    grid.innerHTML = `<p class="subtitle" style="text-align:center;">No items yet for this category. Coming soon.</p>`;
    return;
  }

  items.forEach(item => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <img class="card__img" src="../images/architecture/${item.key}-2.png" alt="${item.title}" loading="lazy">
      <div class="card__title">${item.title}</div>
      <div class="card__tag">${(item.style || '').split(' ')[0] || '—'}</div>
    `;
    el.addEventListener('click', () => openModal(item));
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', item.title);
    grid.appendChild(el);
  });
}

// ─────────────────────────────────────────────
// 🎬 MODAL OPEN / CLOSE
function openModal(item) {
  mImg.src = `../images/architecture/${item.key}-1.png`;
  mImg.alt = item.title;
  mTitle.textContent = item.title;
  mSummary.textContent = item.summary || '';
  mEra.textContent = item.era || '—';
  mLoc.textContent = item.location || '—';
  mStyle.textContent = item.style || '—';
  mMat.textContent = item.materials || '—';

  // List of facts
  mFacts.innerHTML = '';
  (item.facts || []).forEach(fact => {
    const li = document.createElement('li');
    li.textContent = fact;
    mFacts.appendChild(li);
  });

  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  mImg.src = '';
}

// Close modal on overlay or Escape
modal.addEventListener('click', e => {
  if (e.target.hasAttribute('data-close-modal')) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});
document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', closeModal));

// ─────────────────────────────────────────────
// ✅ END OF FILE
console.log(`📁 Architecture viewer initialized for category: ${CATEGORY}`);
