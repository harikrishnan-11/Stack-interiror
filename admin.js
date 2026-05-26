// ─────────────────────────────
// CORE VARIABLES
// ─────────────────────────────
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');

const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mobileToggle = document.getElementById('mobileToggle');
const closeBtn = document.getElementById('closeSidebar');
const menuIcon = document.querySelector('#mobileToggle i');

// ─────────────────────────────
// PAGE TITLES
// ─────────────────────────────
const titles = {
    dashboard: 'Admin Dashboard',
    projects: 'Projects',
    clients: 'Clients',
    team: 'Team',
    payments: 'Payments',
    analytics: 'Analytics',
    messages: 'Messages',
    calendar: 'Calendar',
    inventory: 'Inventory',
    settings: 'Settings',
};

// ─────────────────────────────
// NAVIGATION SYSTEM
// ─────────────────────────────
function navigate(pageName) {

    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    const target = document.getElementById('page-' + pageName);
    if (target) target.classList.add('active');

    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) activeLink.classList.add('active');

  

    // close sidebar on mobile
    if (window.innerWidth <= 900) {
        closeSidebar();
    }

    // PAGE SPECIFIC ACTIONS
    if (pageName === 'dashboard') {
        initDashboardCharts();
    }

    if (pageName === 'analytics') {
        setTimeout(() => initAnalyticsCharts(true), 80);
    }

    if (pageName === 'calendar') {
        buildCalendar();
    }
}

// attach nav clicks
navLinks.forEach(link => {
    link.addEventListener('click', () => navigate(link.dataset.page));
});

// ─────────────────────────────
// SIDEBAR CONTROLS
// ─────────────────────────────
function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    if (menuIcon) menuIcon.className = 'fa-solid fa-xmark';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    if (menuIcon) menuIcon.className = 'fa-solid fa-bars';
}

mobileToggle?.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('open');
    isOpen ? closeSidebar() : openSidebar();
});

closeBtn?.addEventListener('click', closeSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);

// ─────────────────────────────
// COUNTERS
// ─────────────────────────────
function runCounters() {
    document.querySelectorAll('.counter').forEach(el => {
        const target = +el.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 60);

        const timer = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = count;
            if (count >= target) clearInterval(timer);
        }, 20);
    });
}

document.addEventListener('DOMContentLoaded', runCounters);

// ─────────────────────────────
// CHART SYSTEM
// ─────────────────────────────
let activeCharts = {};

function getChartColors() {
    const isLight = document.body.classList.contains('light-theme');
    return {
        text: isLight ? 'rgba(26,21,8,0.7)' : 'rgba(240,236,228,0.7)',
        grid: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)',
        accent: isLight ? 'rgba(163,132,70,0.8)' : 'rgba(200,169,110,0.7)',
        accentLine: isLight ? 'rgba(163,132,70,1)' : 'rgba(200,169,110,1)',
        accentFill: isLight ? 'rgba(163,132,70,0.1)' : 'rgba(200,169,110,0.1)'
    };
}

function buildGlobalOptions() {
    const c = getChartColors();
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: c.text,
                    font: { family: 'Outfit' }
                }
            }
        },
        scales: {
            x: { ticks: { color: c.text }, grid: { color: c.grid } },
            y: { ticks: { color: c.text }, grid: { color: c.grid } }
        }
    };
}

// ─────────────────────────────
// DASHBOARD CHARTS
// ─────────────────────────────
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function initDashboardCharts() {
    const c = getChartColors();

    if (activeCharts.revenue) activeCharts.revenue.destroy();
    if (activeCharts.project) activeCharts.project.destroy();

    const rev = document.getElementById('revenueChart');
    const proj = document.getElementById('projectChart');

    if (rev) {
        activeCharts.revenue = new Chart(rev, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Revenue',
                    data: [120,190,150,210,180,240,200,310,280,350,290,410],
                    backgroundColor: c.accent,
                    borderRadius: 6
                }]
            },
            options: buildGlobalOptions()
        });
    }

    if (proj) {
        activeCharts.project = new Chart(proj, {
            type: 'doughnut',
            data: {
                labels: ['Completed','In Progress','Planning'],
                datasets: [{
                    data: [45,35,20],
                    backgroundColor: [
                        'rgba(76,175,130,0.8)',
                        'rgba(200,169,110,0.8)',
                        'rgba(240,165,0,0.7)'
                    ]
                }]
            },
            options: buildGlobalOptions()
        });
    }
}

// ─────────────────────────────
// ANALYTICS CHARTS (FIXED)
// ─────────────────────────────
function initAnalyticsCharts(force = false) {

    const revenueEl = document.getElementById('revenueChart2');
    const resourceEl = document.getElementById('resourceChart');

    if (!revenueEl || !resourceEl) return;

    if (activeCharts.revenue2 && force) {
        activeCharts.revenue2.destroy();
        activeCharts.resource.destroy();
    }

    const c = getChartColors();

    activeCharts.revenue2 = new Chart(revenueEl, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Revenue',
                data: [120,190,150,210,180,240,200,310,280,350,290,410],
                borderColor: c.accentLine,
                backgroundColor: c.accentFill,
                fill: true,
                tension: 0.4
            }]
        },
        options: buildGlobalOptions()
    });

    activeCharts.resource = new Chart(resourceEl, {
        type: 'radar',
        data: {
            labels: ['Design','Sourcing','Architecture','Management','3D'],
            datasets: [{
                label: 'Hours',
                data: [85,65,90,70,95],
                borderColor: c.accentLine,
                backgroundColor: c.accentFill
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: c.text } }
            },
            scales: {
                r: {
                    grid: { color: c.grid },
                    pointLabels: { color: c.text },
                    ticks: { display: false }
                }
            }
        }
    });
}

// ─────────────────────────────
// THEME TOGGLE
// ─────────────────────────────
document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    const icon = document.querySelector('#themeToggleBtn i');
    if (icon) {
        icon.className = document.body.classList.contains('light-theme')
            ? 'fa-solid fa-sun'
            : 'fa-solid fa-moon';
    }

    initDashboardCharts();
});

// ─────────────────────────────
// CALENDAR
// ─────────────────────────────
function buildCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid || grid.children.length) return;

    const today = 26;
    const eventDays = [5, 12, 19, 26];
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    days.forEach(d => {
        const el = document.createElement('div');
        el.className = 'cal-day-name';
        el.textContent = d;
        grid.appendChild(el);
    });

    for (let i = 0; i < 5; i++) {
        grid.appendChild(document.createElement('div'));
    }

    for (let d = 1; d <= 31; d++) {
        const el = document.createElement('div');

        el.className =
            'cal-day' +
            (d === today ? ' today' : '') +
            (eventDays.includes(d) ? ' has-event' : '');

        el.textContent = d;
        grid.appendChild(el);
    }
}

// ─────────────────────────────
// INITIAL LOAD
// ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initDashboardCharts();
});

document.addEventListener("DOMContentLoaded", () => {
    const email = localStorage.getItem("loggedInEmail");

    const emailElement = document.querySelector(".email");
    if (emailElement && email) {
        emailElement.textContent = email;
    }
});