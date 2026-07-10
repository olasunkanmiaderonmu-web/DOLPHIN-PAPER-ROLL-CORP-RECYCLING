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


/* ===========================================================
   SHOP BY MATERIALS
   Clicking a material in the sidebar swaps the product grid on
   the right and highlights the active link. Replace the image
   URLs below with real product photos whenever you have them.
   =========================================================== */
(function () {
    const materialList = document.getElementById('materialList');
    const productGrid = document.getElementById('productGrid');
    const activeCategoryLabel = document.getElementById('activeCategoryLabel');
    if (!materialList || !productGrid) return;

    const materialsData = {
        ferrous: {
            label: 'Aluminium UBC Can',
            items: [
                { name: 'HDPE Bottle Bales', img: '23.jpg' },
                { name: 'PET Bottle Bales', img: '47.jpg' },
                { name: 'PP Regrind', img: '48.jpg' },
                { name: 'LDPE Film Scrap', img: '49.jpg' },
                { name: 'Mixed Plastic Regrind', img: '50.jpg' },
            ]
        },
        nonferrous: {
            label: 'OCC Waste Paper Scrap',
            items: [
                { name: 'HDPE Bottle Bales', img: '11.jpg' },
                { name: 'PET Bottle Bales', img: '10.jpg' },
                { name: 'PP Regrind', img: '6.jpg' },
                { name: 'LDPE Film Scrap', img: '7.jpg' },
                { img: '8.jpg' },
            ]
        },
        copper: {
            label: 'Aluminium Extrusion 6063',
            items: [
                { name: 'HDPE Bottle Bales', img: '30.jpg' },
                { name: 'PET Bottle Bales', img: '53.jpg' },
                { name: 'PP Regrind', img: '54.jpg' },
                { name: 'LDPE Film Scrap', img: '55.jpg' },
                { name: 'Mixed Plastic Regrind', img: '56.jpg' },
            ]
        },
        aluminum: {
            label: 'Copper Wire',
            items: [
                { name: 'HDPE Bottle Bales', img: '13.jpg' },
                { name: 'PET Bottle Bales', img: '14.jpg' },
                { name: 'PP Regrind', img: '34.jpg' },
            ]
        },
        stainless: {
            label: 'Baled Tyres & Shredded Tyres',
            items: [
                { name: 'HDPE Bottle Bales', img: '22.jpg' },
                { name: 'PET Bottle Bales', img: '36.jpg' },
                { name: 'PP Regrind', img: '39.jpg' },
            ]
        },
        paperrolls: {
            label: 'Altenator Scrap',
            items: [
                { name: 'HDPE Bottle Bales', img: '5.jpg' },
                { name: 'PET Bottle Bales', img: '43.jpg' },
                { name: 'PP Regrind', img: '44.jpg' },
                { name: 'PP Regrind', img: '27.jpg' },
                { name: 'PP Regrind', img: '25.jpg' },
            ]
        },
        cardboard: {
            label: 'Compressor Scrap',
            items: [
                { name: 'HDPE Bottle Bales', img: '33.jpg' },
                { name: 'PET Bottle Bales', img: '15.jpg' },
                { name: 'PP Regrind', img: '16.jpg' },
                { name: 'LDPE Film Scrap', img: '26.jpg' },
            ]
        },
        alloys: {
            label: 'Alloy Wheel',
            items: [
                { name: 'HDPE Bottle Bales', img: '17.jpg' },
                { name: 'PET Bottle Bales', img: '18.jpg' },
                { name: 'PP Regrind', img: '65.jfif' },
                { name: 'LDPE Film Scrap', img: '66.jfif' },
                { name: 'Mixed Plastic Regrind', img: '67.jfif' },
            ]
        },
        plastic: {
            label: 'HMS Scrap',
            items: [
                { name: 'HDPE Bottle Bales', img: '19.jpg' },
                { name: 'PET Bottle Bales', img: '20.jpg' },
                { name: 'PP Regrind', img: '21.jpg' },
                { name: 'LDPE Film Scrap', img: '59.jpg' },
                { name: 'Mixed Plastic Regrind', img: '60.jpg' },
            ]
        }
    };

    function renderMaterial(key) {
        const data = materialsData[key];
        if (!data) return;

        productGrid.classList.add('fading');

        setTimeout(function () {
            activeCategoryLabel.textContent = data.label;

            productGrid.innerHTML = data.items.map(function (item) {
                return '' +
                    '<div class="col-sm-6 col-lg-4 product-card">' +
                    '<div class="product-img-wrap"><img src="' + item.img + '" alt="' + item.name + '" loading="lazy"></div>' +
                    '<div class="product-name">' + '</div>' +
                    '<div class="product-brand">' + '</div>' +
                    '</div>';
            }).join('');

            productGrid.classList.remove('fading');
        }, 180);
    }

    materialList.querySelectorAll('.material-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            materialList.querySelectorAll('.material-link').forEach(function (l) {
                l.classList.remove('active');
            });
            link.classList.add('active');

            renderMaterial(link.getAttribute('data-material'));
        });
    });

    // Initial render for the default active material
    renderMaterial('ferrous');
})();