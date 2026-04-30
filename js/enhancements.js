/**
 * PORTFOLIO ENHANCEMENTS SCRIPT
 * Scroll animations, counters, parallax effects, and interactive features
 */

(function() {
  'use strict';

  const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let initialized = false;

  // ============================================
  // 1. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  // ============================================
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger counter animation if element has counter
        if (entry.target.classList.contains('counter-stat')) {
          animateCounter(entry.target);
        }
        
        // Trigger progress bar animation
        if (entry.target.classList.contains('skill-progress-bar')) {
          const fill = entry.target.querySelector('.skill-progress-fill');
          if (fill) {
            fill.classList.add('animate');
          }
        }
        
        // Optional: Unobserve after animation (one-time animation)
        // animateObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // ============================================
  // 2. COUNTER ANIMATION
  // ============================================
  
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
      element.classList.add('counting');
      setTimeout(() => element.classList.remove('counting'), 300);
    }, 16);
  }

  // ============================================
  // 3. PARALLAX SCROLL EFFECT
  // ============================================
  
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.parallax-slow').forEach(element => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.setProperty('--parallax-y', `${yPos}px`);
    });
    
    document.querySelectorAll('.parallax-fast').forEach(element => {
      const speed = 0.3;
      const yPos = -(scrolled * speed);
      element.style.setProperty('--parallax-y', `${yPos}px`);
    });
    
    ticking = false;
  }
  
  function requestParallaxUpdate() {
    if (isReducedMotion) return;
    if (!ticking && window.innerWidth > 768) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // ============================================
  // 4. SMOOTH SCROLL WITH OFFSET
  // ============================================
  
  function smoothScrollWithOffset(target, offset = 80) {
    const element = document.querySelector(target);
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // ============================================
  // 5. ACTIVE NAVIGATION SECTION TRACKING
  // ============================================
  
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id], div[id^="hero"], div[id^="about"], div[id^="skills"], div[id^="projects"], div[id^="certifications"], div[id^="personality"], div[id^="education"], div[id^="contact"]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // ============================================
  // 6. CURSOR GLOW EFFECT (Optional Hero Enhancement)
  // ============================================
  
  function initCursorGlow() {
    const heroTitle = document.querySelector('.hero-title-interactive');
    if (!heroTitle) return;
    
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);
    
    heroTitle.addEventListener('mouseenter', () => {
      cursorGlow.classList.add('active');
    });
    
    heroTitle.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });
    
    heroTitle.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // ============================================
  // 7. ENHANCED BUTTON INTERACTIONS
  // ============================================
  
  function enhanceButtons() {
    // Add ripple effect to primary buttons
    document.querySelectorAll('.btn-primary, .btn-primary-enhanced').forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // ============================================
  // 8. SKILL CARD TOOLTIPS
  // ============================================
  
  function initSkillTooltips() {
    document.querySelectorAll('.tech-icon, .skill-icon').forEach(icon => {
      const tooltipText = icon.getAttribute('title') || icon.getAttribute('data-tooltip');
      if (!tooltipText) return;
      
      // Remove default title to prevent browser tooltip
      icon.removeAttribute('title');
      
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip-enhanced');
      tooltip.textContent = tooltipText;
      icon.style.position = 'relative';
      icon.appendChild(tooltip);
      
      icon.addEventListener('mouseenter', () => {
        tooltip.classList.add('show');
      });
      
      icon.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
      });
    });
  }

  // ============================================
  // 9. PROJECT CARD IMAGE OVERLAY
  // ============================================
  
  function enhanceProjectCards() {
    document.querySelectorAll('.project-card img').forEach(img => {
      if (img.parentElement.classList.contains('project-image-wrapper')) return;
      
      const wrapper = document.createElement('div');
      wrapper.classList.add('project-image-wrapper');
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    });
  }

  // ============================================
  // 10. INITIALIZE INTERSECTION OBSERVERS
  // ============================================
  
  function initScrollAnimations() {
    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .scale-in-scroll, .heading-underline, .counter-stat, .skill-progress-bar').forEach(element => {
      animateObserver.observe(element);
    });
    
    // Add animation classes to existing elements if not present
    document.querySelectorAll('.skill-card, .project-card, .certification-card').forEach((card, index) => {
      if (!card.classList.contains('animate-on-scroll')) {
        card.classList.add('animate-on-scroll', `stagger-${(index % 5) + 1}`);
        animateObserver.observe(card);
      }
    });
    
    // Add heading underline animation
    document.querySelectorAll('h2, .section-title').forEach(heading => {
      if (!heading.classList.contains('heading-underline')) {
        heading.classList.add('heading-underline');
        animateObserver.observe(heading);
      }
    });
  }

  // ============================================
  // 11. APPLY ENHANCED CLASSES TO EXISTING ELEMENTS
  // ============================================
  
  function applyEnhancedClasses() {
    // Enhance primary buttons
    document.querySelectorAll('.btn-primary:not(.btn-primary-enhanced)').forEach(btn => {
      btn.classList.add('btn-primary-enhanced');
    });
    
    // Enhance outline buttons
    document.querySelectorAll('.btn-outline:not(.btn-outline-enhanced)').forEach(btn => {
      btn.classList.add('btn-outline-enhanced');
    });
    
    // Add glass-card-enhanced to existing glass elements
    document.querySelectorAll('.glass-bg:not(.glass-card-enhanced)').forEach(card => {
      card.classList.add('glass-card-enhanced');
    });
    
    // Add elevated-card to important cards
    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
      if (!card.classList.contains('elevated-card')) {
        card.classList.add('elevated-card');
      }
    });
    
    // Add glow effects to accent elements
    document.querySelectorAll('.status-dot').forEach(dot => {
      dot.classList.add('glow-sage');
    });
  }

  // ============================================
  // 12. TECH BADGE ENHANCEMENTS
  // ============================================
  
  function enhanceTechBadges() {
    document.querySelectorAll('.tech-stack .tech-name, .technologies span').forEach(badge => {
      if (!badge.classList.contains('tech-badge')) {
        badge.classList.add('tech-badge');
      }
    });
  }

  // ============================================
  // 13. PERFORMANCE OPTIMIZATION
  // ============================================
  
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ============================================
  // 14. MAIN INITIALIZATION
  // ============================================
  
  function init() {
    if (initialized) return;
    initialized = true;
    
    // Apply enhanced classes
    applyEnhancedClasses();
    
    // Initialize scroll animations
    setTimeout(() => {
      initScrollAnimations();
    }, 100);
    
    // Enhance project cards
    enhanceProjectCards();
    
    // Enhance tech badges
    enhanceTechBadges();
    
    // Initialize button enhancements
    enhanceButtons();
    
    // Initialize skill tooltips
    initSkillTooltips();
    
    // Initialize cursor glow (optional, can be disabled)
    // initCursorGlow();

    // Parallax (skip for reduced-motion users)
    if (!isReducedMotion) {
      window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    }
    
    console.log('✨ Portfolio enhancements loaded successfully!');
  }

  // Start initialization
  // If using dynamic component loading, wait until components are injected.
  // Otherwise, initialize as soon as DOM is ready.
  const hasPlaceholders = !!document.querySelector('#navbar-placeholder, #hero-placeholder, #about-placeholder');
  if (hasPlaceholders) {
    document.addEventListener('allComponentsLoaded', init, { once: true });
    // Safety fallback in case the event never fires (e.g., load error)
    window.setTimeout(() => {
      if (!initialized) init();
    }, 3000);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  // ============================================
  // 15. EXPORT FOR EXTERNAL USE
  // ============================================
  
  window.PortfolioEnhancements = {
    animateCounter,
    smoothScrollWithOffset,
    updateActiveNav
  };

})();
