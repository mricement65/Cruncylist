// ===== Jikan API (MyAnimeList public API) =====
const API_BASE = 'https://api.jikan.moe/v4';

/**
 * Rate-limit aware fetch with automatic retry.
 * Retries up to 3 times on 429 (Too Many Requests) or network errors.
 */
async function apiFetch(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        await sleep(1500 + attempt * 1000);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (attempt === 2) {
        console.warn(`API fetch failed for ${url}:`, e);
        return null;
      }
      await sleep(1000);
    }
  }
}
