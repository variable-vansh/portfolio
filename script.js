// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".content-section");
  const mainContent = document.querySelector(".main-content");
  const sidebar = document.querySelector(".sidebar");

  // Handle navigation click
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all nav items
      navItems.forEach((nav) => nav.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Get target section
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Calculate offset relative to main content container
        const offsetTop = targetSection.offsetTop - mainContent.offsetTop;
        mainContent.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Handle scroll to update active navigation
  mainContent.addEventListener("scroll", function () {
    let current = "";
    const scrollTop = mainContent.scrollTop;

    // Find the section that's currently most visible
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - mainContent.offsetTop;
      const sectionHeight = section.clientHeight;

      // Check if section is in viewport (with some offset for better UX)
      if (
        scrollTop >= sectionTop - 150 &&
        scrollTop < sectionTop + sectionHeight - 150
      ) {
        current = section.getAttribute("id");
      }
    });

    // If no section is found, default to the first one that's passed
    if (!current) {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - mainContent.offsetTop;
        if (scrollTop >= sectionTop - 150) {
          current = section.getAttribute("id");
        }
      });
    }

    // Update active navigation
    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });

    // Update body background based on current section
    updateBackgroundForSection(current);
  });

  // Function to update background based on section
  function updateBackgroundForSection(sectionId) {
    const body = document.body;

    // Remove all section classes
    body.classList.remove("about-bg", "projects-bg", "blog-bg");

    // Add current section class
    if (sectionId) {
      body.classList.add(sectionId + "-bg");
    }
  }
  // Initialize with about section
  updateBackgroundForSection("about");
});
