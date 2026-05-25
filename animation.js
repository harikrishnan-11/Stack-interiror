/* =========================================================
   PREMIUM REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(`
.reveal,
.hero-title,
.hero-desc,
.hero-btn,
.stat,
.top-image,
.bottom-image,
.about-text,
.about-images,
.img-wrap,
.feature,
.feature__img-wrap,
.feature__text,
.newsletter-content,
.subscribe-wrapper,
.footer-column,
.nav-links li,
.logo,
.categories-section,
.section-header,
.carousel-container,
.category-card,
.services-section,
.service-item,
.design-section,
.image-wrapper,
.content-wrapper,
.accordion-item,
.steps-section,
.steps-left,
.steps-right,
.timeline-item,
.testimonials-section,
.testimonial-card
`);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        }

    });

},{

    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px"

});

revealElements.forEach((el) => {

    observer.observe(el);

});
