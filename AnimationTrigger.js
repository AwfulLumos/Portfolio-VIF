document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initParticleSystem();
  initSchoolCardFlip();
  initAchievementToggle();
  initSmoothScrolling();
  initHeaderScroll();

  console.log("🚀 VIF.Dev Portfolio Enhanced - All systems loaded!");
});

// Scroll-triggered animations
function initScrollAnimations() {
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

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

  document
    .querySelectorAll("section")
    .forEach((section) => observer.observe(section));
}

// Floating particles system
function initParticleSystem() {
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles-container";
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 10; i++) createParticle(particlesContainer);
}

function createParticle(container) {
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

// School card flip functionality
function initSchoolCardFlip() {
  const schoolCard = document.getElementById("schoolCard");
  if (!schoolCard) return;

  let isFlipped = false;
  let flipTimeout;
  let autoFlipInterval;

  function flipCard() {
    isFlipped = !isFlipped;
    schoolCard.classList.toggle("flipped", isFlipped);
    schoolCard.setAttribute("aria-expanded", String(isFlipped));

    clearTimeout(flipTimeout);
    if (isFlipped) {
      flipTimeout = setTimeout(() => {
        isFlipped = false;
        schoolCard.classList.remove("flipped");
        schoolCard.setAttribute("aria-expanded", "false");
      }, 5000);
    }
  }

  // Manual flip
  schoolCard.addEventListener("click", flipCard);
  schoolCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flipCard();
    }
  });

  // Auto-flip setup
  function startAutoFlip() {
    clearInterval(autoFlipInterval);
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
    clearInterval(autoFlipInterval);
  }

  schoolCard.addEventListener("mouseenter", stopAutoFlip);
  schoolCard.addEventListener("mouseleave", startAutoFlip);

  startAutoFlip();
}

// Enhanced achievement toggle
function initAchievementToggle() {
  const btn = document.getElementById("showAchievementsBtn");
  const achievements = document.getElementById("achievements");
  if (!btn || !achievements) return;

  let isExpanded = false;

  btn.addEventListener("click", () => {
    isExpanded = !isExpanded;
    achievements.classList.toggle("active", isExpanded);
    btn.setAttribute("aria-expanded", String(isExpanded));

    if (isExpanded) {
      btn.innerHTML = "🎉 Awesome Achievements!";
      btn.style.background =
        "linear-gradient(135deg, var(--color-secondary), var(--color-accent))";
      setTimeout(
        () =>
          achievements.scrollIntoView({ behavior: "smooth", block: "nearest" }),
        300
      );
    } else {
      btn.innerHTML = "🏆 View My Achievements";
      btn.style.background =
        "linear-gradient(135deg, var(--color-accent), var(--color-secondary))";
    }
  });

  btn.addEventListener("animationend", () => {
    btn.style.animation = "";
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isExpanded) {
        btn.style.animation = "buttonPulse 2s ease-in-out 3";
      }
    });
  });
  observer.observe(btn);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = document.querySelector(anchor.getAttribute("href"));
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  let lastScrollY = window.scrollY;
  let isHeaderVisible = true;

  window.addEventListener(
    "scroll",
    throttle(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        header.style.backdropFilter = "blur(25px)";
        header.style.background = "rgba(10, 15, 28, 0.95)";
      } else {
        header.style.backdropFilter = "blur(20px)";
        header.style.background = "rgba(10, 15, 28, 0.9)";
      }

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
    }, 100)
  );
}

// Throttle helper
function throttle(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Add button pulse keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes buttonPulse {
        0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3); }
        50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(0, 212, 255, 0.5); }
        100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3); }
    }
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Page fade-in
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => (document.body.style.opacity = "1"), 100);
});

// Konami code Easter egg
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiInput = [];

document.addEventListener("keydown", (e) => {
  konamiInput.push(e.key);
  if (konamiInput.length > konamiSequence.length) konamiInput.shift();

  if (konamiInput.join("") === konamiSequence.join("")) {
    document.body.style.animation = "rainbow 2s linear infinite";
    setTimeout(() => {
      document.body.style.animation = "";
      alert("🎉 Easter egg activated! You found the secret! 🚀");
    }, 2000);
    konamiInput = [];
  }
});
