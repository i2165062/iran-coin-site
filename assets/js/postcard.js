document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type') || '';

  const titles = {
    'art-handicraft': 'هنر های دستی',
    'art-architecture': 'هنر های معماری',
    'art-celebs': 'مشاهیر و کتاب ها',
    'history-modern': 'تاریخ معاصر',
    'history-after': 'تاریخ بعد میلاد',
    'history-before': 'تاریخ قبل میلاد',
    'culture-people': 'فرهنگ مردم',
    'culture-good': 'گفتارنیک کردار نیک',
    'culture-customs': 'اداب و رسوم'
  };

  const title = titles[type] || 'Iran';
  document.getElementById('postcardTitle').textContent = title;

  const items = Array.from({ length: 100 }, (_, i) => ({
    img: `images/pic0${(i % 3) + 1}.jpg`,
    text: `${title} - مورد ${i + 1}`
  }));

  let index = 0;
  const imgEl = document.getElementById('cardImage');
  const textEl = document.getElementById('cardText');

  function render() {
    const item = items[index];
    imgEl.src = item.img;
    textEl.textContent = item.text;
  }

  document.querySelector('.carousel-nav.prev').addEventListener('click', function () {
    index = (index - 1 + items.length) % items.length;
    render();
  });

  document.querySelector('.carousel-nav.next').addEventListener('click', function () {
    index = (index + 1) % items.length;
    render();
  });

  render();
});

