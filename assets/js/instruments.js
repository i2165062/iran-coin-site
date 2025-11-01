// ---------- Data (18 instruments) ----------
// card image:   images/instruments/<key>-2.png
// modal image:  images/instruments/<key>-1.png
const INSTRUMENTS = [
  {
    key:'tar', title:'Tar',
    family:'Long-necked lute (plucked)',
    region:'Central & Northern Iran; Qajar lineage',
    tuning:'Standard D–G–C (3 double courses), ~2.5 octaves',
    technique:'Risha/plectrum with intricate right-hand patterns; left-hand ornaments (delkesh, mordant, slides)',
    summary:'Iconic classical instrument of the Radif. Deep, projecting tone shaped by its double-bowl body and skin soundboard.',
    notes:[
      'Primary solo/ensemble voice in Radif with advanced gusheh articulation.',
      'Golestan of timbres via bridge pressure and nail angle.'
    ]
  },
  {
    key:'setar', title:'Setar',
    family:'Long-necked lute (plucked, 4 strings)',
    region:'Across Iran; Sufi & classical circles',
    tuning:'C–G–C–C (common), flexible scordatura; ~2.5 octaves',
    technique:'Played with nail (no pick). Delicate tremolo, fluid slides, microtonal agility.',
    summary:'Intimate, breath-like sound; the contemplative sibling of the Tar.',
    notes:[
      'Favoured for solo meditation and nuanced dastgah intonation.',
      'Extremely expressive dynamic control at low volumes.'
    ]
  },
  {
    key:'kamanche', title:'Kamanche',
    family:'Spike fiddle (bowed)',
    region:'Nationwide; shared Caucasus/Anatolian heritage',
    tuning:'G–D–A–E (modern); ~2.5 octaves',
    technique:'Short bow with wrist rotation; intense ornamented bowing and slides.',
    summary:'The lyrical bowed voice of Iranian music—keen, vocal, and agile.',
    notes:[
      'Central to both classical and regional dance repertoires.',
      'Spherical body with skin head yields penetrating midrange.'
    ]
  },
  {
    key:'santur', title:'Santur',
    family:'Trapezoid hammered zither',
    region:'Iran (Safavid/Qajar courts)',
    tuning:'72 strings in courses; modular bridge systems per dastgah',
    technique:'Mezrabs (light hammers) for rapid tremolos, rolls, and arpeggiation.',
    summary:'Shimmering cascades and crystalline resonance define its orchestral role.',
    notes:[
      'Multiple tunings; quick modulation by moving bridges.',
      'Demands precise muting to control sympathetic bloom.'
    ]
  },
  {
    key:'dotar', title:'Dotar',
    family:'Two-string long-necked lute',
    region:'Khorasan, Turkmen-Sistan belts',
    tuning:'A–D (typical); modal variants',
    technique:'Finger-plucked ostinati with narrative singing traditions.',
    summary:'Epic-tale companion with earthy drone and bright articulation.',
    notes:[
      'Storytelling (bakhshi) tradition; modal cycles unique to Khorasan.',
      'Drone-melody interplay yields hypnotic grooves.'
    ]
  },
  {
    key:'tanbur', title:'Tanbur',
    family:'Long-necked lute (sacred repertoire)',
    region:'Kermanshah (Yarsan tradition) & West Iran',
    tuning:'D–A–D (common); narrow frets for microtones',
    technique:'Risha-shodan strums, fast tremolo, modal drones.',
    summary:'Mystic timbre associated with ritual hymns and trance-like cycles.',
    notes:[
      'Spiritual repertoire (Maqam-e Yarsan).',
      'Distinct plectrum grammar and open-string resonance.'
    ]
  },
  {
    key:'qanun', title:'Qanun',
    family:'Plucked board zither',
    region:'Urban ensembles across Iran',
    tuning:'Levers (mandals) enable rapid microtonal shifts; ~3 octaves',
    technique:'Metal finger-picks; glissandi, tremolos, arpeggios.',
    summary:'Harp-like clarity with instant modulation via mandals.',
    notes:[
      'Bridges and mandals allow fine radif intonation.',
      'Strong role in modern orchestral fusions.'
    ]
  },
  {
    key:'barbat', title:'Barbat (Ud)',
    family:'Short-necked lute (plucked)',
    region:'Ancient Persian origin; pan-regional',
    tuning:'C–F–A–d–g–c′ (common ud set)',
    technique:'Risha (pick) with robust down-up patterns; ornamented runs.',
    summary:'Warm, round low-mid body; ancestor to the ud family.',
    notes:[
      'Historically linked to court music and poetry.',
      'Perfect for bass-rich takht textures.'
    ]
  },
  {
    key:'dayereh', title:'Dayereh',
    family:'Frame drum with jingles',
    region:'National; folk & urban styles',
    tuning:'Hand-tensioned; pitch inflected by finger pressure',
    technique:'Finger rolls, snaps, jingle control for polyrhythms.',
    summary:'Groove engine with sparkling jingle articulation.',
    notes:[
      'Bridges classical usul and folk dance meters.',
      'Expressive pitch bends with heel-pressure.'
    ]
  },
  {
    key:'daft', title:'Daf',
    family:'Large frame drum (ring jingles)',
    region:'Kurdish & Sufi traditions; now widespread',
    tuning:'Deep head with rings; thunderous low-end',
    technique:'Gallop strokes, ring swells, rotating roll techniques.',
    summary:'Trance-driving ceremonial power with swirling overtones.',
    notes:[
      'Central to Sama’/Zikr ceremonies.',
      'Stage-worthy dynamics for ensembles.'
    ]
  },
  {
    key:'tumbak', title:'Tombak (Tumbak)',
    family:'Goblet drum (solo percussion)',
    region:'National urban art music',
    tuning:'Single head; pitch-bends by palm/finger pressure',
    technique:'Riz (rolls), tek/ton strokes, snaps, collapsing rolls.',
    summary:'Virtuosic solo instrument; the heartbeat of contemporary ensembles.',
    notes:[
      'Rich solo repertoire since 20th century.',
      'Advanced techniques create melodic illusions.'
    ]
  },
  {
    key:'rubab', title:'Rubab',
    family:'Short-necked lute (plucked)',
    region:'Eastern Iran / Afghan borderlands',
    tuning:'C–G–c (sympathetic strings)',
    technique:'Plectrum strokes with drone sympathetics.',
    summary:'Woody attack with halo of resonant sympathetic strings.',
    notes:[
      'Bridges Persian and Afghan idioms.',
      'Great for modal ostinati with drones.'
    ]
  },
  {
    key:'balaban', title:'Balaban (Duduk family)',
    family:'Double-reed aerophone',
    region:'Azeri/Iranian northwest',
    tuning:'Soft, breathy timbre; chromatic via cross-fingering',
    technique:'Circular breathing common; microtonal slides.',
    summary:'Velvety, mournful reed voice ideal for lyrical themes.',
    notes:[
      'Pairs well with kamanche and tar.',
      'Strong expressive vibrato tradition.'
    ]
  },
  {
    key:'sorna', title:'Sorna',
    family:'Conical double-reed (shawm)',
    region:'Western & northern folk/ceremonial',
    tuning:'Piercing, festive; diatonic/mode-based',
    technique:'High-pressure reed; rapid ornaments.',
    summary:'Ceremonial powerhouse often paired with dohol.',
    notes:[
      'Outdoor celebrations and processions.',
      'Projects above large crowds.'
    ]
  },
  {
    key:'ney', title:'Ney',
    family:'End-blown reed flute',
    region:'Nationwide classical & Sufi practice',
    tuning:'Multiple sizes; mode-specific fingerings; ~2.5 octaves',
    technique:'Oblique embouchure at lip; breath-nois e as expressive tool.',
    summary:'Human-voice-like inflections, subtle and poetic.',
    notes:[
      'Signature timbre of Persian melancholy.',
      'Wide dynamic range with airy overblows.'
    ]
  },
  {
    key:'naqareh', title:'Naqareh',
    family:'Paired kettle drums',
    region:'Court/ritual & folk signals; north/east Iran',
    tuning:'Two pitches tuned apart; stick-played',
    technique:'Alternating stick rolls, military calls.',
    summary:'Signal and spectacle—antiphonal drum dialogues.',
    notes:[
      'Historic use on towers (Naqareh-khaneh).',
      'Great for rhythmic calls and responses.'
    ]
  },
  {
    key:'dozhale', title:'Dozhale',
    family:'Double-pipe reed (twin chanter)',
    region:'Kurdish & western Iran',
    tuning:'Parallel pipes for drone+melody',
    technique:'Continuous drone with agile melody pipe.',
    summary:'Twin-voice reedy shimmer; rustic and hypnotic.',
    notes:[
      'Complex breath control; circular breathing helpful.',
      'Pairs with daf/sorna in folk sets.'
    ]
  },
  {
    key:'karna', title:'Karna',
    family:'Natural long trumpet',
    region:'Central Asia & NE Iran festivals',
    tuning:'Natural harmonics (no valves)',
    technique:'Powerful lip-buzz tones; fanfare figures.',
    summary:'Monumental ceremonial trumpet for grand entries.',
    notes:[
      'Visual icon at weddings and processions.',
      'Best outdoors; extreme projection.'
    ]
  },
];

