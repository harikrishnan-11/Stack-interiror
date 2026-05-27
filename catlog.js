document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (!track) return;

    /* =========================================
       ORIGINAL CARDS
    ========================================= */

    const cards = [...track.children];

    /* =========================================
       DUPLICATE CARDS
    ========================================= */

    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    /* =========================================
       CARD WIDTH
    ========================================= */

    const getCardWidth = () => {

        const card = track.querySelector(".category-card");

        const gap =
            parseInt(window.getComputedStyle(track).gap) || 0;

        return card.offsetWidth + gap;
    };

    /* =========================================
       NEXT BUTTON
    ========================================= */

    nextBtn.addEventListener("click", () => {

        const moveAmount = getCardWidth();

        track.scrollBy({
            left: moveAmount,
            behavior: "smooth"
        });

        /* LOOP RESET */
        setTimeout(() => {

            const halfWidth =
                track.scrollWidth / 2;

            if (track.scrollLeft >= halfWidth) {

                track.scrollLeft = 0;

            }

        }, 400);

    });

    /* =========================================
       PREV BUTTON
    ========================================= */

    prevBtn.addEventListener("click", () => {

        const moveAmount = getCardWidth();

        /* IF FIRST CARD */
        if (track.scrollLeft <= 0) {

            track.scrollLeft =
                track.scrollWidth / 2;

        }

        track.scrollBy({
            left: -moveAmount,
            behavior: "smooth"
        });

    });

});