// ===== Shared HTML Components =====

function getNavItems() {
  return [
    { label: 'Anime Search', href: 'index.html' },
    { label: 'Top Anime', href: 'top-anime.html' },
    { label: 'Seasonal Anime', href: 'seasonal.html' },
    { label: 'Reviews', href: 'reviews.html' }
  ];
}

function renderHeader() {
  const container = document.getElementById('site-header');
  if (!container) return;

  const navLinks = getNavItems().map(item => {
    return `<li><a href="${item.href}">${item.label}</a></li>`;
  }).join('');

  container.outerHTML = `
  <header id="header">
    <h1>CrunchyList</h1>
    <nav>
      <ul>${navLinks}</ul>
    </nav>
    <div class="search-container">
      <select id="search-select">
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
        <option value="characters">Characters</option>
      </select>
      <input id="search-input" type="text" placeholder="Search...">
      <div id="search-results"></div>
    </div>
  </header>`;
}

function renderFooter() {
  const container = document.getElementById('site-footer');
  if (!container) return;

  container.outerHTML = `
  <footer id="footer">
    <hr>
    <p>© 2026 CrunchyList. Powered by Jikan API.</p>
  </footer>`;
}

// Auto-inject on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
});
