// ==============================
// UTILS.JS
// Shared helper functions
// ==============================

/**
 * Create a DOM element with classes and optional innerHTML
 * @param {string} tag - The HTML tag name
 * @param {string[]} classes - Array of class names
 * @param {string} innerHTML - Optional inner HTML
 * @returns {HTMLElement}
 */
function createElement(tag, classes = [], innerHTML = '') {
  const el = document.createElement(tag);
  classes.forEach(cls => el.classList.add(cls));
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}

/**
 * Check if an element exists before applying callback
 * @param {string} selector - CSS selector
 * @param {Function} callback - Function to run if element exists
 */
function ifExists(selector, callback) {
  const el = document.querySelector(selector);
  if (el) callback(el);
}
