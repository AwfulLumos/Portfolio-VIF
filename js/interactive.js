/**
 * VIF.Dev Portfolio - Interactive Components Module
 * Handles form handling, carousel, and interactive elements
 */

class InteractiveComponents {
  constructor() {
    this.achievementsExpanded = false;
    this.formSubmissions = [];
  }

  /**
   * Initialize all interactive components
   */
  init() {
    this.initContactForm();
    this.initCarouselEnhancements();
    this.initSchoolCardToggle();
  }

  /**
   * Check rate limiting for form submissions
   */
  checkRateLimit() {
    const config = window.EmailConfig?.rateLimiting || { maxAttempts: 3, windowMs: 60000 };
    const now = Date.now();
    
    // Clean old submissions
    this.formSubmissions = this.formSubmissions.filter(
      time => now - time < config.windowMs
    );
    
    if (this.formSubmissions.length >= config.maxAttempts) {
      return false;
    }
    
    this.formSubmissions.push(now);
    return true;
  }

  /**
   * Initialize contact form handling
   */
  initContactForm() {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');

    if (!form) return;

    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      console.error('[ContactForm] EmailJS library not loaded!');
      return;
    }

    // Get config
    const config = window.EmailConfig;
    if (!config) {
      console.error('[ContactForm] EmailConfig not loaded!');
      return;
    }

    // Initialize EmailJS with Public Key
    try {
      emailjs.init(config.publicKey);
    } catch (error) {
      console.error('[ContactForm] Failed to initialize EmailJS:', error);
      return;
    }

    // Add submit event listener
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Check honeypot field (bot detection)
      const honeypot = form.querySelector('[name="website"]');
      if (honeypot && honeypot.value) {
        // Bot detected - silently fail
        console.warn('[ContactForm] Bot detected via honeypot');
        if (messageDiv) {
          messageDiv.textContent = '✓ Message sent successfully!';
          messageDiv.className = 'form-message success';
        }
        form.reset();
        return;
      }

      // Check rate limiting
      if (!this.checkRateLimit()) {
        if (messageDiv) {
          messageDiv.textContent = '✕ Too many attempts. Please wait a minute before trying again.';
          messageDiv.className = 'form-message error';
        }
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
      submitBtn.disabled = true;

      // Collect form data
      const formData = {
        from_name: form.name.value,
        from_email: form.email.value,
        subject: form.subject.value || 'No subject',
        message: form.message.value,
        to_name: config.recipientName
      };

      try {
        // Send email using EmailJS
        const response = await emailjs.send(
          config.serviceId,
          config.templateId,
          formData
        );

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
        console.error('[ContactForm] Form submission error:', error);

        if (messageDiv) {
          let errorMessage = '✕ Something went wrong. Please try again or email me directly.';

          // Provide helpful error messages based on error status
          if (error.status === 412) {
            errorMessage = '✕ Email service configuration error. Please contact me directly at vounirishflorence.dejumo@gmail.com';
            console.error('[ContactForm] EmailJS 412 Error - Check: 1) Service ID, 2) Template ID, 3) Public Key, 4) Account verification');
          } else if (error.status === 400) {
            errorMessage = '✕ Invalid form data. Please check your inputs and try again.';
          } else if (error.status === 403) {
            errorMessage = '✕ Access denied. Email service may be restricted to certain domains.';
          } else if (error.message && error.message.includes('not configured')) {
            errorMessage = '✕ Email service not configured yet. Please email me directly at vounirishflorence.dejumo@gmail.com';
          } else if (error.text) {
            errorMessage = `✕ Error: ${error.text}`;
          }

          messageDiv.textContent = errorMessage;
          messageDiv.className = 'form-message error';
        }
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input:not([name="website"]), textarea');
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
    const currentIndexEl = document.getElementById('projectCurrentIndex');
    const totalCountEl = document.getElementById('projectTotalCount');
    const thumbnails = document.querySelectorAll('.project-thumb');
    const thumbContainer = document.getElementById('projectsThumbnails');

    if (!carousel) return;

    // Get total slides
    const slides = carousel.querySelectorAll('.carousel-inner .carousel-item');
    const totalSlides = slides.length;

    if (totalCountEl) totalCountEl.textContent = totalSlides;
    thumbnails.forEach((thumb, idx) => {
      thumb.setAttribute('aria-current', idx === 0 ? 'true' : 'false');
    });

    // Update counter and thumbnails on slide change
    carousel.addEventListener('slid.bs.carousel', (e) => {
      const newIndex = e.to + 1;
      if (currentIndexEl) currentIndexEl.textContent = newIndex;

      // Update thumbnail active state
      thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === e.to);
        thumb.setAttribute('aria-current', idx === e.to ? 'true' : 'false');
      });
    });

    // Thumbnail click handlers
    thumbnails.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel) bsCarousel.to(idx);
      });
    });

    if (thumbContainer) thumbContainer.style.display = 'flex';

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
  }

  /**
   * Cleanup resources
   */
  destroy() {
    // Cleanup if needed
  }

  /**
   * Initialize school card dropdown toggle
   */
  initSchoolCardToggle() {
    const schoolCard = document.getElementById('schoolCard');
    const dropdown = document.getElementById('schoolDropdown');

    if (!schoolCard || !dropdown) return;

    const updateState = (isExpanded) => {
      schoolCard.classList.toggle('expanded', isExpanded);
      dropdown.classList.toggle('show', isExpanded);
      schoolCard.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      dropdown.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');
    };

    schoolCard.addEventListener('click', () => {
      const isExpanded = dropdown.classList.contains('show');
      updateState(!isExpanded);
    });

    schoolCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isExpanded = dropdown.classList.contains('show');
        updateState(!isExpanded);
      }
    });
  }
}

// Create global instance
window.interactiveComponents = new InteractiveComponents();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InteractiveComponents;
}
