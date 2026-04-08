/**
 * VIF.Dev Portfolio - Animations Module
 * Handles scroll animations, transitions and visual effects
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
    this.initTypedText();
    this.initParticleSystem();
    this.initProgressBars();
  }

  /**
   * Show all animated elements immediately (for reduced motion)
   */
  showAllElements() {
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
      el.classList.add('visible');
    });
    // Fill progress bars instantly for reduced-motion users
    document.querySelectorAll('.bar-fill[data-width]').forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.setProperty('--bar-target-width', `${targetWidth}%`);
      bar.style.transition = 'none';
      bar.classList.add('animated');
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
   * Initialize typed text effect in hero
   */
  initTypedText() {
    const typedEl = document.getElementById('typedText');
    if (!typedEl) return;

    const phrases = [
      'Full Stack Developer',
      'React & Vue.js Enthusiast',
      'Building Modern Web Experiences',
      'Clean Code Advocate',
      'Problem Solver & Innovator'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      // Finished typing current phrase
      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      }
      // Finished deleting
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
      }

      setTimeout(type, typingSpeed);
    };

    // Start typing after a short delay
    setTimeout(type, 1000);
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
    const drifts = ['drift-left', 'drift-right'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size
      particle.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
      
      // Random drift (30% chance)
      if (Math.random() > 0.7) {
        const drift = drifts[Math.floor(Math.random() * drifts.length)];
        particle.classList.add(drift);
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
   * Initialize personality progress bar animations
   */
  initProgressBars() {
    const bars = document.querySelectorAll('.bar-fill[data-width]');
    if (bars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width');
          // Set CSS variable then add class to trigger transition
          bar.style.setProperty('--bar-target-width', `${targetWidth}%`);
          // Small delay so the transition is visible after paint
          setTimeout(() => bar.classList.add('animated'), 100);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
    this.observers.set('progressBars', observer);
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
