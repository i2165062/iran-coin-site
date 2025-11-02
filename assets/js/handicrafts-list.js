/*
📸 IMAGE STRUCTURE REMINDER
Card thumbnail:  ../images/handicrafts/<key>-2.png
Modal image:     ../images/handicrafts/<key>-1.png
(Only set "key" in JSON; images load automatically.)
*/

const JSON_PATH = '/assets/data/handicrafts.json'; // از ریشه سایت (برای GitHub Pages ایمن)
const ROOT = document.documentElement;
const CATEGORY = ROOT.getAttribute('data-category'); // wood-metal | textile | ceramic | jewelry

const grid = document.getElementById('craftGrid');
const modal = document.getElementById('craftModal');
const mImg = document.getElementById('modalImage');
const mTitle = document.getElementById('modalTitle');
const mSummary = document.getElementById('modalSummary');
const mRegion = document.getElementById('metaRegion');
const mMaterials = document.getElementById('metaMaterials');
const mLineage = document.getElementById('metaLineage');
const mTechnique = document.getElementById('metaTechnique');
const mFacts = document.getElementById('modalFacts');

fetch(JSON_PATH)
  .then(res => {
    if(!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return res.json();
  })
  .then(data => {
    if(!Array.isArray(data)) throw new Error('Invalid JSON format');
    renderList(data.filter(x => x.category === CATEGORY));
  })
  .catch(err => {
    console.error('Error loading handicrafts.json:', err);
    grid.innerHTML = `<p class="subtitle" style="text-align:center;color:#c55">Cannot load data. Check <code>${JSON_PATH}</code><br><small>${err.message}</small></p>`;
  });

function renderList(items){
  if(!items.length){
    grid.innerHTML = `<p class="subtitle" style="text-align:center;">No items yet for this category. Coming soon.</p>`;
    return;
  }
  items.forEach(item => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <img class="card__img" src="../images/handicrafts/${item.key}-2.png" alt="${item.title}" loading="lazy">
      <div class="card__title">${item.title}</div>
      <div class="card__tag">${(item.region || 'Iran')}</div>
    `;
    el.addEventListener('click', () => openModal(item));
    el.tabIndex = 0;
    el.setAttribute('role','button');
    el.setAttribute('aria-label', item.title);
    grid.appendChild(el);
  });
}

function openModal(item){
  mImg.src = `../images/handicrafts/${item.key}-1.png`;
  mImg.alt = item.title;
  mTitle.textContent = item.title;
  mSummary.textContent = item.summary || '';
  mRegion.textContent = item.region || '—';
  mMaterials.textContent = item.materials || '—';
  mLineage.textContent = item.lineage || '—';
  mTechnique.textContent = item.technique || '—';

  mFacts.innerHTML = '';
  (item.facts || []).forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    mFacts.appendChild(li);
  });

  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  mImg.src = '';
}

modal.addEventListener('click', e => {
  if(e.target.hasAttribute('data-close-modal')) closeModal();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});
document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', closeModal));
