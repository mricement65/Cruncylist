// ===== Utility Functions =====

/** DOM selector shortcuts */
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

/** Escape HTML to prevent XSS */
function escHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Format large member counts (1.4M, 350K, etc.) */
function formatMembers(num) {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

/** Promise-based sleep for staggering API requests */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
