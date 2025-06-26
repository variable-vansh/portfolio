// Smooth sliding animation for navigation
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".content-section nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Trigger puzzle animation for about section
        if (targetId === "about") {
          setTimeout(() => triggerAboutAnimation(), 300);
        }
      }
    });
  });

  // Add active state tracking
  const sections = document.querySelectorAll(".main-content section");
  const navItems = document.querySelectorAll(".content-section nav a");

  function setActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 50) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active");
      }
    });

    // Trigger about animation when scrolled into view
    if (current === "about") {
      triggerAboutAnimation();
    }
  }

  // Puzzle animation for about blocks
  function triggerAboutAnimation() {
    const aboutBlocks = [
      ".about-header",
      ".about-main-top-left",
      ".about-main-top-right",
      ".about-main-bottom",
      ".about-right",
    ];

    aboutBlocks.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element && !element.classList.contains("slide-in")) {
        setTimeout(() => {
          element.classList.add("slide-in");
        }, index * 200); // Stagger the animations
      }
    });
  }

  // Observer for scroll-triggered animations
  const aboutSection = document.querySelector("#about");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerAboutAnimation();
        }
      });
    },
    { threshold: 0.3 }
  );

  if (aboutSection) {
    observer.observe(aboutSection);
  }

  window.addEventListener("scroll", setActiveNav);
});
