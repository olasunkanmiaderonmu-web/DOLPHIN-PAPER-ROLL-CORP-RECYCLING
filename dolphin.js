document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.getElementById("navToggler");
    const mobileNav = document.getElementById("mobileNav");
    const overlay = document.getElementById("navOverlay");

    function openMenu() {
        toggler.classList.add("active");
        mobileNav.classList.add("show");
        overlay.classList.add("show");
        toggler.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        toggler.classList.remove("active");
        mobileNav.classList.remove("show");
        overlay.classList.remove("show");
        toggler.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    toggler.addEventListener("click", function () {
        const isOpen = mobileNav.classList.contains("show");
        isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    // Close the menu when a mobile link is clicked
    mobileNav.querySelectorAll("a, button").forEach(function (el) {
        el.addEventListener("click", closeMenu);
    });

    // Close on escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
    });

    // Close automatically if resized up to desktop width
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 992) closeMenu();
    });
});




/* hero section */


document.addEventListener('DOMContentLoaded', function () {
  const carouselEl = document.getElementById('heroCarousel');
  if (!carouselEl) return;

  const progressButtons = carouselEl.querySelectorAll('.carousel-progress button');

  // Restart the progress-bar fill animation on the newly active indicator
  carouselEl.addEventListener('slide.bs.carousel', function (event) {
    progressButtons.forEach((btn, i) => {
      const span = btn.querySelector('span');
      btn.classList.remove('active');
      // Reset animation by cloning the span so it restarts cleanly
      const newSpan = span.cloneNode(true);
      span.parentNode.replaceChild(newSpan, span);

      if (i === event.to) {
        btn.classList.add('active');
      }
    });
  });

  // Pause the auto-slide when the user hovers the card, resume on mouse leave
  const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl, {
    interval: 3500,
    ride: 'carousel',
    pause: false
  });

  carouselEl.addEventListener('mouseenter', () => carousel.pause());
  carouselEl.addEventListener('mouseleave', () => carousel.cycle());
});



/* counter animation */

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {

        const target = +counter.dataset.target;
        const suffix = counter.dataset.suffix || "";
        const duration = 2000; // 2 seconds

        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {

            const progress = Math.min((currentTime - startTime) / duration, 1);

            const value = Math.floor(progress * target);

            counter.textContent = value.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));

});




/* date update */

document.getElementById('current-year').textContent = new Date().getFullYear();


/* ===== Scroll reveal animations ===== */
document.addEventListener("DOMContentLoaded", () => {
    const revealEls = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
                entry.target.classList.add("in-view");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
    });

    revealEls.forEach((el) => revealObserver.observe(el));
});



/* ===========================================================
   NAVBAR SCROLL STATE
   Shrinks the navbar slightly and deepens its shadow once the
   page has scrolled, for a more polished, app-like feel.
   =========================================================== */
(function () {
    const navbar = document.querySelector('.custom-navbar');
    if (!navbar) return;

    function updateNavbar() {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
})();



/* ===========================================================
   BACK TO TOP BUTTON
   =========================================================== */
(function () {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', function () {
        backToTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();



/* ===========================================================
   ACTIVE NAV LINK
   Highlights whichever nav link matches the current page, on
   both the desktop menu and the mobile slide-in panel.
   =========================================================== */
(function () {
    const currentPage = (location.pathname.split('/').pop() || 'index.html');

    document.querySelectorAll('.custom-navbar .nav-link, .mobile-nav-links a').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;
        link.classList.toggle('active', href === currentPage);
    });
})();