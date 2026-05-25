document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    // Clone cards for infinite loop
    const cards = Array.from(track.children);

    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    // Scroll amount
    const getScrollAmount = () => {
        const card = document.querySelector(".category-card");
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;

        return card.offsetWidth + gap;
    };

    // NEXT BUTTON
    nextBtn.addEventListener("click", () => {

        track.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });

        // Infinite Loop Reset
        setTimeout(() => {

            const maxScroll =
                track.scrollWidth / 2;

            if (track.scrollLeft >= maxScroll) {

                track.scrollLeft = 0;

            }

        }, 500);

    });

    // PREVIOUS BUTTON
    prevBtn.addEventListener("click", () => {

        // If at start jump to middle
        if (track.scrollLeft <= 0) {

            track.scrollLeft =
                track.scrollWidth / 2;

        }

        track.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });

    });

});