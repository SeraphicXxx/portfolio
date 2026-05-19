const nav        = document.getElementById('nav');
const navLinks   = document.getElementById('nav-links');
const navToggle  = document.getElementById('nav-toggle');
const navAnchors = navLinks.querySelectorAll('a');
let menuOpen = false;

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navLinks.classList.toggle('open', menuOpen);
  navToggle.setAttribute('aria-expanded', String(menuOpen));
});

navAnchors.forEach(a => {
  a.addEventListener('click', () => {
    menuOpen = false;
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});


const sections = document.querySelectorAll('section[id], div[id]');
const ioNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        const isActive = a.getAttribute('href') === '#' + entry.target.id;
        a.classList.toggle('active', isActive);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => ioNav.observe(s));

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
const ioReveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      ioReveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => ioReveal.observe(el));

function animateCounter(el, target, duration) {
  const start = performance.now();
  const update = now => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

let statsAnimated = false;
const statsSection = document.getElementById('stats');
const ioStats = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target, 1800);
      });
    }
  });
}, { threshold: 0.4 });

if (statsSection) ioStats.observe(statsSection);

/* ── SKILL BARS ── */
const ioSkills = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.classList.add('animated');
      });
      ioSkills.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => ioSkills.observe(cat));

const processSteps = document.querySelectorAll('.process-step');
processSteps.forEach(step => {
  step.addEventListener('click', () => {
    processSteps.forEach(s => s.classList.remove('active'));
    step.classList.add('active');
  });
  step.addEventListener('mouseenter', () => {
    processSteps.forEach(s => s.classList.remove('active'));
    step.classList.add('active');
  });
});

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-gold span');
    if (btn) {
      btn.textContent = 'Message Sent ✦';
      btn.closest('.btn-gold').style.background = 'var(--gold)';
      btn.closest('.btn-gold').style.color = 'var(--warm-white)';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.closest('.btn-gold').style.background = '';
        btn.closest('.btn-gold').style.color = '';
        form.reset();
      }, 3000);
    }
  });
}