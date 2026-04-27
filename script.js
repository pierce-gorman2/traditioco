/* ============================================================
   TRADITIO SHARED JAVASCRIPT
   TraditioCo.com
   ============================================================ */

(function () {
  'use strict';

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || link.classList.contains('nav-apply') || link.classList.contains('nav-secondary')) {
      return;
    }

    const linkPage = href.split('/').pop();
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });

  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener(
      'scroll',
      function () {
        header.style.boxShadow = window.scrollY > 20 ? '0 10px 30px rgba(20,22,24,0.08)' : 'none';
      },
      { passive: true }
    );
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      const success = document.getElementById('form-success');
      const original = btn.textContent;

      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#c95644';
          valid = false;
        }
      });

      if (!valid) {
        btn.textContent = 'Please fill in all required fields';
        setTimeout(function () {
          btn.textContent = original;
        }, 2500);
        return;
      }

      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        form.style.display = 'none';
        if (success) {
          success.classList.add('show');
        }
      }, 1200);
    });
  }
})();
