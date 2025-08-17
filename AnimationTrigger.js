// Enhanced School Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Flip card functionality
  const schoolCard = document.getElementById("schoolCard");
  if (schoolCard) {
    const cardInner = schoolCard.querySelector(".school-card-inner");

    schoolCard.addEventListener("click", () => {
      cardInner.classList.toggle("flipped");

      // Add subtle haptic feedback (if supported)
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    });

    // Add keyboard accessibility
    schoolCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        cardInner.classList.toggle("flipped");
      }
    });

    // Make card focusable for accessibility
    schoolCard.setAttribute("tabindex", "0");
    schoolCard.setAttribute("role", "button");
    schoolCard.setAttribute(
      "aria-label",
      "Flip card to see university information"
    );
  }

  // Achievements toggle functionality
  const achievementsBtn = document.getElementById("showAchievementsBtn");
  const achievementsContent = document.getElementById("achievements");

  if (achievementsBtn && achievementsContent) {
    let achievementsVisible = false;

    achievementsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      achievementsVisible = !achievementsVisible;

      if (achievementsVisible) {
        achievementsContent.classList.add("active");
        achievementsBtn.textContent = "🏆 Hide Achievements";
        achievementsBtn.setAttribute("aria-expanded", "true");

        // Smooth scroll to achievements after a short delay to allow animation
        setTimeout(() => {
          achievementsContent.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }, 200);
      } else {
        achievementsContent.classList.remove("active");
        achievementsBtn.textContent = "🏆 View My Achievements";
        achievementsBtn.setAttribute("aria-expanded", "false");
      }

      // Add button press effect
      achievementsBtn.style.transform = "scale(0.95)";
      setTimeout(() => {
        achievementsBtn.style.transform = "";
      }, 150);
    });

    // Set initial aria attributes
    achievementsBtn.setAttribute("aria-expanded", "false");
    achievementsBtn.setAttribute("aria-controls", "achievements");
  }

  // Add intersection observer for subtle entrance animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe the school section
  const schoolSection = document.getElementById("school");
  if (schoolSection) {
    observer.observe(schoolSection);
  }

  // Add subtle parallax effect to background elements
  const schoolBg = document.querySelector("#school::before");
  if (schoolSection) {
    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;

      schoolSection.style.transform = `translateY(${parallax * 0.1}px)`;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    // Only add parallax on larger screens to avoid performance issues
    if (window.innerWidth > 768) {
      window.addEventListener("scroll", requestTick);
    }
  }

  // Add loading states and error handling for images
  const schoolImage = document.querySelector(".school-card-front img");
  if (schoolImage) {
    schoolImage.addEventListener("load", () => {
      schoolImage.classList.add("loaded");
    });

    schoolImage.addEventListener("error", () => {
      console.warn("School logo failed to load");
      schoolImage.alt = "University logo (failed to load)";
    });
  }

  // Add ripple effect to button
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  if (achievementsBtn) {
    achievementsBtn.addEventListener("click", createRipple);
  }
});
