// ===== Render Functions =====

function renderSeasonal() {
  const container = $('#seasonal-list');
  if (!container) return;

  container.innerHTML = state.seasonal.map(anime => `
    <li class="anime-item">
      <img src="${anime.images?.jpg?.image_url || ''}" alt="${escHtml(anime.title)}" loading="lazy">
      <div>
        <h3><a href="#" onclick="openAnimeModal(${anime.mal_id}); return false;">${escHtml(anime.title)}</a></h3>
        <p>Score: ${anime.score || 'N/A'}</p>
      </div>
    </li>
  `).join('');
}

function renderTopAnime() {
  const container = $('#top-anime-list');
  if (!container) return;

  container.innerHTML = state.topAnime.slice(0, 15).map((anime, i) => `
    <li class="anime-item">
      <strong>#${i + 1}</strong>
      <img src="${anime.images?.jpg?.image_url || ''}" alt="${escHtml(anime.title)}" loading="lazy">
      <div>
        <h3><a href="#" onclick="openAnimeModal(${anime.mal_id}); return false;">${escHtml(anime.title)}</a></h3>
        <p>${anime.type || 'N/A'} - ${anime.episodes ? anime.episodes + ' eps' : 'Ongoing'} - ${formatMembers(anime.members)} members</p>
        <p><strong>Score:</strong> ${anime.score ? anime.score.toFixed(2) : 'N/A'}</p>
      </div>
    </li>
  `).join('');
}

function renderSidebarList(containerId, items, showMembers = false) {
  const container = $(`#${containerId}`);
  if (!container) return;

  container.innerHTML = items.map((anime, i) => `
    <li class="anime-item">
      <strong>#${i + 1}</strong>
      <img src="${anime.images?.jpg?.small_image_url || ''}" alt="${escHtml(anime.title)}" loading="lazy">
      <div>
        <h4><a href="#" onclick="openAnimeModal(${anime.mal_id}); return false;">${escHtml(anime.title)}</a></h4>
        <p>${anime.type || ''} ${anime.episodes ? '(' + anime.episodes + ' eps)' : ''} ${showMembers ? ' - ' + formatMembers(anime.members) : ''}</p>
        <p>Score: ${anime.score || 'N/A'}</p>
      </div>
    </li>
  `).join('');
}

function renderReviews() {
  const container = $('#reviews-list');
  if (!container) return;

  container.innerHTML = state.reviews.map(review => {
    const anime = review.entry || {};
    return `
      <li class="anime-item">
        <img src="${anime.images?.jpg?.image_url || ''}" alt="${escHtml(anime.title || '')}" loading="lazy">
        <div>
          <h3><a href="#" onclick="openAnimeModal(${anime.mal_id}); return false;">${escHtml(anime.title || 'Unknown')}</a></h3>
          <p>Score: ${review.score || 'N/A'} - By ${escHtml(review.user?.username || 'Anonymous')}</p>
          <p>${escHtml((review.review || '').substring(0, 250))}...</p>
        </div>
      </li>
    `;
  }).join('');
}

// We removed trailers layout since we are heavily stripping the app. Instead of deleting the call in state.js 
// which still calls renderTrailers(), we define it empty.
function renderTrailers() {}
