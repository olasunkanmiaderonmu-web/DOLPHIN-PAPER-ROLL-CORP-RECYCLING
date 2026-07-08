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
   CONTACT FORM — EmailJS integration
   -----------------------------------------------------------
   1. Create a free account at https://www.emailjs.com
   2. Add an Email Service (e.g. Gmail) -> copy the SERVICE ID
   3. Create an Email Template with these variables in the body:
        {{fullName}}  {{email}}  {{phone}}  {{message}}
      and set the template's "To Email" field to the address
      you want messages delivered to (your designated inbox).
      Copy the TEMPLATE ID.
   4. Go to Account -> General -> copy your PUBLIC KEY.
   5. Paste all three values below.
   =========================================================== */
(function () {
    const EMAILJS_PUBLIC_KEY = "DIb-Z4LWdvpaD8lvO";   // e.g. "a1B2c3D4e5F6g7H8"
    const EMAILJS_SERVICE_ID = "service_31c4usq";   // e.g. "service_abc1234"
    const EMAILJS_TEMPLATE_ID = "template_pvzvse6"; // e.g. "template_xyz9876"

    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const statusEl = document.getElementById("formStatus");
    if (!form || !submitBtn || !statusEl) return;

    if (typeof emailjs === "undefined") {
        console.error("EmailJS SDK failed to load. Check your internet connection or the <script> tag in contact.html.");
        return;
    }

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    function showStatus(type, message) {
        statusEl.classList.remove("success", "error", "show");
        statusEl.innerHTML =
            `<i class="bi ${type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"}"></i>` +
            `<span>${message}</span>`;
        // Force reflow so the transition re-triggers even if a message is already shown
        void statusEl.offsetWidth;
        statusEl.classList.add(type, "show");
    }

    function hideStatus() {
        statusEl.classList.remove("show");
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        hideStatus();
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(function () {
                showStatus("success", "Your request has been submitted successfully! We'll get back to you shortly.");
                form.reset();
            })
            .catch(function (error) {
                console.error("EmailJS error:", error);
                showStatus("error", "Something went wrong sending your message. Please try again or contact us directly.");
            })
            .finally(function () {
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;
            });
    });
})();


/* ===========================================================
   WHATSAPP CHAT BUTTON
   -----------------------------------------------------------
   Set your WhatsApp number (country code + number, no spaces,
   no "+" or leading zeros) and an optional pre-filled message.
   =========================================================== */
(function () {
    const WHATSAPP_NUMBER = "+2349077336298";
    const WHATSAPP_MESSAGE = "Hello, I'd like to get a pricing for scrap recycling.";

    const whatsappBtn = document.getElementById("whatsappBtn");
    if (!whatsappBtn) return;

    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
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