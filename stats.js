/* =========================================================
   PREMIUM STATS COUNT ANIMATION
========================================================= */

const counters = document.querySelectorAll(".stat h2");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = +counter.innerText.replace("+","");

            let current = 0;

            const increment = target / 120;

            const updateCounter = () => {

                current += increment;

                if(current < target){

                    counter.innerText = Math.ceil(current) + "+";

                    requestAnimationFrame(updateCounter);

                }else{

                    counter.innerText = target + "+";

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

},{
    threshold:0.5
});

/* =========================================================
   OBSERVE COUNTERS
========================================================= */

counters.forEach(counter => {

    counterObserver.observe(counter);

});