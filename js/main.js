(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
})();
