// ===== App State & Data Loading =====

/** Centralized application state */
const state = {
  seasonal: [],
  topAnime: [],
  topAiring: [],
  topUpcoming: [],
  popular: [],
  news: [],
  reviews: [],
  trailers: [],
};

/**
 * Load all homepage data with staggered requests
 * to respect Jikan API rate limits (~3 req/sec).
 */
async function loadAllData() {
  loadSeasonal();
  await sleep(400);
  loadTopAnime();
  await sleep(400);
  loadTopAiring();
  await sleep(400);
  loadTopUpcoming();
  await sleep(400);
  loadPopular();
  await sleep(400);
  loadRecentReviews();
}

async function loadSeasonal() {
  const data = await apiFetch(`${API_BASE}/seasons/now?limit=20&sfw=true`);
  if (!data) return;
  state.seasonal = data.data || [];
  renderSeasonal();
}

async function loadTopAnime() {
  const data = await apiFetch(`${API_BASE}/top/anime?limit=25&sfw=true`);
  if (!data) return;
  state.topAnime = data.data || [];
  renderTopAnime();
  renderTrailers();
}

async function loadTopAiring() {
  const data = await apiFetch(`${API_BASE}/top/anime?filter=airing&limit=10&sfw=true`);
  if (!data) return;
  state.topAiring = data.data || [];
  renderSidebarList('top-airing-list', state.topAiring);
}

async function loadTopUpcoming() {
  const data = await apiFetch(`${API_BASE}/top/anime?filter=upcoming&limit=10&sfw=true`);
  if (!data) return;
  state.topUpcoming = data.data || [];
  renderSidebarList('top-upcoming-list', state.topUpcoming);
}

async function loadPopular() {
  const data = await apiFetch(`${API_BASE}/top/anime?filter=bypopularity&limit=10&sfw=true`);
  if (!data) return;
  state.popular = data.data || [];
  renderSidebarList('most-popular-list', state.popular, true);
}

async function loadRecentReviews() {
  const data = await apiFetch(`${API_BASE}/reviews/anime?page=1`);
  if (!data) return;
  state.reviews = (data.data || []).slice(0, 4);
  renderReviews();
}
