/**
 * VIF.Dev Portfolio - Interactive Components Module
 * Handles achievements toggle, form handling, etc.
 */

class InteractiveComponents {
  constructor() {
    this.achievementsExpanded = false;
    console.log('[InteractiveComponents] Constructor called');
  }

  /**
   * Initialize all interactive components
   */
  init() {
    console.log('[InteractiveComponents] init() called');
    // this.initAchievementsToggle(); // Disabled - achievements now displayed as static card
    this.initContactForm();
    this.initCarouselEnhancements();
  }

  /**
   * Initialize achievements toggle functionality
   */
  initAchievementsToggle() {
    console.log('[InteractiveComponents] initAchievementsToggle() called');
    
    const toggleBtn = document.getElementById('achievementsToggle');
    const content = document.getElementById('achievementsList');
    
    console.log('[InteractiveComponents] toggleBtn found:', toggleBtn);
    console.log('[InteractiveComponents] content found:', content);
    
    if (!toggleBtn || !content) {
      console.warn('[InteractiveComponents] Missing elements - toggleBtn:', !!toggleBtn, 'content:', !!content);
      return;
    }

    let isAnimating = false;

    const toggle = () => {
      console.log('[InteractiveComponents] toggle() called, isAnimating:', isAnimating);
      
      if (isAnimating) {
        console.log('[InteractiveComponents] Blocked - still animating');
        return;
      }
      isAnimating = true;

      this.achievementsExpanded = !this.achievementsExpanded;
      console.log('[InteractiveComponents] achievementsExpanded set to:', this.achievementsExpanded);
      
      content.classList.toggle('active', this.achievementsExpanded);
      toggleBtn.setAttribute('aria-expanded', String(this.achievementsExpanded));

      // Update button text
      const textSpan = toggleBtn.querySelector('span:first-child');
      if (textSpan) {
        textSpan.innerHTML = this.achievementsExpanded 
          ? '<i class="bi bi-trophy-fill"></i> My Achievements'
          : '<i class="bi bi-trophy"></i> View My Achievements';
      }

      // Scroll into view if expanded
      if (this.achievementsExpanded) {
        setTimeout(() => {
          content.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }, 300);
      }

      setTimeout(() => {
        isAnimating = false;
        console.log('[InteractiveComponents] Animation complete, isAnimating reset to false');
      }, 500);
    };

    // Click handler
    toggleBtn.addEventListener('click', (e) => {
      console.log('[InteractiveComponents] Click event fired on toggleBtn');
      console.log('[InteractiveComponents] Event target:', e.target);
      console.log('[InteractiveComponents] Event currentTarget:', e.currentTarget);
      e.preventDefault();
      e.stopPropagation();
      toggle();
    });

    // Keyboard handler
    toggleBtn.addEventListener('keydown', (e) => {
      console.log('[InteractiveComponents] Keydown event:', e.key);
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
    
    // Add pointer events check
    const computedStyle = window.getComputedStyle(toggleBtn);
    console.log('[InteractiveComponents] Button pointer-events:', computedStyle.pointerEvents);
    console.log('[InteractiveComponents] Button cursor:', computedStyle.cursor);
    console.log('[InteractiveComponents] Button z-index:', computedStyle.zIndex);
    console.log('[InteractiveComponents] Button position:', computedStyle.position);
    
    console.log('[InteractiveComponents] Achievements toggle initialized successfully');
  }

  /**
   * Initialize contact form handling
   */
  initContactForm() {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
      submitBtn.disabled = true;

      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Simulate form submission (replace with actual API call)
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For demo purposes, we'll show a success message
        // In production, you would send this to your backend
        console.log('Form submission data:', data);

        // Show success message
        if (messageDiv) {
          messageDiv.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
          messageDiv.className = 'form-message success';
        }

        // Reset form
        form.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
          if (messageDiv) {
            messageDiv.className = 'form-message';
          }
        }, 5000);

      } catch (error) {
        console.error('Form submission error:', error);
        
        if (messageDiv) {
          messageDiv.textContent = '✕ Something went wrong. Please try again or email me directly.';
          messageDiv.className = 'form-message error';
        }
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.validity.valid) {
          input.style.borderColor = 'rgba(34, 197, 94, 0.5)';
        } else if (input.value) {
          input.style.borderColor = 'rgba(239, 68, 68, 0.5)';
        }
      });

      input.addEventListener('input', () => {
        input.style.borderColor = '';
      });
    });
  }

  /**
   * Initialize Bootstrap carousel enhancements
   */
  initCarouselEnhancements() {
    const carousel = document.getElementById('projectsCarousel');
    if (!carousel) return;

    // Pause carousel on hover
    carousel.addEventListener('mouseenter', () => {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel);
      if (bsCarousel) bsCarousel.pause();
    });

    carousel.addEventListener('mouseleave', () => {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel);
      if (bsCarousel) bsCarousel.cycle();
    });

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel);
      if (!bsCarousel) return;

      if (e.key === 'ArrowLeft') {
        bsCarousel.prev();
      } else if (e.key === 'ArrowRight') {
        bsCarousel.next();
      }
    });

    // Touch/swipe support is built into Bootstrap 5
  }

  /**
   * Cleanup resources
   */
  destroy() {
    // Cleanup if needed
  }
  
  /**
   * Debug function to check for overlapping elements
   */
  debugAchievementsButton() {
    const toggleBtn = document.getElementById('achievementsToggle');
    if (!toggleBtn) {
      console.error('[Debug] achievementsToggle button not found!');
      return;
    }
    
    const rect = toggleBtn.getBoundingClientRect();
    console.log('[Debug] Button bounding rect:', rect);
    
    // Get element at the center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const elementAtPoint = document.elementFromPoint(centerX, centerY);
    
    console.log('[Debug] Element at button center:', elementAtPoint);
    console.log('[Debug] Is it the button?', elementAtPoint === toggleBtn);
    console.log('[Debug] Is it inside the button?', toggleBtn.contains(elementAtPoint));
    
    // Check ancestors
    if (elementAtPoint && elementAtPoint !== toggleBtn && !toggleBtn.contains(elementAtPoint)) {
      console.warn('[Debug] BLOCKING ELEMENT DETECTED!');
      console.log('[Debug] Blocking element:', elementAtPoint);
      console.log('[Debug] Blocking element styles:', window.getComputedStyle(elementAtPoint));
    }
    
    // Check button and parent z-indices
    let el = toggleBtn;
    while (el) {
      const style = window.getComputedStyle(el);
      if (style.zIndex !== 'auto') {
        console.log('[Debug] z-index found:', el.tagName, el.className, 'z-index:', style.zIndex);
      }
      if (style.position !== 'static') {
        console.log('[Debug] positioned element:', el.tagName, el.className, 'position:', style.position);
      }
      el = el.parentElement;
    }
  }
}

// Create global instance
window.interactiveComponents = new InteractiveComponents();

// Add debug function to window for easy console access
window.debugAchievements = () => {
  window.interactiveComponents.debugAchievementsButton();
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InteractiveComponents;
}
