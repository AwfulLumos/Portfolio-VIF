// Main initialization
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Initializing VIF.Dev Portfolio...");

  try {
    initScrollAnimations();
    initParticleSystem();
    initSchoolCardFlip();
    initAchievementToggle();
    initSmoothScrolling();
    initHeaderScroll();
    initPageEffects();

    console.log("✅ All systems loaded successfully!");
  } catch (error) {
    console.error("❌ Error during initialization:", error);
  }
});

// Scroll-triggered animations with improved performance
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Special handling for about section
        if (entry.target.id === "about") {
          setTimeout(() => {
            const textContent = entry.target.querySelector(
              ".col-md-6:first-child"
            );
            const imageContent = entry.target.querySelector(
              ".col-md-6:last-child"
            );

            if (textContent) textContent.classList.add("about-text-animate");
            if (imageContent) imageContent.classList.add("about-image-animate");
          }, 200);
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
}

// Floating particles system with better performance
function initParticleSystem() {
  try {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles-container";
    document.body.appendChild(particlesContainer);

    // Create particles with staggered initialization
    for (let i = 0; i < 10; i++) {
      setTimeout(() => createParticle(particlesContainer), i * 100);
    }
  } catch (error) {
    console.warn("Particles system failed to initialize:", error);
  }
}

function createParticle(container) {
  if (!container) return;

  const particle = document.createElement("div");
  particle.className = "particle";

  const sizes = ["small", "medium", "large"];
  const drifts = ["", "drift-left", "drift-right"];

  particle.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);

  if (Math.random() > 0.6) {
    particle.classList.add(drifts[Math.floor(Math.random() * drifts.length)]);
  }

  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * -10 + "s";

  container.appendChild(particle);
}

// School card flip functionality with improved reliability
function initSchoolCardFlip() {
  const schoolCard = document.getElementById("schoolCard");
  if (!schoolCard) {
    console.warn("School card element not found");
    return;
  }

  let isFlipped = false;
  let flipTimeout = null;
  let autoFlipInterval = null;

  function flipCard() {
    isFlipped = !isFlipped;
    schoolCard.classList.toggle("flipped", isFlipped);
    schoolCard.setAttribute("aria-expanded", String(isFlipped));

    // Clear existing timeout
    if (flipTimeout) {
      clearTimeout(flipTimeout);
      flipTimeout = null;
    }

    // Auto-flip back after delay
    if (isFlipped) {
      flipTimeout = setTimeout(() => {
        isFlipped = false;
        schoolCard.classList.remove("flipped");
        schoolCard.setAttribute("aria-expanded", "false");
        flipTimeout = null;
      }, 5000);
    }
  }

  // Event listeners for manual flip
  schoolCard.addEventListener("click", flipCard);
  schoolCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flipCard();
    }
  });

  // Auto-flip functionality
  function startAutoFlip() {
    if (autoFlipInterval) clearInterval(autoFlipInterval);

    autoFlipInterval = setInterval(() => {
      if (
        !schoolCard.matches(":hover") &&
        document.activeElement !== schoolCard
      ) {
        flipCard();
      }
    }, 8000);
  }

  function stopAutoFlip() {
    if (autoFlipInterval) {
      clearInterval(autoFlipInterval);
      autoFlipInterval = null;
    }
  }

  schoolCard.addEventListener("mouseenter", stopAutoFlip);
  schoolCard.addEventListener("mouseleave", startAutoFlip);
  schoolCard.addEventListener("focus", stopAutoFlip);
  schoolCard.addEventListener("blur", startAutoFlip);

  startAutoFlip();
}

