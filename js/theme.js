/**
 * VIF.Dev Portfolio - Theme Manager
 * Handles dark/light mode switching with localStorage persistence
 */

class ThemeManager {
  constructor() {
    this.theme = 'dark';
    this.storageKey = 'vif-portfolio-theme';
    this.toggleBtn = null;
  }

  /**
   * Initialize theme system
   */
  init() {
    this.loadSavedTheme();
    this.createToggleButton();
    this.applyTheme(this.theme);
    this.bindEvents();
  }

  /**
   * Load saved theme from localStorage or detect system preference
   */
  loadSavedTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    
    if (savedTheme) {
      this.theme = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme = prefersDark ? 'dark' : 'dark'; // Default to dark
    }
  }

  /**
   * Create the toggle button and add to DOM
   */
  createToggleButton() {
    // Check if button already exists
    if (document.querySelector('.theme-toggle')) return;

    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle dark/light theme');
    button.setAttribute('title', 'Toggle theme');
    button.innerHTML = `
      <i class="bi bi-sun-fill icon-sun"></i>
      <i class="bi bi-moon-fill icon-moon"></i>
    `;

    document.body.appendChild(button);
    this.toggleBtn = button;
  }

  /**
   * Apply theme to document
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.theme = theme;
    localStorage.setItem(this.storageKey, theme);

    // Update button aria-label
    if (this.toggleBtn) {
      const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
      this.toggleBtn.setAttribute('aria-label', label);
    }

    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  /**
   * Toggle between themes
   */
  toggle() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Toggle button click
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't set a preference
      if (!localStorage.getItem(this.storageKey)) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Keyboard shortcut: Ctrl/Cmd + Shift + T
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  /**
   * Get current theme
   */
  getTheme() {
    return this.theme;
  }

  /**
   * Check if current theme is dark
   */
  isDark() {
    return this.theme === 'dark';
  }
}

// Create global instance
window.themeManager = new ThemeManager();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.themeManager.init());
} else {
  window.themeManager.init();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
