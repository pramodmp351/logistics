(function () {
  const header = document.querySelector(".stkNavStrict-header");
  const toggle = document.querySelector(".stkNavStrict-toggle");
  const body = document.body;
  const desktopDropTrigger = document.querySelector(
    ".stkNavStrict-dropTrigger",
  );
  const desktopDropParent = document.querySelector(".stkNavStrict-hasDropdown");
  const mobileDropTrigger = document.querySelector(
    ".stkNavStrict-mobileDropTrigger",
  );
  const mobileDropParent = document.querySelector(
    ".stkNavStrict-mobileHasDropdown",
  );
  const allMobileLinks = document.querySelectorAll(
    ".stkNavStrict-mobileLink:not(.stkNavStrict-mobileDropTrigger), .stkNavStrict-mobileSubLink",
  );

  /**
   * State Management
   */
  const closeMobileMenu = () => {
    header.classList.remove("stkNavStrict-open");
    body.style.overflow = "";
    // Reset mobile dropdowns
    mobileDropParent.classList.remove("stkNavStrict-expanded");
  };

  const toggleMobileMenu = () => {
    const isOpen = header.classList.toggle("stkNavStrict-open");
    body.style.overflow = isOpen ? "hidden" : "";
  };

  /**
   * Mobile Events
   */
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  mobileDropTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileDropParent.classList.toggle("stkNavStrict-expanded");
  });

  allMobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /**
   * Desktop Dropdown (Accessibility & Clicks)
   */
  desktopDropTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = desktopDropParent.classList.toggle("stkNavStrict-active");
    desktopDropTrigger.setAttribute("aria-expanded", isActive);
  });

  // Hover management to ensure aria attributes match visual state
  desktopDropParent.addEventListener("mouseenter", () => {
    desktopDropTrigger.setAttribute("aria-expanded", "true");
  });

  desktopDropParent.addEventListener("mouseleave", () => {
    desktopDropParent.classList.remove("stkNavStrict-active");
    desktopDropTrigger.setAttribute("aria-expanded", "false");
  });

  /**
   * Global Logic (Esc key, Outside Clicks, Resize)
   */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
      desktopDropParent.classList.remove("stkNavStrict-active");
      desktopDropTrigger.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("click", (e) => {
    // Click outside desktop dropdown
    if (!desktopDropParent.contains(e.target)) {
      desktopDropParent.classList.remove("stkNavStrict-active");
      desktopDropTrigger.setAttribute("aria-expanded", "false");
    }

    // Click outside mobile menu content while open
    if (header.classList.contains("stkNavStrict-open")) {
      const overlay = document.querySelector(".stkNavStrict-mobileOverlay");
      const navContent = document.querySelector(".stkNavStrict-mobileNav");
      if (
        overlay.contains(e.target) &&
        !navContent.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    }
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 992) {
        closeMobileMenu();
      }
    }, 100);
  });
})();
