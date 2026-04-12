// ===== Search with Debounce =====

/** Initialize the search bar with debounced autocomplete */
function initSearch() {
  const input = $('#search-input');
  const results = $('#search-results');
  if (!input || !results) return;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = input.value.trim();
    if (q.length < 2) {
      results.classList.remove('active');
      results.innerHTML = '';
      return;
    }
    debounceTimer = setTimeout(() => searchAnime(q), 400);
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      results.classList.remove('active');
    }
  });
}

/** Perform anime/manga/character search via Jikan API */
async function searchAnime(query) {
  const results = $('#search-results');
  const searchType = $('#search-select')?.value || 'anime';
  
  results.innerHTML = '<div style="padding: 16px; text-align: center; color: var(--text-light); font-size: 13px;">Searching...</div>';
  results.classList.add('active');

  const data = await apiFetch(`${API_BASE}/${searchType}?q=${encodeURIComponent(query)}&limit=8&sfw=true`);
  if (!data || !data.data || data.data.length === 0) {
    results.innerHTML = '<div style="padding: 16px; text-align: center; color: var(--text-light); font-size: 13px;">No results found</div>';
    return;
  }

  results.innerHTML = data.data.map(item => `
    <div class="search-result-item" onclick="openAnimeModal(${item.mal_id}); document.getElementById('search-results').classList.remove('active');">
      <img class="search-result-img" src="${item.images?.jpg?.small_image_url || ''}" alt="${escHtml(item.title)}" loading="lazy">
      <div class="search-result-info">
        <div class="search-result-title">${escHtml(item.title)}</div>
        <div class="search-result-meta">${item.type || ''} · ${item.score ? '★ ' + item.score : ''} · ${item.episodes ? item.episodes + ' eps' : item.chapters ? item.chapters + ' chs' : 'Ongoing'}</div>
      </div>
    </div>
  `).join('');
}