// ---------- Render cards ----------
const grid = document.getElementById('instrumentGrid');

const createCard = (it) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.tabIndex = 0;
  card.setAttribute('role','button');
  card.setAttribute('aria-label', it.title);

  const img = document.createElement('img');
  img.className = 'card__img';
  img.loading = 'lazy';
  img.alt = it.title;
  img.src = `../images/instruments/${it.key}-2.png`; // card image (-2)
  card.appendChild(img);

  const badge = document.createElement('div');
  badge.className = 'card__badge';
  badge.textContent = it.family.split('(')[0].trim();
  card.appendChild(badge);

  const title = document.createElement('div');
  title.className = 'card__title';
  title.textContent = it.title.toUpperCase();
  card.appendChild(title);

  // open modal on click / Enter
  const open = () => openModal(it);
  card.addEventListener('click', open);
  card.addEventListener('keydown', e => { if(e.key==='Enter' || e.key===' ') { e.preventDefault(); open(); } });

  return card;
};

INSTRUMENTS.forEach(it => grid.appendChild(createCard(it)));

// ---------- Modal logic ----------
const modal = document.getElementById('instrumentModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalSummary = document.getElementById('modalSummary');
const metaFamily = document.getElementById('metaFamily');
const metaRegion = document.getElementById('metaRegion');
const metaTuning = document.getElementById('metaTuning');
const metaTechnique = document.getElementById('metaTechnique');
const notesList = document.getElementById('modalNotes');

function openModal(item){
  modalImg.src = `../images/instruments/${item.key}-1.png`; // modal image (-1)
  modalImg.alt = item.title;
  modalTitle.textContent = item.title;
  modalSummary.textContent = item.summary;
  metaFamily.textContent = item.family;
  metaRegion.textContent = item.region;
  metaTuning.textContent = item.tuning;
  metaTechnique.textContent = item.technique;

  notesList.innerHTML = '';
  (item.notes||[]).forEach(n=>{
    const li = document.createElement('li');
    li.textContent = n;
    notesList.appendChild(li);
  });

  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  modalImg.src = '';
}

modal.addEventListener('click', (e)=>{
  if(e.target.hasAttribute('data-close-modal')) closeModal();
});
document.addEventListener('keydown', e=>{
  if(e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') closeModal();
});
document.querySelectorAll('[data-close-modal]').forEach(btn=>{
  btn.addEventListener('click', closeModal);
});
