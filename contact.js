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



// 

window.addEventListener('DOMContentLoaded', () => { requestAnimationFrame(() => { document.getElementById('banner').classList.add('in'); }); });



/* ===========================================================
   SCROLL-REVEAL TRIGGER
   Watches every .reveal element and adds .in-view once it
   enters the viewport, respecting an optional data-delay (ms).
   =========================================================== */
(function () {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = el.getAttribute('data-delay');
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add('in-view');
            obs.unobserve(el);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
})();



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