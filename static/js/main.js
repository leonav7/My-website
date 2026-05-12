// ── navbar scroll + scroll-to-top button ──
const navbar        = document.getElementById('navbar');
const scrollTopBtn  = document.getElementById('scrollTop');
const progressRing  = document.getElementById('scrollProgress');
const circumference = 150.8; // 2 * π * 24

window.addEventListener('scroll', () => {
  const scrolled  = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  // navbar style
  navbar.classList.toggle('scrolled', scrolled > 40);

  // show button after 300px
  scrollTopBtn.classList.toggle('visible', scrolled > 300);

  // progress ring fills as user scrolls
  const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
  progressRing.style.strokeDashoffset = circumference - progress * circumference;
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── hamburger + mobile dropdown ──
const hamburger      = document.getElementById('hamburger');
const navLinks       = document.getElementById('navLinks');
const navDropdown    = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  if (!navLinks.classList.contains('open')) navDropdown.classList.remove('open');
});

dropdownToggle.addEventListener('click', e => {
  e.preventDefault();
  navDropdown.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (link === dropdownToggle) return;
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    navDropdown.classList.remove('open');
  });
});

// ── Other Services modal ──
const otherServicesLink  = document.getElementById('other-services-link');
const otherServicesModal = document.getElementById('otherServicesModal');
const closeModalBtn      = document.getElementById('closeOtherServices');

function openModal() {
  otherServicesModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  navDropdown.classList.remove('open');
}
function closeModal() {
  otherServicesModal.classList.remove('open');
  document.body.style.overflow = '';
}

otherServicesLink.addEventListener('click', e => { e.preventDefault(); openModal(); });
closeModalBtn.addEventListener('click', closeModal);
otherServicesModal.addEventListener('click', e => { if (e.target === otherServicesModal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── scroll reveal (replays every time element enters/leaves viewport) ──
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setDelay(el, seconds) {
  el.style.setProperty('--reveal-delay', `${seconds}s`);
}

if (!prefersReduced) {
  // section headers — cascade: eyebrow → title → subtitle → divider
  document.querySelectorAll('.section-header').forEach(header => {
    const eyebrow  = header.querySelector('.section-eyebrow');
    const title    = header.querySelector('.section-title');
    const subtitle = header.querySelector('.section-subtitle');
    const divider  = header.querySelector('.divider');
    if (eyebrow)  { eyebrow.classList.add('reveal');       setDelay(eyebrow,  0); }
    if (title)    { title.classList.add('reveal');         setDelay(title,    0.12); }
    if (subtitle) { subtitle.classList.add('reveal');      setDelay(subtitle, 0.22); }
    if (divider)  { divider.classList.add('reveal-scale'); setDelay(divider,  0.34); }
  });

  // service labels + cards (stagger in groups of 3)
  document.querySelectorAll('.services-category-label').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.service-card').forEach((el, i) => {
    el.classList.add('reveal');
    setDelay(el, (i % 3) * 0.09);
  });

  // sector pills — ripple across
  document.querySelectorAll('.sector-pill').forEach((el, i) => {
    el.classList.add('reveal');
    setDelay(el, i * 0.055);
  });

  // about — slide from sides
  document.querySelector('.about-image-wrap')?.classList.add('reveal-left');
  document.querySelector('.about-text')?.classList.add('reveal-right');
  document.querySelectorAll('.about-feature').forEach((el, i) => {
    el.classList.add('reveal');
    setDelay(el, i * 0.08);
  });

  // contact section
  document.querySelector('.contact-info')?.classList.add('reveal-left');
  document.querySelector('.contact-inner > div:last-child')?.classList.add('reveal-right');
  document.querySelectorAll('.contact-item').forEach((el, i) => {
    el.classList.add('reveal');
    setDelay(el, 0.1 + i * 0.12);
  });

  // single observer — adds/removes .visible on every scroll in/out
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        target.classList.add('visible');
      } else {
        target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'  // trigger 20px before bottom edge
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    .forEach(el => observer.observe(el));
}
