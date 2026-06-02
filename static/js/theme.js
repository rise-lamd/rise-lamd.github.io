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
  sync(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  btn.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync(next);
  });
})();