// Enhanced achievement toggle with robust button handling
function initAchievementToggle() {
  const btn = document.getElementById("showAchievementsBtn");
  const achievements = document.getElementById("achievements");

  if (!btn) {
    console.warn("Achievement button not found");
    return;
  }

  if (!achievements) {
    console.warn("Achievement section not found");
    return;
  }

  let isExpanded = false;
  let isAnimating = false;

  function toggleAchievements() {
    if (isAnimating) return; // Prevent double-clicks

    isAnimating = true;
    isExpanded = !isExpanded;

    achievements.classList.toggle("active", isExpanded);
    btn.setAttribute("aria-expanded", String(isExpanded));

    if (isExpanded) {
      btn.innerHTML = "These are my Achievements";
      btn.style.background =
        "linear-gradient(135deg, var(--color-secondary), var(--color-accent))";

      setTimeout(() => {
        achievements.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        isAnimating = false;
      }, 300);
    } else {
      btn.innerHTML = "🏆 View My Achievements";
      btn.style.background =
        "linear-gradient(135deg, var(--color-accent), var(--color-secondary))";
      isAnimating = false;
    }
  }

  // Main click event
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleAchievements();
  });

  // Keyboard support
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAchievements();
    }
  });

  // Animation cleanup
  btn.addEventListener("animationend", () => {
    btn.style.animation = "";
  });

  // Intersection observer for pulse animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !isExpanded &&
          !btn.matches(":hover") &&
          !isAnimating
        ) {
          btn.style.animation = "buttonPulse 2s ease-in-out 3";
        }
      });
    },
    { threshold: 0.5 }
  );

  // Stop animation on hover for better UX
  btn.addEventListener("mouseenter", () => {
    btn.style.animation = "";
  });

  observer.observe(btn);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const targetSection = document.querySelector(href);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Header scroll effect with improved performance
function initHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) {
    console.warn("Header element not found");
    return;
  }

  let lastScrollY = window.scrollY;
  let isHeaderVisible = true;
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    // Update header backdrop based on scroll position
    if (currentScrollY > 50) {
      header.style.backdropFilter = "blur(25px)";
      header.style.background = "rgba(10, 15, 28, 0.95)";
    } else {
      header.style.backdropFilter = "blur(20px)";
      header.style.background = "rgba(10, 15, 28, 0.9)";
    }

    // Hide/show header based on scroll direction
    if (
      currentScrollY > lastScrollY &&
      currentScrollY > 100 &&
      isHeaderVisible
    ) {
      header.style.transform = "translateY(-100%)";
      isHeaderVisible = false;
    } else if (currentScrollY < lastScrollY && !isHeaderVisible) {
      header.style.transform = "translateY(0)";
      isHeaderVisible = true;
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
}

// Page effects and animations
function initPageEffects() {
  // Page fade-in effect
  window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  });

  // Konami code Easter egg
  initKonamiCode();
}

// Konami code Easter egg with improved handling
function initKonamiCode() {
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];
  let konamiInput = [];
  let konamiTimeout = null;

  document.addEventListener("keydown", (e) => {
    // Reset timeout on new input
    if (konamiTimeout) {
      clearTimeout(konamiTimeout);
    }

    konamiInput.push(e.code);

    // Keep only the last sequence length
    if (konamiInput.length > konamiSequence.length) {
      konamiInput.shift();
    }

    // Reset sequence after 5 seconds of inactivity
    konamiTimeout = setTimeout(() => {
      konamiInput = [];
    }, 5000);

    // Check if sequence matches
    if (
      konamiInput.length === konamiSequence.length &&
      konamiInput.every((key, index) => key === konamiSequence[index])
    ) {
      activateEasterEgg();
      konamiInput = [];
      clearTimeout(konamiTimeout);
    }
  });
}

function activateEasterEgg() {
  document.body.style.animation = "rainbow 2s linear infinite";

  setTimeout(() => {
    document.body.style.animation = "";
    alert("🎉 Easter egg activated! You found the secret! 🚀");
  }, 2000);
}

// Improved CSS keyframes injection
function injectStylesheet() {
  if (document.getElementById("portfolio-animations")) return;

  const style = document.createElement("style");
  style.id = "portfolio-animations";
  style.textContent = `
    @keyframes buttonPulse {
      0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3); }
      50% { transform: scale(1.03); box-shadow: 0 13px 35px rgba(0, 212, 255, 0.4); }
      100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3); }
    }
    
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize stylesheet when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", injectStylesheet);
} else {
  injectStylesheet();
}
