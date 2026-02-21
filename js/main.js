/**
 * VIF.Dev Portfolio - Main Application Entry Point
 * Initializes all modules and manages application lifecycle
 */

(function() {
  'use strict';

  /**
   * Main application configuration
   */
  const AppConfig = {
    components: [
      { name: 'navbar', target: '#navbar-placeholder' },
      { name: 'hero', target: '#hero-placeholder' },
      { name: 'about', target: '#about-placeholder' },
      { name: 'personality', target: '#personality-placeholder' },
      { name: 'skills', target: '#skills-placeholder' },
      { name: 'education', target: '#education-placeholder' },
      { name: 'projects', target: '#projects-placeholder' },
      { name: 'contact', target: '#contact-placeholder' },
      { name: 'footer', target: '#footer-placeholder' }
    ],
    debug: true // Enable debug mode to see component loading
  };

  /**
   * Log helper for debugging
   */
  function log(message, type = 'info') {
    if (!AppConfig.debug && type !== 'error') return;
    
    const styles = {
      info: 'color: #00d4ff',
      success: 'color: #22c55e',
      warning: 'color: #f59e0b',
      error: 'color: #ef4444'
    };

    console[type === 'error' ? 'error' : 'log'](
      `%c[VIF.Dev] ${message}`,
      styles[type] || styles.info
    );
  }

  /**
   * Initialize application
   */
  async function initApp() {
    log('🚀 Initializing VIF.Dev Portfolio...', 'info');

    try {
      // Check if we're using component loading or static HTML
      const hasPlaceholders = document.querySelector('#navbar-placeholder');
      
      if (hasPlaceholders && window.componentLoader) {
        // Dynamic component loading
        log('Loading components dynamically...', 'info');
        await window.componentLoader.loadComponents(AppConfig.components);
      }

      // Initialize modules after components are loaded
      initModules();

      log('✅ Portfolio initialized successfully!', 'success');

    } catch (error) {
      log(`❌ Initialization error: ${error.message}`, 'error');
      console.error(error);
    }
  }

  /**
   * Initialize all modules
   */
  function initModules() {
    // Initialize Animation Manager
    if (window.animationManager) {
      window.animationManager.init();
      log('Animations initialized', 'info');
    }

    // Initialize Navigation Manager
    if (window.navigationManager) {
      window.navigationManager.init();
      log('Navigation initialized', 'info');
    }

    // Initialize Interactive Components
    if (window.interactiveComponents) {
      window.interactiveComponents.init();
      log('Interactive components initialized', 'info');
    }

    // Initialize Konami Code Easter Egg
    if (window.KonamiCode) {
      window.KonamiCode.init();
    }

    // Page load animation
    initPageLoadAnimation();

    // Initialize stat counters
    initStatCounters();
  }

  /**
   * Page load fade-in animation
   */
  function initPageLoadAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  }

  /**
   * Initialize animated stat counters
   */
  function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0 || !window.Utils) return;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const targetValue = parseInt(element.textContent.replace(/\D/g, ''), 10);
          
          if (!isNaN(targetValue)) {
            const suffix = element.textContent.replace(/[0-9]/g, '');
            
            window.Utils.animateNumber(element, targetValue, 1500);
            
            // Add suffix back after animation
            setTimeout(() => {
              element.textContent = targetValue + suffix;
            }, 1600);
          }
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
  }

  /**
   * Handle visibility change (pause animations when tab is hidden)
   */
  function handleVisibilityChange() {
    if (document.hidden) {
      // Pause animations when tab is hidden
      document.body.classList.add('animations-paused');
    } else {
      // Resume animations when tab is visible
      document.body.classList.remove('animations-paused');
    }
  }

  // Event Listeners
  document.addEventListener('DOMContentLoaded', initApp);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Listen for component load events
  document.addEventListener('allComponentsLoaded', () => {
    log('All components loaded', 'success');
  });

  // Expose app config for debugging
  window.VIFDevPortfolio = {
    config: AppConfig,
    version: '2.0.0',
    setDebug: (value) => { AppConfig.debug = value; }
  };

})();
