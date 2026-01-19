/**
 * VIF.Dev Portfolio - Animations Module
 * Handles scroll animations, transitions, and visual effects
 */

class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Initialize all animations
   */
  init() {
    if (this.isReducedMotion) {
      this.showAllElements();
      return;
    }

    this.initScrollAnimations();
    this.initHeroAnimations();
    this.initParticleSystem();
  }

  /**
   * Show all animated elements immediately (for reduced motion)
   */
  showAllElements() {
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
      el.classList.add('visible');
    });
  }

  /**
   * Initialize scroll-triggered animations using Intersection Observer
   */
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Unobserve after animation to improve performance
          if (!entry.target.hasAttribute('data-repeat-animation')) {
            animationObserver.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animatableSelectors = '.fade-in, .fade-in-left, .fade-in-right, .scale-in';
    document.querySelectorAll(animatableSelectors).forEach(el => {
      animationObserver.observe(el);
    });

    this.observers.set('animation', animationObserver);
  }

  /**
   * Initialize hero section animations
   */
  initHeroAnimations() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    // Parallax effect on scroll
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const heroContent = hero.querySelector('.hero-content');
      
      if (heroContent && scrolled < window.innerHeight) {
        const opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        const translateY = scrolled * 0.3;
        
        heroContent.style.opacity = Math.max(0, opacity);
        heroContent.style.transform = `translateY(${translateY}px)`;
      }
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Initialize floating particle system
   */
  initParticleSystem() {
    // Check if container already exists
    if (document.querySelector('.particles-container')) return;

    const container = document.createElement('div');
    container.className = 'particles-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);

    // Create particles
    const particleCount = 12;
    const sizes = ['small', 'medium', 'large'];
    const drifts = ['', 'drift-left', 'drift-right'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size
      particle.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
      
      // Random drift (30% chance)
      if (Math.random() > 0.7) {
        particle.classList.add(drifts[Math.floor(Math.random() * drifts.length)]);
      }

      container.appendChild(particle);
    }
  }

  /**
   * Add animation to an element
   * @param {Element} element 
   * @param {string} animationType 
   * @param {number} delay 
   */
  animate(element, animationType = 'fade-in', delay = 0) {
    if (this.isReducedMotion) {
      element.classList.add('visible');
      return;
    }

    element.classList.add(animationType);
    
    if (delay > 0) {
      element.style.transitionDelay = `${delay}ms`;
    }

    // Observe for scroll trigger
    const observer = this.observers.get('animation');
    if (observer) {
      observer.observe(element);
    }
  }

  /**
   * Cleanup observers
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Create global instance
window.animationManager = new AnimationManager();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationManager;
}
