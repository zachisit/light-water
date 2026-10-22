// Light Water - shared site behaviour: nav shadow, mobile menu, scroll reveals,
// and horizontal scrolling for wide article tables on small screens.
(() => {
  const nav = document.getElementById('nav');
  if (nav) {
    const toggle = nav.querySelector('.nav-toggle');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
    if (toggle) {
      const setMenu = open => {
        nav.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
      };
      toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
      nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
      document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    }
  }

  document.querySelectorAll('.article-body table').forEach(table => {
    if (table.parentElement.classList.contains('table-scroll')) return;
    const wrap = document.createElement('div');
    wrap.className = 'table-scroll';
    table.replaceWith(wrap);
    wrap.appendChild(table);
  });

  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
})();
