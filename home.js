(function () {
  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("stkHomeSec03-visible");
      }
    });
  }, observerOptions);

  const section = document.getElementById("stkHomeSec03-root");
  if (section) observer.observe(section);
})();

(function () {
  const statsSection = document.querySelector(".stkHomeSec06-stats-bar");
  const counters = document.querySelectorAll(".stkHomeSec06-stat-number");
  let started = false;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 1500; // 1.5s
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out function
        const easeOutQuad = (t) => t * (2 - t);
        const currentCount = Math.floor(easeOutQuad(progress) * target);

        counter.innerText = currentCount;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      requestAnimationFrame(update);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.2 },
  );

  if (statsSection) {
    observer.observe(statsSection);
  }
})();

(function () {
  const track = document.getElementById("stkHomeSec07-track");
  const drawer = document.getElementById("stkHomeSec07-drawer");
  const btnPrev = document.getElementById("stkHomeSec07-prev");
  const btnNext = document.getElementById("stkHomeSec07-next");

  let slides = Array.from(track.children);
  const originalLength = slides.length;

  // Setup clones for infinite looping
  slides.forEach((slide) => track.appendChild(slide.cloneNode(true)));
  slides.forEach((slide) => track.appendChild(slide.cloneNode(true)));

  let currentIndex = 0;
  let isTransitioning = false;
  let autoPlayInterval;

  function getStep() {
    // Dynamic step calculation based on current slide width
    const firstSlide = track.querySelector(".stkHomeSec07-slide");
    const gap = parseInt(window.getComputedStyle(track).gap) || 25;
    return firstSlide.offsetWidth + gap;
  }

  function updateSlider(animate = true) {
    const step = getStep();
    if (!animate) {
      track.style.transition = "none";
    } else {
      track.style.transition = "transform 0.6s ease";
    }
    track.style.transform = `translateX(-${currentIndex * step}px)`;
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateSlider();

    setTimeout(() => {
      if (currentIndex >= originalLength) {
        currentIndex = 0;
        updateSlider(false);
      }
      isTransitioning = false;
    }, 600);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentIndex <= 0) {
      currentIndex = originalLength;
      updateSlider(false);
      track.offsetHeight; // force reflow
    }

    currentIndex--;
    updateSlider();

    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 1500);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  btnNext.addEventListener("click", () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  btnPrev.addEventListener("click", () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });

  drawer.addEventListener("mouseenter", stopAutoPlay);
  drawer.addEventListener("mouseleave", startAutoPlay);

  // Enhanced Touch support for mobile
  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;

  drawer.addEventListener(
    "touchstart",
    (e) => {
      stopAutoPlay();
      startX = e.touches[0].clientX;
      isDragging = true;
    },
    { passive: true },
  );

  drawer.addEventListener(
    "touchend",
    (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      isDragging = false;
      startAutoPlay();
    },
    { passive: true },
  );

  // Handle window resize to keep slider aligned
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateSlider(false);
    }, 100);
  });

  // Initialize
  updateSlider(false);
  startAutoPlay();
})();

(function () {
  const accordionItems = document.querySelectorAll(".stkHomeSec08-faq-item");

  accordionItems.forEach((item) => {
    const question = item.querySelector(".stkHomeSec08-faq-question");
    const answer = item.querySelector(".stkHomeSec08-faq-answer");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("stkHomeSec08-active");

      // Close all others
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove("stkHomeSec08-active");
        otherItem.querySelector(".stkHomeSec08-faq-answer").style.maxHeight =
          "0";
      });

      // Toggle current
      if (!isActive) {
        item.classList.add("stkHomeSec08-active");
        // Calculate scroll height for smooth transition
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        item.classList.remove("stkHomeSec08-active");
        answer.style.maxHeight = "0";
      }
    });
  });

  // Form Submission handling (prevents refresh)
  // <!-- const form = document.querySelector(".stkHomeSec08-form");
  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   const btn = form.querySelector(".stkHomeSec08-submit-btn");
  //   const originalText = btn.innerHTML;
  //   btn.innerHTML = "Sent Successfully!";
  //   setTimeout(() => {
  //     btn.innerHTML = originalText;
  //     form.reset();
  //   }, 2000);
  // }); -->
})();
