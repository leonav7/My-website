// ── navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

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

// ── smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── scroll reveal ──
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  // section headers — staggered cascade
  document.querySelectorAll('.section-header').forEach(header => {
    const eyebrow  = header.querySelector('.section-eyebrow');
    const title    = header.querySelector('.section-title');
    const subtitle = header.querySelector('.section-subtitle');
    const divider  = header.querySelector('.divider');
    if (eyebrow)  { eyebrow.classList.add('reveal');       eyebrow.style.transitionDelay  = '0s'; }
    if (title)    { title.classList.add('reveal');         title.style.transitionDelay    = '0.12s'; }
    if (subtitle) { subtitle.classList.add('reveal');      subtitle.style.transitionDelay = '0.22s'; }
    if (divider)  { divider.classList.add('reveal-scale'); divider.style.transitionDelay  = '0.34s'; }
  });

  // service labels + cards
  document.querySelectorAll('.services-category-label').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.service-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 3) * 0.08}s`;
  });

  // sector pills — cascade left to right
  document.querySelectorAll('.sector-pill').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.06}s`;
  });

  // about section — slide in from sides
  document.querySelector('.about-image-wrap')?.classList.add('reveal-left');
  document.querySelector('.about-text')?.classList.add('reveal-right');
  document.querySelectorAll('.about-feature').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
  });

  // contact section
  document.querySelector('.contact-info')?.classList.add('reveal-left');
  document.querySelector('.contact-inner > div:last-child')?.classList.add('reveal-right');
  document.querySelectorAll('.contact-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${0.1 + i * 0.12}s`;
  });

  // one observer for all reveal types
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        target.classList.add('visible');
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    .forEach(el => observer.observe(el));
}
