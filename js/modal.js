// ===== Anime Detail Modal (Native dialog) =====

function initModal() {
  const modal = $('#modal');
  if (!modal) return;

  // Close when clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

async function openAnimeModal(malId) {
  const modal = $('#modal');
  if (!modal) return;

  // Show loading state
  modal.innerHTML = '<p>Loading anime details...</p><button onclick="closeModal()">Close</button>';
  modal.showModal();

  const data = await apiFetch(`${API_BASE}/anime/${malId}/full`);
  if (!data || !data.data) {
    modal.innerHTML = '<p>Failed to load. Try again.</p><button onclick="closeModal()">Close</button>';
    return;
  }

  const anime = data.data;
  modal.innerHTML = `
    <article>
      <h2>${escHtml(anime.title)}</h2>
      <img src="${anime.images?.jpg?.image_url || ''}" alt="${escHtml(anime.title)}" style="max-width: 200px; display:block;">
      
      <ul>
        <li><strong>Score:</strong> ${anime.score || 'N/A'}</li>
        <li><strong>Rank:</strong> ${anime.rank ? '#' + anime.rank : 'N/A'}</li>
        <li><strong>Type:</strong> ${anime.type || 'N/A'}</li>
        <li><strong>Episodes:</strong> ${anime.episodes || '?'}</li>
        <li><strong>Status:</strong> ${anime.status || 'N/A'}</li>
      </ul>
      
      <p><strong>Synopsis:</strong></p>
      <p>${escHtml(anime.synopsis || 'No synopsis available.')}</p>
      
      <p><strong>Genres:</strong> ${(anime.genres || []).map(g => escHtml(g.name)).join(', ')}</p>
      
      <hr>
      <button onclick="closeModal()">Close</button>
    </article>
  `;
}

function closeModal() {
  const modal = $('#modal');
  if (modal) modal.close();
}
