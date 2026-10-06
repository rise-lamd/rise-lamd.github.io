// Theme toggle — dark/light. No-flash setter lives inline in <head>.
// Persists ONLY on explicit user choice, so return visits keep following
// the system preference unless the user has actively picked a theme.
(function () {
  var btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  function sync(t) {
    btn.setAttribute('aria-pressed', String(t === 'dark'));
    btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  sync(document.documentElement.dataset.theme || 'light');
  btn.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync(next);
  });
})();

// Mobile nav: collapsible disclosure menu
(function () {
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    if (open) { nav.setAttribute('data-open', ''); }
    else { nav.removeAttribute('data-open'); }
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close after following a link
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // Close on Escape, return focus to the toggle
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset state when resizing up to the desktop layout
  window.addEventListener('resize', function () {
    if (window.innerWidth > 720) setOpen(false);
  }, { passive: true });
})();

// Language picker: close on outside click / Escape (the <details> itself
// handles toggle + keyboard natively, so this only adds light dismissal)
(function () {
  var picker = document.querySelector('details.lang-switch');
  if (!picker) return;
  document.addEventListener('click', function (e) {
    if (picker.open && !picker.contains(e.target)) picker.open = false;
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && picker.open) {
      picker.open = false;
      var s = picker.querySelector('summary');
      if (s) s.focus();
    }
  });
})();

// Scroll-reveal via IntersectionObserver
(function () {
  if (!('IntersectionObserver' in window)) return;

  // Groups whose children should stagger-reveal on scroll
  var groupMap = [
    { parent: '.people-grid',       child: '.person'    },
    { parent: '.pub-year-section',  child: '.pub-item'  },
    { parent: '.projects-group',    child: '.project'   },
    { parent: '.news',              child: '.news-item' }
  ];

  var allItems = [];

  groupMap.forEach(function (g) {
    document.querySelectorAll(g.parent).forEach(function (group) {
      var items = group.querySelectorAll(g.child);
      items.forEach(function (el, i) {
        el.setAttribute('data-reveal-ready', '');
        el.style.setProperty('--stagger', i);
        allItems.push(el);
      });
    });
  });

  if (!allItems.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -48px 0px', threshold: 0.08 });

  allItems.forEach(function (el) { observer.observe(el); });
})();

// Scroll progress bar micro-interaction
(function () {
  var progress = document.querySelector('.scroll-progress');
  if (!progress) return;
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progress.style.width = (height > 0 ? (winScroll / height) * 100 : 0) + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

