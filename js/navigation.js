/**
 * VIF.Dev Portfolio - Navigation Module
 * Handles navbar behavior, smooth scrolling and active link highlighting
 */

class NavigationManager {
  constructor() {
    this.navbar = null;
    this.navLinks = [];
    this.sections = [];
    this.lastScrollY = 0;
    this.isNavbarHidden = false;
    this.scrollThreshold = 100;
    this.ticking = false;
  }

  /**
   * Initialize navigation functionality
   */
  init() {
    this.navbar = document.querySelector('.navbar, #mainNavbar');
    if (!this.navbar) return;

    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');

    this.initSmoothScrolling();
    this.initScrollBehavior();
    this.initActiveHighlighting();
    this.initBackToTop();
  }

  /**
   * Initialize smooth scrolling for anchor links
   * Uses event delegation so dynamically-loaded components are covered.
   */
  initSmoothScrolling() {
    document.addEventListener('click', (e) => {
      // Walk up the DOM to find if an anchor was clicked
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const targetSection = document.querySelector(href);
      if (!targetSection) return;

      e.preventDefault();

      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse.show');
      if (navbarCollapse) {
        try {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        } catch (err) { /* Bootstrap may not be ready */ }
      }

      // Re-fetch navbar height each time (it may change with scroll state)
      const navbar = document.querySelector('.navbar, #mainNavbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const targetPosition = targetSection.getBoundingClientRect().top
        + window.pageYOffset
        - navbarHeight
        - 20;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });

      // Update URL without re-scrolling
      history.pushState(null, '', href);
    });
  }

  /**
   * Initialize navbar scroll behavior (hide/show, background change)
   */
  initScrollBehavior() {
    const updateNavbar = () => {
      const currentScrollY = window.pageYOffset;

      // Add/remove scrolled class for background change
      if (currentScrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      // Hide/show navbar based on scroll direction
      if (currentScrollY > this.scrollThreshold) {
        if (currentScrollY > this.lastScrollY && !this.isNavbarHidden) {
          // Scrolling down - hide navbar
          this.navbar.classList.add('hidden');
          this.isNavbarHidden = true;
        } else if (currentScrollY < this.lastScrollY && this.isNavbarHidden) {
          // Scrolling up - show navbar
          this.navbar.classList.remove('hidden');
          this.isNavbarHidden = false;
        }
      } else {
        this.navbar.classList.remove('hidden');
        this.isNavbarHidden = false;
      }

      this.lastScrollY = currentScrollY;
      this.ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(updateNavbar);
        this.ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Initialize active link highlighting based on scroll position
   */
  initActiveHighlighting() {
    // Re-query after components have loaded into the DOM
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');

    if (this.sections.length === 0 || this.navLinks.length === 0) return;

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-80px 0px -50% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          this.setActiveLink(sectionId);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  /**
   * Set active class on navigation link
   * @param {string} sectionId 
   */
  setActiveLink(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Initialize back to top button
   */
  initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Create global instance
window.navigationManager = new NavigationManager();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationManager;
}
