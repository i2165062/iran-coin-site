/*
📸 IMAGE STRUCTURE REMINDER
Images auto-load from "key":
  Card thumbnail:  ../images/architecture/<key>-2.png
  Modal (detail):  ../images/architecture/<key>-1.png
No paths in JSON needed—just add images with the correct filenames.
*/

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

// لود داده‌ها
fetch('../assets/data/architecture.json')
  .then(r => r.json())
  .then(all => {
    const data = all.filter(x => x.category === CATEGORY);
    renderList(data);
  })
  .catch(err => {
    console.error('Error loading architecture.json:', err);
    grid.innerHTML = `<p class="subtitle">Cannot load data. Please check <code>assets/data/architecture.json</code>.</p>`;
  });

// رندر کارت‌ها
function renderList(items){
  if(!items.length){
    grid.innerHTML = `<p class="subtitle">No items yet for this category. Coming soon.</p>`;
    return;
  }

  items.forEach(item => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <img class="card__img" src="../images/architecture/${item.key}-2.png" alt="${item.title}" loading="lazy">
      <div class="card__title">${item.title}</div>
      <div class="card__tag">${(item.style||'').split(' ')[0]||'—'}</div>
    `;
    el.addEventListener('click', () => openModal(item));
    el.addEventListener('keydown', e => {
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openModal(item); }
    });
    el.tabIndex = 0;
    el.setAttribute('role','button');
    el.setAttribute('aria-label', item.title);
    grid.appendChild(el);
  });
}

// مودال
function openModal(item){
  mImg.src = `../images/architecture/${item.key}-1.png`;
  mImg.alt = item.title;
  mTitle.textContent = item.title;
  mSummary.textContent = item.summary || '';
  mEra.textContent = item.era || '—';
  mLoc.textContent = item.location || '—';
  mStyle.textContent = item.style || '—';
  mMat.textContent = item.materials || '—';

  mFacts.innerHTML = '';
  (item.facts||[]).forEach(f=>{
    const li = document.createElement('li');
    li.textContent = f;
    mFacts.appendChild(li);
  });

  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  mImg.src='';
}

modal.addEventListener('click', e => {
  if(e.target.hasAttribute('data-close-modal')) closeModal();
});
document.addEventListener('keydown', e => {
  if(e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') closeModal();
});
document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', closeModal));
