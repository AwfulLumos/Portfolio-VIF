/**
 * VIF.Dev Portfolio - Interactive Components Module
 * Handles form handling, carousel, project category filtering, and project detail modals
 */

class InteractiveComponents {
  constructor() {
    this.achievementsExpanded = false;
    this.formSubmissions = [];
    this.isSubmitting = false;

    // Structured metadata for Project Detail Modal
    this.projectDetailsData = {
      collabdoc: {
        title: 'Collaborative Document Editor',
        category: 'Full Stack Application',
        description: 'A real-time collaborative document editing platform that allows multiple users to edit, share, and format documents simultaneously with live updates, active user cursors, and seamless document synchronization.',
        image: 'assets/images/CollaborativeDocument.png',
        github: 'https://github.com/AwfulLumos/CollaborativeDocumentEditor',
        tech: ['React.js', 'Node.js', 'Socket.io', 'Express'],
        highlights: [
          'Real-time collaborative text synchronization powered by WebSockets (Socket.io).',
          'Live active user cursor indicators and visual selection status.',
          'Room-based document sharing with instant unique shareable URLs.',
          'Full-stack architecture with modular React frontend and Express server.'
        ]
      },
      digistall: {
        title: 'DigiStall',
        category: 'Web & Mobile Application',
        description: "Selected as one of the Startup Founders by the Naga City Government and served as a developer of a web and mobile-based stall management system for Naga City's public markets. The system was designed to improve stall application processing, payment and transaction tracking, compliance monitoring and overall market operations. Built with Vue.js, React Native, Node.js and PostgreSQL.",
        image: 'assets/images/DigiStall.png',
        github: null,
        tech: ['React.js', 'React Native', 'Vue.js', 'PostgreSQL', 'Docker'],
        highlights: [
          'Recognized startup founder initiative selected by the Naga City Government.',
          'Multi-platform ecosystem: Web admin portal for officials & React Native mobile app for market stallholders.',
          'Automated stall application processing, violation reporting, and digital payment tracking.',
          'Containerized backend architecture backed by PostgreSQL relational database.'
        ]
      },
      healthwatch: {
        title: 'HealthWatch Olongapo',
        category: 'Health Application',
        description: 'Designed and developed a health records management system to enhance patient data collection, storage, monitoring and appointment scheduling. The system enables healthcare providers to manage patient records, track patient status, schedule appointments and maintain health information through a user-friendly interface.',
        image: 'assets/images/HealthWatchOlongapo.png',
        github: 'https://github.com/AwfulLumos/HealthWatchOlongapo',
        tech: ['React.js', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Supabase'],
        highlights: [
          'Centralized health records management system for streamlined patient data entry.',
          'Interactive doctor-patient appointment scheduling & record history tracking.',
          'Strong TypeScript backend powered by Express.js and Supabase database.',
          'Production cloud deployment with frontend hosted on Vercel and backend microservices on Render.'
        ]
      },
      bitebound: {
        title: 'BiteBound Application',
        category: 'Recipe App',
        description: 'A modern recipe application designed to help users discover, browse, and save recipes with a clean, mobile-friendly experience. Includes recipe details, ingredient lists, and easy navigation for exploring new meals.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&h=400&q=70',
        github: 'https://github.com/AwfulLumos/BiteBoundApplication',
        tech: ['React Native', 'Firebase', 'Node.js', 'API Integration'],
        highlights: [
          'Cross-platform mobile application built with React Native for iOS and Android.',
          'Dynamic recipe API integration with real-time Firebase cloud database synchronization.',
          'User favorite recipe bookmarking, interactive ingredient checklists, and step-by-step instructions.',
          'Clean, tactile mobile UI optimized for quick navigation while cooking.'
        ]
      },
      eportfolio: {
        title: 'Digital Cultural E-Portfolio',
        category: 'Academic Project',
        description: 'A comprehensive digital portfolio exploring Japanese culture for The Contemporary World course. This interactive website showcases Japan\'s rich cultural heritage, traditions, global influence and contemporary challenges. Features include detailed sections on Japanese customs, festivals, arts, technology and globalization impacts.',
        image: 'assets/images/DigitalE-Portfolio.png',
        github: 'https://github.com/AwfulLumos/TCWFinalProjectGroupOne',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
        highlights: [
          'In-depth academic presentation exploring Japanese cultural traditions and modern tech advancements.',
          'Interactive, fully responsive web design crafted with custom CSS animations & Bootstrap 5.',
          'Curated team reflections, embedded video galleries, and interactive historical timelines.',
          'Developed for academic excellence in The Contemporary World curriculum.'
        ]
      },
      portfolio: {
        title: 'Portfolio Website (VIF.Dev)',
        category: 'Personal Project',
        description: 'This website is my personal developer portfolio, designed and developed from scratch to showcase my skills, projects and experience as a developer. Built with Bootstrap 5 and custom CSS, it features smooth animations, glassmorphism design, interactive elements and is optimized for an exceptional user experience.',
        image: 'assets/images/PortfolioWebsite.png',
        github: 'https://github.com/AwfulLumos/Portfolio-VIF',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'JSON-LD'],
        highlights: [
          'Custom glassmorphism design system built with CSS custom properties (tokens).',
          'Live GitHub activity integration with client-side localStorage caching & 403 rate-limit resilience.',
          'Modular asynchronous component loader architecture with lazy-loaded sections.',
          'Full SEO compliance with Open Graph meta tags and structured JSON-LD schema.'
        ]
      }
    };
  }

