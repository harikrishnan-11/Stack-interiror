
/* =========================================
   MOBILE SIDEBAR
========================================= */

const mobileToggle = document.getElementById("mobileToggle");
const sidebar      = document.getElementById("sidebar");

if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
}

/* =========================================
   ACTIVE SIDEBAR LINKS
========================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {

        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");

        if (window.innerWidth < 900 && sidebar) {
            sidebar.classList.remove("active");
        }
    });
});

/* =========================================
   COUNTER ANIMATION
========================================= */

function animateCounter(counter) {
    if (counter.dataset.animated) return;
    counter.dataset.animated = "true";

    const target    = +counter.getAttribute("data-target");
    let   current   = 0;
    const increment = target / 80;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target;
        }
    };

    updateCounter();
}

/* =========================================
   CHART INITIALISATION (lazy)
   FIX: charts are created only AFTER their
   section is revealed, so the canvas always
   has real dimensions when Chart.js measures it.
========================================= */

let revenueChartCreated = false;
let projectChartCreated = false;

function initRevenueChart() {
    if (revenueChartCreated) return;
    revenueChartCreated = true;

    const canvas = document.getElementById("revenueChart");
    if (!canvas) return;

    new Chart(canvas, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Revenue",
                data: [12000, 19000, 30000, 42000, 50000, 62000],
                borderColor: "#d6b98c",
                backgroundColor: "rgba(214,185,140,.12)",
                fill: true,
                tension: .4,
                borderWidth: 3,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "#ffffff" } } },
            scales: {
                y: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,.08)" } },
                x: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,.08)" } }
            }
        }
    });
}

function initProjectChart() {
    if (projectChartCreated) return;
    projectChartCreated = true;

    const canvas = document.getElementById("projectChart");
    if (!canvas) return;

    new Chart(canvas, {
        type: "doughnut",
        data: {
            labels: ["Completed", "Ongoing", "Planning"],
            datasets: [{
                data: [58, 28, 14],
                backgroundColor: ["#d6b98c", "#395246", "#ffffff"],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "#ffffff" } } }
        }
    });
}

/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

/* =========================================
   SCROLL REVEAL + COUNTER + CHART TRIGGER
========================================= */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");

        // Counters
        entry.target.querySelectorAll(".counter").forEach(animateCounter);

        // Charts — only init once the section is actually visible
        if (entry.target.querySelector("#revenueChart")) initRevenueChart();
        if (entry.target.querySelector("#projectChart")) initProjectChart();

        // Stop watching — reveal + init happen only once
        observer.unobserve(entry.target);
    });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});

/* =========================================
   LOGOUT BUTTON
========================================= */

const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        window.location.href = "./login.html";
    });
}
const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});