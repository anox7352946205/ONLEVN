/* ============================================================
   ONLEVN — Built by Discipline.
   Landing Page JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Logo black background is handled in CSS:
  // The navbar uses background:#000000 which perfectly matches
  // the logo PNG's own black background — making the box invisible.


  // ──────────────────────────────────────────────────────────
  // PAGE LOADER
  // ──────────────────────────────────────────────────────────
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1400);
  });


  // ──────────────────────────────────────────────────────────
  // NAVBAR SCROLL
  // ──────────────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 60);
  }, { passive: true });


  // ──────────────────────────────────────────────────────────
  // MOBILE NAV TOGGLE
  // ──────────────────────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const navOverlay= document.getElementById('navOverlay');

  const closeMobileNav = () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('active');
    navLinks.classList.toggle('active', isOpen);
    navOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navOverlay.addEventListener('click', closeMobileNav);
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMobileNav));


  // ──────────────────────────────────────────────────────────
  // SMOOTH SCROLL
  // ──────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ──────────────────────────────────────────────────────────
  // SCROLL REVEAL (Intersection Observer)
  // ──────────────────────────────────────────────────────────
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-scale')
    .forEach(el => revealObs.observe(el));


  // ──────────────────────────────────────────────────────────
  // FAQ ACCORDION
  // ──────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });


  // ──────────────────────────────────────────────────────────
  // CURSOR GLOW (Desktop only)
  // ──────────────────────────────────────────────────────────
  const cursorGlow = document.getElementById('cursorGlow');
  if (window.innerWidth > 768 && cursorGlow) {
    document.addEventListener('mousemove', e => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }


  // ──────────────────────────────────────────────────────────
  // SUBTLE PARALLAX ON HERO PHONE
  // ──────────────────────────────────────────────────────────
  const heroPhoneWrap = document.querySelector('.hero-phone-wrap');
  if (window.innerWidth > 900 && heroPhoneWrap) {
    window.addEventListener('scroll', () => {
      const y = window.pageYOffset;
      if (y < window.innerHeight) {
        heroPhoneWrap.style.transform = `translateY(${y * 0.12}px)`;
      }
    }, { passive: true });
  }


  // ──────────────────────────────────────────────────────────
  // ACTIVE NAV LINK HIGHLIGHT
  // ──────────────────────────────────────────────────────────
  const sectionEls = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  const navHighlightObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(link => {
          const active = link.getAttribute('href') === `#${id}`;
          link.style.color = active ? '#A6FF00' : '';
        });
      }
    });
  }, { threshold: 0.35 });

  sectionEls.forEach(s => navHighlightObs.observe(s));


  // ──────────────────────────────────────────────────────────
  // CARD TILT (Desktop)
  // ──────────────────────────────────────────────────────────
  if (window.innerWidth > 1024) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r   = card.getBoundingClientRect();
        const rx  = ((e.clientY - r.top)  / r.height - 0.5) * -5;
        const ry  = ((e.clientX - r.left) / r.width  - 0.5) *  5;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }


  console.log('%c🦏 ONLEVN — Built by Discipline.', 'color:#A6FF00;font-size:15px;font-weight:bold;background:#0D0D0D;padding:8px 12px;');

});