  /**
   * Initialize all interactive components
   */
  init() {
    this.initContactForm();
    this.initCarouselEnhancements();
    this.initSchoolCardToggle();
    this.initProjectFiltering();
    this.initProjectDetailModal();
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

      if (this.isSubmitting) {
        return;
      }

      // Check honeypot field (bot detection)
      const honeypot = form.querySelector('[name="website"]');
      if (honeypot && honeypot.value) {
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
      if (!submitBtn) {
        console.error('[ContactForm] Submit button not found!');
        return;
      }

      const originalText = submitBtn.innerHTML;
      this.isSubmitting = true;

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
        const response = await emailjs.send(
          config.serviceId,
          config.templateId,
          formData
        );

        if (messageDiv) {
          messageDiv.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
          messageDiv.className = 'form-message success';
        }

        form.reset();

        setTimeout(() => {
          if (messageDiv) {
            messageDiv.className = 'form-message';
          }
        }, 5000);

      } catch (error) {
        console.error('[ContactForm] Form submission error:', error);

        if (messageDiv) {
          let errorMessage = '✕ Something went wrong. Please try again or email me directly.';

          if (error.status === 412) {
            errorMessage = '✕ Email service configuration error. Please contact me directly at vounirishflorence.dejumo@gmail.com';
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
        this.isSubmitting = false;
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
   * Initialize Project Category Filtering
   */
  initProjectFiltering() {
    const filterContainer = document.getElementById('projectsFilterContainer');
    const carousel = document.getElementById('projectsCarousel');
    const currentIndexEl = document.getElementById('projectCurrentIndex');
    const totalCountEl = document.getElementById('projectTotalCount');
    const thumbnails = document.querySelectorAll('.project-thumb');

    if (!filterContainer || !carousel) return;

    const filterBtns = filterContainer.querySelectorAll('.project-filter-btn');
    const slides = carousel.querySelectorAll('.carousel-inner .carousel-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active filter pill
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        let visibleCount = 0;
        let firstVisibleIdx = -1;

        // Filter slides
        slides.forEach((slide, idx) => {
          const category = slide.dataset.category;
          const isMatch = filter === 'all' || category === filter;

          if (isMatch) {
            slide.style.display = '';
            if (firstVisibleIdx === -1) firstVisibleIdx = idx;
            visibleCount++;
          } else {
            slide.style.display = 'none';
            slide.classList.remove('active');
          }
        });

        // Filter thumbnails
        thumbnails.forEach((thumb, idx) => {
          const category = thumb.dataset.category;
          const isMatch = filter === 'all' || category === filter;

          if (isMatch) {
            thumb.style.display = '';
          } else {
            thumb.style.display = 'none';
            thumb.classList.remove('active');
          }
        });

        // Update active slide to first visible match
        if (firstVisibleIdx !== -1) {
          slides.forEach(s => s.classList.remove('active'));
          slides[firstVisibleIdx].classList.add('active');
          thumbnails.forEach((t, i) => t.classList.toggle('active', i === firstVisibleIdx));

          const bsCarousel = bootstrap.Carousel.getInstance(carousel);
          if (bsCarousel) {
            bsCarousel.to(firstVisibleIdx);
          }
        }

        // Update project total count display
        if (totalCountEl) totalCountEl.textContent = visibleCount;
        if (currentIndexEl) currentIndexEl.textContent = visibleCount > 0 ? '1' : '0';
      });
    });
  }

  /**
   * Initialize Interactive Project Detail Modal
   */
  initProjectDetailModal() {
    const modalEl = document.getElementById('projectDetailModal');
    if (!modalEl) return;

    // Move modal to document.body to prevent parent section stacking context clipping
    if (modalEl.parentElement !== document.body) {
      document.body.appendChild(modalEl);
    }

    // Use event delegation for View Details buttons

    document.addEventListener('click', (e) => {
      const detailBtn = e.target.closest('.btn-project-detail');
      if (!detailBtn) return;

      const projectId = detailBtn.dataset.projectId;
      const data = this.projectDetailsData[projectId];

      if (!data) return;

      // Populate modal content
      const titleEl = document.getElementById('modalProjectTitle');
      const categoryEl = document.getElementById('modalProjectCategory');
      const imgEl = document.getElementById('modalProjectImg');
      const descEl = document.getElementById('modalProjectDescription');
      const highlightsEl = document.getElementById('modalProjectHighlights');
      const techEl = document.getElementById('modalProjectTech');
      const sourceBtn = document.getElementById('modalSourceBtn');

      if (titleEl) titleEl.textContent = data.title;
      if (categoryEl) categoryEl.textContent = data.category;
      if (imgEl) {
        imgEl.src = data.image;
        imgEl.alt = `${data.title} preview`;
      }
      if (descEl) descEl.textContent = data.description;

      // Render highlights list
      if (highlightsEl) {
        highlightsEl.innerHTML = data.highlights
          .map(h => `<li class="mb-2 text-light"><i class="bi bi-check2-circle text-accent me-2"></i>${h}</li>`)
          .join('');
      }

      // Render tech stack tags
      if (techEl) {
        techEl.innerHTML = data.tech
          .map(t => `<span class="badge rounded-pill bg-dark border border-secondary me-1 mb-1 p-2">${t}</span>`)
          .join('');
      }

      // Render source code link
      if (sourceBtn) {
        if (data.github) {
          sourceBtn.href = data.github;
          sourceBtn.style.display = 'inline-flex';
        } else {
          sourceBtn.style.display = 'none';
        }
      }

      // Open Bootstrap modal
      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      bsModal.show();
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
