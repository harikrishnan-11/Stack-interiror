// ── NAVIGATION ENGINE ──
const pages     = document.querySelectorAll('.page');
const navLinks  = document.querySelectorAll('.nav-link');
const pageTitle = document.getElementById('pageTitle');

const titles = {
    dashboard: 'Admin Dashboard',
    projects:  'Projects',
    clients:   'Clients',
    team:      'Team',
    payments:  'Payments',
    analytics: 'Analytics',
    messages:  'Messages',
    calendar:  'Calendar',
    inventory: 'Inventory',
    settings:  'Settings',
};

function navigate(pageName) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    const target = document.getElementById('page-' + pageName);
    if (target) {
        target.classList.add('active');
    }

    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    pageTitle.textContent = titles[pageName] || pageName;

    if (window.innerWidth <= 900) {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('active');
    }

    if (pageName === 'analytics') initAnalyticsCharts();
    if (pageName === 'calendar') buildCalendar();
}

navLinks.forEach(link => {
    link.addEventListener('click', () => navigate(link.dataset.page));
});

// ── RESPONSIVE MOBILE NAVIGATION TOGGLE ──
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mobileToggle = document.getElementById('mobileToggle');

mobileToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    if (isOpen) {
        sidebarOverlay.classList.add('active');
    } else {
        sidebarOverlay.classList.remove('active');
    }
});

sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
});

// ── METRIC ANIMATED COUNTERS ──
function runCounters() {
    document.querySelectorAll('.counter').forEach(el => {
        const target = +el.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 60);
        const t = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = count;
            if (count >= target) clearInterval(t);
        }, 20);
    });
}
document.addEventListener('DOMContentLoaded', runCounters);

// ── GLOBAL CHART MANAGEMENT ──
let activeCharts = {};

function getChartColors() {
    const isLight = document.body.classList.contains('light-theme');
    return {
        text: isLight ? 'rgba(26,21,8,0.7)' : 'rgba(240,236,228,0.7)',
        grid: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
        accent: isLight ? 'rgba(163,132,70,0.7)' : 'rgba(200,169,110,0.7)',
        accentLine: isLight ? 'rgba(163,132,70,1)' : 'rgba(200,169,110,1)',
        accentFill: isLight ? 'rgba(163,132,70,0.1)' : 'rgba(200,169,110,0.1)'
    };
}

function buildGlobalOptions() {
    const colors = getChartColors();
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            legend: { labels: { color: colors.text, font: { family: 'Outfit', size: 12 } } } 
        },
        scales: {
            x: { ticks: { color: colors.text, font: { family: 'Outfit' } }, grid: { color: colors.grid } },
            y: { ticks: { color: colors.text, font: { family: 'Outfit' } }, grid: { color: colors.grid } }
        }
    };
}

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function initDashboardCharts() {
    if (activeCharts.revenue) activeCharts.revenue.destroy();
    if (activeCharts.project) activeCharts.project.destroy();

    const colors = getChartColors();

    activeCharts.revenue = new Chart(document.getElementById('revenueChart'), {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Revenue ($K)',
                data: [120,190,150,210,180,240,200,310,280,350,290,410],
                backgroundColor: colors.accent,
                borderRadius: 6,
            }]
        },
        options: buildGlobalOptions()
    });

    activeCharts.project = new Chart(document.getElementById('projectChart'), {
        type: 'doughnut',
        data: {
            labels: ['Completed','In Progress','Planning'],
            datasets: [{
                data: [45, 35, 20],
                backgroundColor: ['rgba(76,175,130,0.8)','rgba(200,169,110,0.8)','rgba(240,165,0,0.7)'],
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: colors.text, font: { family: 'Outfit' } } } }
        }
    });
}

function initAnalyticsCharts(forceRebuild = false) {
    const chartEl1 = document.getElementById('revenueChart2');
    if (!chartEl1) return;

    if (activeCharts.revenue2) {
        if (!forceRebuild) return;
        activeCharts.revenue2.destroy();
    }
    if (activeCharts.resource) activeCharts.resource.destroy();

    const colors = getChartColors();

    activeCharts.revenue2 = new Chart(chartEl1, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Revenue ($K)',
                data: [120,190,150,210,180,240,200,310,280,350,290,410],
                borderColor: colors.accentLine,
                backgroundColor: colors.accentFill,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: colors.accentLine,
            }]
        },
        options: buildGlobalOptions()
    });

    activeCharts.resource = new Chart(document.getElementById('resourceChart'), {
        type: 'radar',
        data: {
            labels: ['Design', 'Sourcing', 'Architecture', 'Management', '3D Modeling'],
            datasets: [{
                label: 'Allocated Hours',
                data: [85, 65, 90, 70, 95],
                borderColor: colors.accentLine,
                backgroundColor: colors.accentFill,
                pointBackgroundColor: colors.accentLine
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: colors.text, font: { family: 'Outfit' } } } },
            scales: {
                r: {
                    angleLines: { color: colors.grid },
                    grid: { color: colors.grid },
                    pointLabels: { color: colors.text, font: { family: 'Outfit' } },
                    ticks: { display: false }
                }
            }
        }
    });
}

// Initial dashboard layout load
document.addEventListener('DOMContentLoaded', initDashboardCharts);

// ── CALENDAR GENERATOR ENGINE ──
function buildCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid || grid.children.length > 0) return;

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
        const blank = document.createElement('div');
        grid.appendChild(blank);
    }
    
    for (let d = 1; d <= 31; d++) {
        const el = document.createElement('div');
        el.className = 'cal-day' + (d === today ? ' today' : '') + (eventDays.includes(d) && d !== today ? ' has-event' : '');
        el.textContent = d;
        grid.appendChild(el);
    }
}

// ── FIXED THEME TOGGLE ENGINE ──
document.getElementById('themeToggleBtn').addEventListener('click', () => {
    const body = document.body;
    const icon = document.querySelector('#themeToggleBtn i');
    
    // Toggle class on body directly
    body.classList.toggle('light-theme');
    
    // Update icon style cleanly
    if (body.classList.contains('light-theme')) {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }

    // Force refresh charts to recalibrate current color palettes
    initDashboardCharts();
    if (document.getElementById('page-analytics').classList.contains('active')) {
        initAnalyticsCharts(true);
    }
});