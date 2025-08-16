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
   About Iran – کارت‌های ورودی + مودال دایره‌ای
   ================================================================== */
   (function(){
	let inited = false;
  
	const DATA = {
	  history: [
		{ id:"achaemenid",   title:"هخامنشیان",  range:"۵۵۰–۳۳۰ ق.م", short:"کوروش بزرگ و منشور حقوق بشر.", desc:"دولت هخامنشی با پایتخت‌هایی چون پاسارگاد و تخت‌جمشید، نخستین سامانه اداری گسترده را ایجاد کرد.", img:"images/history/achaemenid.jpg", angle:270 },
		{ id:"sassanid",     title:"ساسانیان",    range:"۲۲۴–۶۵۱ م",   short:"اوج هنر سنگ‌نگاره و طاق‌ها.",  desc:"ساسانیان با تیسفون و هنر فلزکاری/سنگ‌نگاره‌ها، رقیب روم شرقی بودند.", img:"images/history/sassanid.jpg",   angle:330 },
		{ id:"seljuk",       title:"سلجوقیان",    range:"قرن ۱۱–۱۲",   short:"گنبد، مقرنس، مدارس نظامیه.",    desc:"گسترش آموزش و معماری ایرانی–اسلامی.", img:"images/history/seljuk.jpg",     angle:30  },
		{ id:"safavid",      title:"صفویان",      range:"۱۵۰۱–۱۷۳۶",  short:"شکوه اصفهان و صنایع دستی.",     desc:"تثبیت هویت ایرانی–شیعی و رونق هنر.", img:"images/history/safavid.jpg",     angle:90  },
		{ id:"qajar",        title:"قاجار",        range:"۱۷۸۹–۱۹۲۵",  short:"مشروطه و ورود مدرنیته.",        desc:"انقلاب مشروطه و آغاز روزنامه‌نگاری.", img:"images/history/qajar.jpg",         angle:150 },
		{ id:"contemporary", title:"ایران معاصر", range:"سده ۲۰ تا امروز", short:"رشد علمی و سینمای نوین.", desc:"دانشگاه‌ها، فناوری نانو، صنعت و سینما.", img:"images/history/contemporary.jpg", angle:210 }
	  ],
	  culture: [
		{ id:"poetry",       title:"شعر فارسی",    range:"حافظ، سعدی، مولوی", short:"ادبیات و عرفان", img:"images/culture/poetry.jpg", angle:300, desc:"" },
		{ id:"architecture", title:"معماری",       range:"گنبد، مقرنس، بادگیر", short:"زیبایی‌شناسی ایرانی", img:"images/culture/architecture.jpg", angle:60, desc:"" },
		{ id:"nowruz",       title:"نوروز",        range:"۳۰۰۰ سال سنت", short:"جشن نوزایی", img:"images/culture/nowruz.jpg", angle:180, desc:"" }
	  ],
	  geography: [
		{ id:"caspian",      title:"دریای خزر",    range:"شمال ایران", short:"بزرگ‌ترین دریاچه جهان", img:"images/geo/caspian.jpg", angle:0, desc:"" },
		{ id:"persianGulf",  title:"خلیج فارس",    range:"جنوب ایران", short:"شاهراه انرژی", img:"images/geo/persiangulf.jpg", angle:120, desc:"" },
		{ id:"zagros",       title:"زاگرس",        range:"غرب ایران",  short:"کوهستان سترگ", img:"images/geo/zagros.jpg", angle:240, desc:"" }
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
  
	  /* کارت‌های صفحهٔ اول: کلیک → انتخاب موضوع + باز شدن مودال */
	  document.querySelectorAll('#about-iran .about-card').forEach(cardBtn=>{
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
		  topic==='history' ? 'تاریخ ایران' :
		  topic==='culture' ? 'فرهنگ ایران' : 'جغرافیای ایران'
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
  
	// وقتی مقاله باز شد، ماژول را مقداردهی کن
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

  /* ===== What is Iran Coin slider ===== */
  (function(){
        const mq = window.matchMedia('(max-width:736px)');
        if (!mq.matches) return;
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
  
