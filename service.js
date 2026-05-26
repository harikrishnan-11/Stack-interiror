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