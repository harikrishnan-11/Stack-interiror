/* =========================================================
   ABOUT PAGE — REVEAL OBSERVER
   Save as: about-animation.js
   Load AFTER animation.js in about.html
========================================================= */

(function () {

    /* -----------------------------------------------------------
       1. TARGET SELECTORS
       These are the about-page-specific animated elements.
       The global animation.js already handles:
         .reveal, .newsletter-content, .subscribe-wrapper,
         .footer-column, .section-header, .nav-links li, .logo
    ----------------------------------------------------------- */

    const aboutSelectors = [

        /* Priority section — slide panels */
        '.about-slide-left',
        '.about-slide-right',

        /* Experience section */
        '.about-banner-reveal',
        '.about-card',

    ];

    const aboutElements = document.querySelectorAll(
        aboutSelectors.join(', ')
    );


    /* -----------------------------------------------------------
       2. INTERSECTION OBSERVER
    ----------------------------------------------------------- */

    const observer = new IntersectionObserver(

        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);   // fire once
                }
            });
        },

        {
            threshold: 0.08,
            rootMargin: '0px 0px -60px 0px'
        }

    );

    aboutElements.forEach((el) => observer.observe(el));


    /* -----------------------------------------------------------
       3. TRIGGER HERO / ABOVE-THE-FOLD ELEMENTS IMMEDIATELY
       Elements already on screen won't fire the observer, so
       we kick them off after a short paint delay.
    ----------------------------------------------------------- */

    const heroEls = document.querySelectorAll(
        '.about-slide-left, .about-slide-right'
    );

    requestAnimationFrame(() => {
        setTimeout(() => {
            heroEls.forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('active');
                }, i * 160);          // 160 ms stagger per panel
            });
        }, 100);
    });

})();