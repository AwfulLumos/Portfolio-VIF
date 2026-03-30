/**
 * VIF.Dev Portfolio - Interactive Components Module
 * Handles form handling, carousel, and interactive elements
 */

class InteractiveComponents {
  constructor() {
    this.achievementsExpanded = false;
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

    // Initialize EmailJS with your Public Key
    try {
      emailjs.init('cs8QoSnqtKqc4SkwX');
    } catch (error) {
      console.error('[ContactForm] Failed to initialize EmailJS:', error);
      return;
    }

    // Add submit event listener
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();

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
        to_name: 'Voun Irish Florence Dejumo'
      };

      try {
        // EmailJS Configuration
        const serviceId = 'service_g6jsrwq';
        const templateId = 'template_pxji6pp';

        // Send email using EmailJS
        const response = await emailjs.send(
          serviceId,
          templateId,
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

          // Provide helpful error messages
          if (error.message && error.message.includes('not configured')) {
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
    const currentIndexEl = document.getElementById('projectCurrentIndex');
    const totalCountEl = document.getElementById('projectTotalCount');
    const thumbnails = document.querySelectorAll('.project-thumb');
    const carouselViewBtn = document.getElementById('carouselViewBtn');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const projectsGrid = document.getElementById('projectsGrid');
    const thumbContainer = document.getElementById('projectsThumbnails');

    if (!carousel) return;

    // Get total slides
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    if (totalCountEl) totalCountEl.textContent = totalSlides;

    // Update counter and thumbnails on slide change
    carousel.addEventListener('slid.bs.carousel', (e) => {
      const newIndex = e.to + 1;
      if (currentIndexEl) currentIndexEl.textContent = newIndex;

      // Update thumbnail active state
      thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === e.to);
      });
    });

    // Thumbnail click handlers
    thumbnails.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel) bsCarousel.to(idx);
      });
    });

    // View toggle (Carousel vs Grid)
    if (carouselViewBtn && gridViewBtn) {
      carouselViewBtn.addEventListener('click', () => {
        carouselViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        carousel.style.display = 'block';
        if (projectsGrid) projectsGrid.style.display = 'none';
        if (thumbContainer) thumbContainer.style.display = 'flex';
      });

      gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        carouselViewBtn.classList.remove('active');
        carousel.style.display = 'none';
        if (thumbContainer) thumbContainer.style.display = 'none';

        // Populate grid if empty
        if (projectsGrid) {
          if (projectsGrid.children.length === 0) {
            this.populateProjectsGrid(projectsGrid, slides);
          }
          projectsGrid.style.display = 'grid';
        }
      });
    }

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
   * Populate grid view from carousel slides
   */
  populateProjectsGrid(gridContainer, slides) {
    slides.forEach(slide => {
      const card = slide.querySelector('.project-card');
      if (!card) return;

      const clone = card.cloneNode(true);
      clone.classList.add('project-grid-card');
      gridContainer.appendChild(clone);
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

    schoolCard.addEventListener('click', () => {
      const isExpanded = dropdown.classList.contains('show');

      if (isExpanded) {
        dropdown.classList.remove('show');
        schoolCard.classList.remove('expanded');
      } else {
        dropdown.classList.add('show');
        schoolCard.classList.add('expanded');
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
