document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (!track || !prevBtn || !nextBtn) return;

    const cards = document.querySelectorAll(".category-card");

    let currentIndex = 0;

    /* =========================================
       CARD WIDTH + GAP
    ========================================= */

    const getScrollAmount = () => {

        const card = cards[0];

        const gap =
            parseInt(window.getComputedStyle(track).gap) || 0;

        return card.offsetWidth + gap;
    };

    /* =========================================
       UPDATE BUTTON STATES
    ========================================= */

    function updateButtons() {

        /* FIRST CARD */
        if (currentIndex <= 0) {

            prevBtn.style.opacity = "0.5";
            prevBtn.style.pointerEvents = "none";

        } else {

            prevBtn.style.opacity = "1";
            prevBtn.style.pointerEvents = "auto";
        }

        /* LAST CARD */
        if (currentIndex >= cards.length - 1) {

            nextBtn.style.opacity = "0.5";
            nextBtn.style.pointerEvents = "none";

        } else {

            nextBtn.style.opacity = "1";
            nextBtn.style.pointerEvents = "auto";
        }
    }

    /* =========================================
       NEXT BUTTON
    ========================================= */

    nextBtn.addEventListener("click", () => {

        if (currentIndex >= cards.length - 1) return;

        currentIndex++;

        track.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });

        updateButtons();
    });

    /* =========================================
       PREVIOUS BUTTON
    ========================================= */

    prevBtn.addEventListener("click", () => {

        if (currentIndex <= 0) return;

        currentIndex--;

        track.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });

        updateButtons();
    });

    /* =========================================
       INITIAL BUTTON STATE
    ========================================= */

    updateButtons();

});