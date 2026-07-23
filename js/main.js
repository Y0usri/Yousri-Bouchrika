(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Theme toggle (dark by default). The initial attribute is already set
     by an inline script in <head> to avoid a flash of the wrong theme;
     this just wires up the button and persists the choice. */
  var THEME_KEY = 'yb-theme';
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');

  function syncThemeToggle(theme) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre');
  }

  syncThemeToggle(root.getAttribute('data-theme'));

  themeToggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    syncThemeToggle(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  });

  /* Sticky header: add shadow once the page is scrolled */
  var header = document.getElementById('site-header');
  function updateHeaderState() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* Mobile navigation toggle */
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('primary-nav');

  function closeNav() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  /* Scroll reveal, skipped entirely if the user prefers reduced motion */
  var revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* Replace a project screenshot with a neutral placeholder if the file
     has not been added yet, instead of showing a broken image icon. */
  document.querySelectorAll('.project-gallery img').forEach(function (img) {
    img.addEventListener('error', function () {
      var placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.textContent = 'Capture à ajouter';
      img.replaceWith(placeholder);
    });
  });

  /* Copy the contact e-mail address, since mailto: links do nothing on
     machines with no default mail client configured. Uses execCommand
     (synchronous, no permission prompt) rather than the async Clipboard
     API, which can hang waiting on a permission decision in some browsers. */
  var copyEmailBtn = document.getElementById('copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function () {
      var email = copyEmailBtn.getAttribute('data-email');
      var defaultLabel = copyEmailBtn.getAttribute('data-default-label');
      var textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      var copied = false;
      try {
        copied = document.execCommand('copy');
      } catch (e) {
        copied = false;
      }
      document.body.removeChild(textarea);

      copyEmailBtn.textContent = copied ? 'Adresse copiée' : 'Copie impossible';
      setTimeout(function () {
        copyEmailBtn.textContent = defaultLabel;
      }, 2000);
    });
  }

  /* Contact form: submit via fetch so the visitor stays on the page and
     sees an inline success/error message instead of being redirected. */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var formStatus = document.getElementById('form-status');
    var formDefaultNote = formStatus.textContent;
    var submitBtn = contactForm.querySelector('button[type="submit"]');
    var submitDefaultLabel = submitBtn.textContent;

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours…';
      formStatus.textContent = formDefaultNote;
      formStatus.classList.remove('form-status-success', 'form-status-error');

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            formStatus.textContent = 'Message envoyé, merci ! Je réponds dès que possible.';
            formStatus.classList.add('form-status-success');
            contactForm.reset();
          } else {
            throw new Error('request failed');
          }
        })
        .catch(function () {
          formStatus.textContent = "L'envoi a échoué. Utilise le bouton \"Copier l'adresse e-mail\" ci-dessous en attendant.";
          formStatus.classList.add('form-status-error');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = submitDefaultLabel;
        });
    });
  }
})();
