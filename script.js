// ============================================================
// NAVIGATION
// ============================================================
const nav = document.getElementById('main-nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open-icon');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--text-primary)'
      : '';
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));



// ============================================================
// PROJECT FILTER
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ============================================================
// STAT COUNTER ANIMATION
// ============================================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const pct = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - pct, 3);
    el.textContent = Math.round(eased * target) + (el.dataset.suffix || '');
    if (pct < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// ============================================================
// ORBS PARALLAX (subtle)
// ============================================================
document.addEventListener('mousemove', e => {
  const { clientX: x, clientY: y } = e;
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const dx = (x - cx) / cx, dy = (y - cy) / cy;
  document.querySelectorAll('.hero-bg-orb').forEach((orb, i) => {
    const factor = (i + 1) * 12;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});
