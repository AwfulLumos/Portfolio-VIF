/**
 * VIF.Dev Portfolio - Utilities Module
 * Helper functions and utilities
 */

const Utils = {
  /**
   * Debounce function to limit rate of function calls
   * @param {Function} func 
   * @param {number} wait 
   * @returns {Function}
   */
  debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function to ensure function is called at most once in specified period
   * @param {Function} func 
   * @param {number} limit 
   * @returns {Function}
   */
  throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Check if element is in viewport
   * @param {Element} element 
   * @param {number} offset 
   * @returns {boolean}
   */
  isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Get scroll percentage of page
   * @returns {number}
   */
  getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
  },

  /**
   * Animate number counting
   * @param {Element} element 
   * @param {number} target 
   * @param {number} duration 
   */
  animateNumber(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = target;
      }
    };
    
    requestAnimationFrame(updateNumber);
  },

  /**
   * Copy text to clipboard
   * @param {string} text 
   * @returns {Promise<boolean>}
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy text:', err);
      return false;
    }
  },

  /**
   * Check if device is touch-enabled
   * @returns {boolean}
   */
  isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  },

  /**
   * Get CSS variable value
   * @param {string} name 
   * @returns {string}
   */
  getCSSVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  },

  /**
   * Set CSS variable value
   * @param {string} name 
   * @param {string} value 
   */
  setCSSVariable(name, value) {
    document.documentElement.style.setProperty(name, value);
  },

  /**
   * Generate unique ID
   * @param {string} prefix 
   * @returns {string}
   */
  generateId(prefix = 'id') {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Format date
   * @param {Date|string} date 
   * @param {object} options 
   * @returns {string}
   */
  formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
  }
};

// Konami Code Easter Egg
const KonamiCode = {
  sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
  input: [],
  timeout: null,

  init() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  },

  handleKeydown(e) {
    // Reset timeout
    if (this.timeout) clearTimeout(this.timeout);

    this.input.push(e.code);

    // Keep only last sequence length
    if (this.input.length > this.sequence.length) {
      this.input.shift();
    }

    // Reset after 5 seconds of inactivity
    this.timeout = setTimeout(() => {
      this.input = [];
    }, 5000);

    // Check if sequence matches
    if (this.input.length === this.sequence.length &&
        this.input.every((key, i) => key === this.sequence[i])) {
      this.activate();
      this.input = [];
    }
  },

  activate() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    // Inject rainbow keyframes if not exists
    if (!document.getElementById('rainbow-style')) {
      const style = document.createElement('style');
      style.id = 'rainbow-style';
      style.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      document.body.style.animation = '';
      alert('🎉 Easter egg activated! You found the secret! 🚀\n\nThanks for visiting my portfolio!');
    }, 2000);
  }
};

/**
 * Certificate Modal Functions
 */
const certImages = {
  hack4smart: 'css/Hack4Smart-Certificate.jpg',
  idea2startup: 'css/Idea2startupCertificate.png'
};

function openCertModal(certId) {
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('certModalImage');
  
  if (modal && modalImg && certImages[certId]) {
    modalImg.src = certImages[certId];
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on background click only
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      // Only close if clicking the background (not the image)
      if (e.target === modal) {
        closeCertModal();
      }
    });
  }
  
  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCertModal();
    }
  });
});

// Export utilities
window.Utils = Utils;
window.KonamiCode = KonamiCode;
window.openCertModal = openCertModal;
window.closeCertModal = closeCertModal;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Utils, KonamiCode, openCertModal, closeCertModal };
}
