// ==========================================================
// WAIT FOR DOM
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // SELECTORS
    // ==========================================================

    const header = document.querySelector('header');

    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    const closeMenu = document.getElementById('closeMenu');

    const navLinks = document.querySelectorAll(
        '.nav-links a, .mobile-menu a'
    );

    // ==========================================================
    // NAVBAR SCROLL EFFECT
    // ==========================================================

    let lastScroll = 0;

    window.addEventListener('scroll', () => {

        const currentScroll = window.scrollY;

        // ADD BACKGROUND ON SCROLL
        if (currentScroll > 80) {

            header.classList.add('scrolled');

        } else {

            header.classList.remove('scrolled');

        }

        // HIDE / SHOW NAVBAR
        if (currentScroll > lastScroll && currentScroll > 200) {

            header.style.transform = 'translateY(-100%)';

        } else {

            header.style.transform = 'translateY(0)';

        }

        lastScroll = currentScroll;

    });

    // ==========================================================
    // OPEN MOBILE MENU
    // ==========================================================

    hamburger.addEventListener('click', () => {

        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';

    });

    // ==========================================================
    // CLOSE MOBILE MENU
    // ==========================================================

    closeMenu.addEventListener('click', () => {

        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';

    });

    // ==========================================================
    // CLOSE MENU WHEN LINK CLICK
    // ==========================================================

    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';

        });

    });

});

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-links a");

    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
});