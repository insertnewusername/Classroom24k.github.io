/**
 * Classroom 24k - Global Engine V5.7
 * Full Restoration: GA4, Search, Carousel, Navigation, Vertical UI
 */

// ==========================================
// 1. ANALYTICS ENGINE (GA4)
// ==========================================
(function() {
    const GA_ID = 'G-XXXXXXXXXX'; // REPLACE WITH YOUR ID
    const s = document.createElement('script');
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID);

    window.logAction = (type, name) => {
        gtag('event', type, { 'item_name': name });
    };
})();

// ==========================================
// 2. SEARCH & CATEGORY FILTER
// ==========================================
function filterGames() {
    const input = document.getElementById('gameSearch');
    if (!input) return;
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        // Maintain flex display to protect the 180px square layout
        card.style.display = title.includes(filter) ? "flex" : "none";
    });
}

// ==========================================
// 3. NAVIGATION REDIRECTS (Smooth Scroll)
// ==========================================
function initNav() {
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 100, // Offset for sticky nav
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==========================================
// 4. GAME LOADER & VERTICAL UI
// ==========================================
function setupGame(url, title = "Game") {
    const container = document.getElementById('game-container');
    if (!container) return;

    if (window.logAction) window.logAction('game_load', title);

    container.innerHTML = `
        <div id="play-overlay">
            <div class="neon-triangle">▶</div>
            <div class="play-now-btn">PLAY NOW</div>
            <p style="color:#00aaff; margin-top:25px; font-weight:bold; letter-spacing:2px;">${title.toUpperCase()}</p>
        </div>
        <iframe src="" id="game-iframe" allow="autoplay; fullscreen; keyboard; gamepad" allowfullscreen></iframe>
    `;

    const start = () => {
        const iframe = document.getElementById('game-iframe');
        iframe.src = url;
        const overlay = document.getElementById('play-overlay');
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            iframe.focus();
        }, 300);
    };

    document.getElementById('play-overlay').onclick = start;
}

// ==========================================
// 5. CAROUSEL SYSTEM (Scroll & Drag)
// ==========================================
function scrollCarousel(id, dir) {
    const track = document.getElementById(id);
    if (!track) return;
    const amount = dir === 'left' ? -600 : 600;
    track.scrollBy({ left: amount, behavior: 'smooth' });
}

function initDrag() {
    const tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach(track => {
        let isDown = false; let startX; let scrollLeft;
        track.addEventListener('mousedown', (e) => {
            isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', () => isDown = false);
        track.addEventListener('mouseup', () => isDown = false);
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
    });
}

// ==========================================
// 6. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('gameSearch');
    if (search) search.oninput = filterGames;

    initNav();
    initDrag();

    const fsBtn = document.querySelector('.fullscreen-btn');
    if (fsBtn) {
        fsBtn.onclick = () => {
            const container = document.getElementById('game-container');
            if (!document.fullscreenElement) container.requestFullscreen();
            else document.exitFullscreen();
        };
    }
    console.log("Classroom 24k V5.7 Master Restored.");
});
