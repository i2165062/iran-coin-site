/* Main JS - Dimension (fixed) + About Iran + NFT scroll lock */
/* Requires: jQuery, breakpoints.js, browser.js  */

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');
  
	// Breakpoints.
	breakpoints({
	  xlarge: ['1281px', '1680px'],
	  large:  ['981px',  '1280px'],
	  medium: ['737px',  '980px' ],
	  small:  ['481px',  '736px' ],
	  xsmall: ['361px',  '480px' ],
	  xxsmall:[null,     '360px' ]
	});
  
	// Play initial animations on page load.
	$window.on('load', function() {
	  window.setTimeout(function() {
		$body.removeClass('is-preload');
	  }, 100);
	});
  
	// Fix: Flexbox min-height bug on IE.
	if (browser.name == 'ie') {
	  var flexboxFixTimeoutId;
	  $window.on('resize.flexbox-fix', function() {
		clearTimeout(flexboxFixTimeoutId);
		flexboxFixTimeoutId = setTimeout(function() {
		  if ($wrapper.prop('scrollHeight') > $window.height())
			$wrapper.css('height', 'auto');
		  else
			$wrapper.css('height', '100vh');
		}, 250);
	  }).triggerHandler('resize.flexbox-fix');
	}
  
	// Nav.
	var $nav = $header.children('nav'),
		$nav_li = $nav.find('li');
  
	if ($nav_li.length % 2 == 0) {
	  $nav.addClass('use-middle');
	  $nav_li.eq(($nav_li.length / 2)).addClass('is-middle');
	}
  
	// Main.
	var delay = 325,
		locked = false;
  
	// Methods.
	$main._show = function(id, initial) {
  
	  var $article = $main_articles.filter('#' + id);
	  if ($article.length == 0) return;
  
	  // NFT fullscreen: lock scroll only when NFT article with .nft-fixed becomes active
	  var lockScrollIfNFT = function() {
		if ($article.is('#NFT') && $article.hasClass('nft-fixed')) {
		  $('html,body').addClass('lock-scroll');
		} else {
		  $('html,body').removeClass('lock-scroll');
		}
	  };
  
	  if (locked || (typeof initial != 'undefined' && initial === true)) {
  
		$body.addClass('is-switching');
		$body.addClass('is-article-visible');
		$main_articles.removeClass('active');
  
		$header.hide();
		$footer.hide();
  
		$main.show();
		$article.show();
  
		$article.addClass('active');
		lockScrollIfNFT();
  
		locked = false;
  
		setTimeout(function() {
		  $body.removeClass('is-switching');
		}, (initial ? 1000 : 0));
  
		$window.scrollTop(0).triggerHandler('resize.flexbox-fix');
		return;
	  }
  
	  locked = true;
  
	  if ($body.hasClass('is-article-visible')) {
  
		var $currentArticle = $main_articles.filter('.active');
		$currentArticle.removeClass('active');
  
		setTimeout(function() {
  
		  $currentArticle.hide();
		  $article.show();
  
		  setTimeout(function() {
  
			$article.addClass('active');
			lockScrollIfNFT();
  
			$window.scrollTop(0).triggerHandler('resize.flexbox-fix');
  
			setTimeout(function() { locked = false; }, delay);
  
		  }, 25);
  
		}, delay);
  
	  } else {
  
		$body.addClass('is-article-visible');
  
		setTimeout(function() {
  
		  $header.hide();
		  $footer.hide();
  
		  $main.show();
		  $article.show();
  
		  setTimeout(function() {
  
			$article.addClass('active');
			lockScrollIfNFT();
  
			$window.scrollTop(0).triggerHandler('resize.flexbox-fix');
  
			setTimeout(function() { locked = false; }, delay);
  
		  }, 25);
  
		}, delay);
  
	  }
	};
  
	$main._hide = function(addState) {
  
	  var $article = $main_articles.filter('.active');
  
	  if (!$body.hasClass('is-article-visible')) return;
  
	  if (typeof addState != 'undefined' && addState === true)
		history.pushState(null, null, '#');
  
	  if (locked) {
  
		$body.addClass('is-switching');
  
		$article.removeClass('active');
		$article.hide();
		$main.hide();
  
		$footer.show();
		$header.show();
  
		$body.removeClass('is-article-visible');
		$('html,body').removeClass('lock-scroll'); // always release lock
  
		locked = false;
		$body.removeClass('is-switching');
  
		$window.scrollTop(0).triggerHandler('resize.flexbox-fix');
		return;
	  }
  
	  locked = true;
  
	  $article.removeClass('active');
  
	  setTimeout(function() {
  
		$article.hide();
		$main.hide();
  
		$footer.show();
		$header.show();
  
		setTimeout(function() {
  
		  $body.removeClass('is-article-visible');
		  $('html,body').removeClass('lock-scroll');
  
		  $window.scrollTop(0).triggerHandler('resize.flexbox-fix');
  
		  setTimeout(function() { locked = false; }, delay);
  
		}, 25);
  
	  }, delay);
	};
  
	// Articles.
	$main_articles.each(function() {
	  var $this = $(this);
  
	  // Only add close for normal articles; we'll hide it for #about-iran in CSS
	  $('<div class="close">Close</div>')
		.appendTo($this)
		.on('click', function() {
		  location.hash = '';
		});
  
	  $this.on('click', function(event) {
		event.stopPropagation();
	  });
	});
  
	// Events.
	$body.on('click', function(event) {
	  if ($body.hasClass('is-article-visible'))
		$main._hide(true);
	});
  
	$window.on('keyup', function(event) {
	  switch (event.keyCode) {
		case 27:
		  if ($body.hasClass('is-article-visible'))
			$main._hide(true);
		  break;
		default: break;
	  }
	});
  
	$window.on('hashchange', function(event) {
	  if (location.hash == '' || location.hash == '#') {
		event.preventDefault();
		event.stopPropagation();
		$main._hide();
	  }
	  else if ($main_articles.filter(location.hash).length > 0) {
		event.preventDefault();
		event.stopPropagation();
		$main._show(location.hash.substr(1));
	  }
	});
  
	// Scroll restoration.
	if ('scrollRestoration' in history)
	  history.scrollRestoration = 'manual';
	else {
	  var oldScrollPos = 0,
		  scrollPos = 0,
		  $htmlbody = $('html,body');
  
	  $window
		.on('scroll', function() {
		  oldScrollPos = scrollPos;
		  scrollPos = $htmlbody.scrollTop();
		})
		.on('hashchange', function() {
		  $window.scrollTop(oldScrollPos);
		});
	}
  
	// Initialize.
	$main.hide();
	$main_articles.hide();
  
	if (location.hash != '' && location.hash != '#')
	  $window.on('load', function() { $main._show(location.hash.substr(1), true); });
  
