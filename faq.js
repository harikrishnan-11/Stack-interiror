/* =========================
   FAQ ACCORDION
========================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {


    const button  = item.querySelector(".faq-header");
    const content = item.querySelector(".faq-content");
    if (!button || !content) return;

    button.addEventListener("click", () => {

        const isActive     = item.classList.contains("active");
        const targetHeight = content.scrollHeight + "px";

        /* CLOSE ALL ITEMS */
        faqItems.forEach((faq) => {

            faq.classList.remove("active");

            const fc = faq.querySelector(".faq-content");

        
            if (fc) fc.style.maxHeight = "0px";

        });

        /* OPEN CURRENT */
        if (!isActive) {

            item.classList.add("active");

            content.style.maxHeight = targetHeight;

        }

    });

});

