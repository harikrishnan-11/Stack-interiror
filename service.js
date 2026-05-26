document.querySelectorAll(".service-card").forEach((card) => {

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // tilt up/down
        const rotateY = ((x - centerX) / centerX) * 10;  // tilt left/right

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
            scale(1.02)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0px)
            scale(1)
        `;
    });

});
/* =========================================================
   REVEAL ANIMATION
========================================================= */

const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* =========================================================
   TIMELINE PROGRESS
========================================================= */

const timeline = document.querySelector(".timeline");
const progress = document.getElementById("timelineProgress");

window.addEventListener("scroll", () => {

    const rect = timeline.getBoundingClientRect();

    const windowHeight = window.innerHeight;

    const totalHeight = rect.height;

    const visible = windowHeight - rect.top;

    let percent = (visible / totalHeight) * 100;

    percent = Math.max(0, Math.min(percent, 100));

    progress.style.height = percent + "%";

});

/* =========================================================
   ACCORDION WITH REVEAL RE-CALCULATION FIX
========================================================= */
document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', (e) => {
        e.stopPropagation(); // Stops the click from bubbling up

        const faqItem = header.parentElement;
        const faqContent = header.nextElementSibling;
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        // 1. Close other open items safely
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
                const otherHeader = item.querySelector('.faq-header');
                const otherContent = item.querySelector('.faq-content');
                if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                if (otherContent) otherContent.style.maxHeight = "0px";
            }
        });

        // 2. Toggle current item
        faqItem.classList.toggle('active');
        header.setAttribute('aria-expanded', !isExpanded);

        if (faqItem.classList.contains('active')) {
            faqContent.style.maxHeight = faqContent.scrollHeight + "px";
        } else {
            faqContent.style.maxHeight = "0px";
        }

        // 3. FORCE REVEAL CHECK: Explicitly run your scroll checker 
        // after the layout shifts so items don't accidentally hide.
        setTimeout(() => {
            if (typeof revealOnScroll === 'function') {
                revealOnScroll();
            }
        }, 100); // Matches your 0.4s transition duration
    });
});