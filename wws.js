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
            label: 'Ferrous Metal Scrap',
            items: [
                { name: 'Heavy Melting Steel (HMS 1&2)', brand: 'Grade 1 & 2', img: 'https://picsum.photos/seed/ferrous1/500/400' },
                { name: 'Structural Steel Scrap', brand: 'Commercial Grade', img: 'https://picsum.photos/seed/ferrous2/500/400' },
                { name: 'Cast Iron Scrap', brand: 'Foundry Grade', img: 'https://picsum.photos/seed/ferrous3/500/400' },
                { name: 'Shredded Steel Scrap', brand: 'Processed', img: 'https://picsum.photos/seed/ferrous4/500/400' },
                { name: 'Rebar & Wire Scrap', brand: 'Construction Grade', img: 'https://picsum.photos/seed/ferrous5/500/400' },
            ]
        },
        nonferrous: {
            label: 'Non-Ferrous Metal Scrap',
            items: [
                { name: 'Mixed Non-Ferrous Metals', brand: 'Sorted', img: 'https://picsum.photos/seed/nonferrous1/500/400' },
                { name: 'Zinc Die Cast Scrap', brand: 'Grade A', img: 'https://picsum.photos/seed/nonferrous2/500/400' },
                { name: 'Lead Scrap', brand: 'Battery Grade', img: 'https://picsum.photos/seed/nonferrous3/500/400' },
                { name: 'Nickel Alloy Scrap', brand: 'Industrial Grade', img: 'https://picsum.photos/seed/nonferrous4/500/400' },
                { name: 'Insulated Copper Wire', brand: 'Recyclable', img: 'https://picsum.photos/seed/nonferrous5/500/400' },
            ]
        },
        copper: {
            label: 'Copper Scrap',
            items: [
                { name: 'Bare Bright Copper Wire', brand: 'Grade 1', img: 'https://picsum.photos/seed/copper1/500/400' },
                { name: '#1 Copper Tubing', brand: 'Grade 1', img: 'https://picsum.photos/seed/copper2/500/400' },
                { name: '#2 Copper Scrap', brand: 'Grade 2', img: 'https://picsum.photos/seed/copper3/500/400' },
                { name: 'Copper Radiators', brand: 'Clean', img: 'https://picsum.photos/seed/copper4/500/400' },
                { name: 'Copper Turnings', brand: 'Machine Shop', img: 'https://picsum.photos/seed/copper5/500/400' },
            ]
        },
        aluminum: {
            label: 'Aluminum Scrap',
            items: [
                { name: 'Aluminum Extrusions', brand: '6063 Alloy', img: 'https://picsum.photos/seed/aluminum1/500/400' },
                { name: 'Aluminum Cans (UBC)', brand: 'Baled', img: 'https://picsum.photos/seed/aluminum2/500/400' },
                { name: 'Aluminum Sheet Scrap', brand: 'Clean', img: 'https://picsum.photos/seed/aluminum3/500/400' },
                { name: 'Aluminum Wheels', brand: 'Automotive', img: 'https://picsum.photos/seed/aluminum4/500/400' },
                { name: 'Aluminum Radiators', brand: 'Mixed', img: 'https://picsum.photos/seed/aluminum5/500/400' },
            ]
        },
        stainless: {
            label: 'Stainless Steel Scrap',
            items: [
                { name: 'Stainless 304 Scrap', brand: 'Grade 304', img: 'https://picsum.photos/seed/stainless1/500/400' },
                { name: 'Stainless 316 Scrap', brand: 'Grade 316', img: 'https://picsum.photos/seed/stainless2/500/400' },
                { name: 'Stainless Turnings', brand: 'Machine Shop', img: 'https://picsum.photos/seed/stainless3/500/400' },
                { name: 'Stainless Sheet Offcuts', brand: 'Clean', img: 'https://picsum.photos/seed/stainless4/500/400' },
                { name: 'Stainless Kitchen Equipment', brand: 'Commercial', img: 'https://picsum.photos/seed/stainless5/500/400' },
            ]
        },
        paperrolls: {
            label: 'Paper Rolls',
            items: [
                { name: 'Kraft Paper Rolls', brand: 'Recycled Grade', img: 'https://picsum.photos/seed/paper1/500/400' },
                { name: 'Newsprint Rolls', brand: 'Standard Grade', img: 'https://picsum.photos/seed/paper2/500/400' },
                { name: 'Tissue Base Rolls', brand: 'Light Grade', img: 'https://picsum.photos/seed/paper3/500/400' },
                { name: 'Coated Paper Rolls', brand: 'Premium Grade', img: 'https://picsum.photos/seed/paper4/500/400' },
                { name: 'Liner Board Rolls', brand: 'Heavy Grade', img: 'https://picsum.photos/seed/paper5/500/400' },
            ]
        },
        cardboard: {
            label: 'Cardboard & Paper Scrap',
            items: [
                { name: 'Old Corrugated Cardboard (OCC)', brand: 'Baled', img: 'https://picsum.photos/seed/cardboard1/500/400' },
                { name: 'Mixed Office Paper', brand: 'Sorted', img: 'https://picsum.photos/seed/cardboard2/500/400' },
                { name: 'Sorted White Ledger', brand: 'Grade A', img: 'https://picsum.photos/seed/cardboard3/500/400' },
                { name: 'Double Lined Kraft', brand: 'Grade DLK', img: 'https://picsum.photos/seed/cardboard4/500/400' },
                { name: 'Book Stock Scrap', brand: 'Mixed', img: 'https://picsum.photos/seed/cardboard5/500/400' },
            ]
        },
        plastic: {
            label: 'Plastic Scrap',
            items: [
                { name: 'HDPE Bottle Bales', brand: 'Post-Consumer', img: 'https://picsum.photos/seed/plastic1/500/400' },
                { name: 'PET Bottle Bales', brand: 'Clear Grade', img: 'https://picsum.photos/seed/plastic2/500/400' },
                { name: 'PP Regrind', brand: 'Industrial', img: 'https://picsum.photos/seed/plastic3/500/400' },
                { name: 'LDPE Film Scrap', brand: 'Baled', img: 'https://picsum.photos/seed/plastic4/500/400' },
                { name: 'Mixed Plastic Regrind', brand: 'Sorted', img: 'https://picsum.photos/seed/plastic5/500/400' },
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
                    '<div class="product-name">' + item.name + '</div>' +
                    '<div class="product-brand">' + item.brand + '</div>' +
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