/* ==================================================================
   About Iran – entry cards and circular modal
   ================================================================== */
   (function(){
	let inited = false;
  
	const DATA = {
          history: [
                { id:"achaemenid",   title:"Achaemenid",   range:"550–330 BC", short:"Cyrus the Great and the Charter of Human Rights.", desc:"The Achaemenid Empire with capitals like Pasargadae and Persepolis created the first extensive administrative system.", img:"images/history/achaemenid.jpg", angle:270 },
                { id:"sassanid",     title:"Sassanid",     range:"224–651 AD", short:"Peak of stone reliefs and arches.", desc:"The Sassanids with Ctesiphon and metalwork/reliefs rivaled the Eastern Roman Empire.", img:"images/history/sassanid.jpg", angle:330 },
                { id:"seljuk",       title:"Seljuk",       range:"11th–12th century", short:"Domes, muqarnas, Nizamiyya schools.", desc:"Expansion of education and Persian–Islamic architecture.", img:"images/history/seljuk.jpg", angle:30 },
                { id:"safavid",      title:"Safavid",      range:"1501–1736", short:"Splendor of Isfahan and handicrafts.", desc:"Establishing Iranian–Shiite identity and flourishing art.", img:"images/history/safavid.jpg", angle:90 },
                { id:"qajar",        title:"Qajar",        range:"1789–1925", short:"Constitution and arrival of modernity.", desc:"The Constitutional Revolution and the start of journalism.", img:"images/history/qajar.jpg", angle:150 },
                { id:"contemporary", title:"Contemporary Iran", range:"20th century to today", short:"Scientific growth and new cinema.", desc:"Universities, nanotechnology, industry and cinema.", img:"images/history/contemporary.jpg", angle:210 }
          ],
          culture: [
                { id:"poetry",       title:"Persian Poetry", range:"Hafez, Saadi, Rumi", short:"Literature and mysticism", img:"images/culture/poetry.jpg", angle:300, desc:"" },
                { id:"architecture", title:"Architecture",   range:"Dome, muqarnas, windcatcher", short:"Iranian aesthetics", img:"images/culture/architecture.jpg", angle:60, desc:"" },
                { id:"nowruz",       title:"Nowruz",        range:"3000 years of tradition", short:"Festival of renewal", img:"images/culture/nowruz.jpg", angle:180, desc:"" }
          ],
          geography: [
                { id:"caspian",      title:"Caspian Sea",    range:"Northern Iran", short:"World's largest lake", img:"images/geo/caspian.jpg", angle:0, desc:"" },
                { id:"persianGulf",  title:"Persian Gulf",   range:"Southern Iran", short:"Energy corridor", img:"images/geo/persiangulf.jpg", angle:120, desc:"" },
                { id:"zagros",       title:"Zagros",         range:"Western Iran", short:"Majestic mountain range", img:"images/geo/zagros.jpg", angle:240, desc:"" }
          ]
        };
  
	function initAboutIran(){
	  if (inited) return;
  
	  const modal   = document.getElementById('irModal');
	  const dialog  = modal?.querySelector('.ir-modal__dialog');
	  const circle  = document.getElementById('circle');
	  const tooltip = document.getElementById('circleTooltip');
	  const centerEra = document.getElementById('centerEra');
	  const card    = document.getElementById('eraCard');
	  const eraImg  = document.getElementById('eraImg');
	  const eraTitle= document.getElementById('eraTitle');
	  const eraRange= document.getElementById('eraRange');
	  const eraDesc = document.getElementById('eraDesc');
	  const prevBtn = document.getElementById('prevEra');
	  const nextBtn = document.getElementById('nextEra');
	  const mobileStrip = document.getElementById('mobileStrip');
	  const closeBackdrop = document.getElementById('closeCircle');
	  const closeBtn      = document.getElementById('closeCircleBtn');
  
	  if (!modal || !circle) return;
  
	  let topic = 'history';
	  let items = DATA[topic];
	  let currentIndex = 0;
  
          /* Landing cards: click to choose topic and open modal */
	  document.querySelectorAll('#about-iran .about-iran-card').forEach(cardBtn=>{
		cardBtn.addEventListener('click', ()=>{
		  topic = cardBtn.dataset.topic;
		  items = DATA[topic];
		  modal.setAttribute('aria-hidden','false');
		  requestAnimationFrame(()=>{ buildCircle(); buildMobileStrip(); });
		});
	  });
  
	  function closeModal(){ modal.setAttribute('aria-hidden','true'); }
	  closeBackdrop?.addEventListener('click', closeModal);
	  closeBtn?.addEventListener('click', closeModal);
  
	  function buildCircle(){
		circle.innerHTML = '';
                centerEra && (centerEra.textContent =
                  topic==='history' ? 'Iran History' :
                  topic==='culture' ? 'Iran Culture' : 'Iran Geography'
                );
  
		const rect = circle.getBoundingClientRect();
		const r = (rect.width/2)||200;
  
		items.forEach((item, idx)=>{
		  const n = document.createElement('button');
		  n.className = 'node'; n.type = 'button';
  
		  const a = (item.angle ?? (idx*(360/items.length))) * Math.PI/180;
		  const cx = r + (r-20)*Math.cos(a);
		  const cy = r + (r-20)*Math.sin(a);
		  n.style.left = `${cx}px`; n.style.top = `${cy}px`;
  
		  n.addEventListener('mouseenter', (e)=>{
			tooltip?.classList.add('show');
			if (tooltip) tooltip.textContent = `${item.title} — ${item.range} · ${item.short||''}`;
			positionTooltip(e);
		  });
		  n.addEventListener('mousemove', positionTooltip);
		  n.addEventListener('mouseleave', ()=> tooltip?.classList.remove('show'));
		  n.addEventListener('click', ()=>{ currentIndex = idx; showCard(items[currentIndex]); });
  
		  circle.appendChild(n);
		});
  
		card?.classList.add('hidden');
	  }
  
	  function positionTooltip(e){
		if (!tooltip || !dialog) return;
		const pad = 12;
		const w = tooltip.offsetWidth  || 280;
		const h = tooltip.offsetHeight || 64;
		const r = dialog.getBoundingClientRect();
		let x = e.clientX - r.left + pad;
		let y = e.clientY - r.top  + pad;
		x = Math.min(Math.max(pad, x), r.width  - w - pad);
		y = Math.min(Math.max(pad, y), r.height - h - pad);
		tooltip.style.left = x + 'px';
		tooltip.style.top  = y + 'px';
	  }
  
	  function showCard(item){
		if (!card) return;
		if (eraImg){ eraImg.src = item.img; eraImg.alt = item.title; }
		if (eraTitle) eraTitle.textContent = item.title;
		if (eraRange) eraRange.textContent = item.range;
		if (eraDesc)  eraDesc.textContent  = item.desc || '';
		card.classList.remove('hidden');
	  }
  
	  prevBtn?.addEventListener('click', ()=>{ currentIndex = (currentIndex - 1 + items.length) % items.length; showCard(items[currentIndex]); });
	  nextBtn?.addEventListener('click', ()=>{ currentIndex = (currentIndex + 1) % items.length; showCard(items[currentIndex]); });
  
	  function buildMobileStrip(){
		if (!mobileStrip) return;
		mobileStrip.innerHTML = '';
		items.forEach((item, idx)=>{
		  const pill = document.createElement('button');
		  pill.className = 'pill'; pill.type = 'button';
		  pill.textContent = `${item.title} • ${item.range}`;
		  pill.addEventListener('click', ()=>{ currentIndex = idx; showCard(items[currentIndex]); });
		  mobileStrip.appendChild(pill);
		});
	  }
  
	  inited = true;
	}
  
  // Initialize module when article becomes visible
	window.addEventListener('hashchange', ()=>{ if (location.hash==='#about-iran') setTimeout(initAboutIran,100); });
	window.addEventListener('load', ()=>{ if (location.hash==='#about-iran') setTimeout(initAboutIran,100); });
  })();
  
  /* ===== Buy page tabs ===== */
   (function(){
        function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
        const tabs = qsa('.buy-tab');
        if (!tabs.length) return;
  
              tabs.forEach(btn=>{
          btn.addEventListener('click', ()=>{
                // active tab
                tabs.forEach(b=>b.classList.remove('active'));
                btn.classList.add('active');
			  
		// panes
		const paneSel = btn.getAttribute('data-pane');
		const pane = document.querySelector(paneSel);
		const allPanes = qsa('.buy-pane');
		allPanes.forEach(p=>{
		  if (p === pane){
			p.hidden = false;
			p.classList.add('active');
		  } else {
			p.hidden = true;
			p.classList.remove('active');
		  }
                });
          });
        });
  })();

  /* ===== About Iran cards slider ===== */
  (function(){
        const container = document.querySelector('#about-iran .about-iran-cards');
        const dots = document.querySelectorAll('#about-iran .about-iran-dots .dot');
        if (!container || dots.length === 0) return;

        const getMetrics = () => {
                const card = container.querySelector('.about-iran-card');
                const gap = parseInt(getComputedStyle(container).gap) || 0;
                const width = card ? card.offsetWidth : 0;
                return { cardWidth: width, gap };
        };

        const updateDots = () => {
                const { cardWidth, gap } = getMetrics();
                const idx = Math.round(container.scrollLeft / (cardWidth + gap));
                dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        };

        const scrollToIndex = (i) => {
                const { cardWidth, gap } = getMetrics();
                container.scrollTo({ left: i * (cardWidth + gap), behavior: 'smooth' });
        };

        container.addEventListener('scroll', updateDots);
        dots.forEach((dot, i) => dot.addEventListener('click', () => scrollToIndex(i)));
        window.addEventListener('load', updateDots);
  })();

  /* ===== What is Iran Coin slider ===== */
  (function(){
        const slider = document.querySelector('#What-is-iran-coin .wii-slider');
        if (!slider) return;
        const cards = slider.querySelectorAll('.wii-card');
        const setHeight = () => {
                if (window.innerWidth <= 736) {
                        const h = Math.round(window.innerHeight * 0.85);
                        slider.style.height = h + 'px';
                        cards.forEach(c => c.style.height = '100%');
                } else {
                        slider.style.height = '';
                        cards.forEach(c => c.style.height = '');
                }
        };
        window.addEventListener('load', setHeight);
        window.addEventListener('resize', setHeight);
  })();

  })(jQuery);
  
