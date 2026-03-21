/* script.js - Classroom 24k V5.4 Master */

// 1. ANALYTICS
(function() {
    var ID = 'G-XXXXXXXXXX'; // Replace with yours
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date()); gtag('config', ID);
})();

// 2. SEARCH ENGINE (Works across all pages)
function filterGames() {
    const input = document.getElementById('gameSearch');
    if (!input) return;
    const term = input.value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        // Uses flex to keep the square grid intact
        card.style.display = title.includes(term) ? "flex" : "none";
    });
}

// 3. CATEGORY REDIRECTS (Smooth Scroll / Navigation)
function setupNavigation() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // If it's an anchor link (starts with #)
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // If it's a real page link (like index.html), let it click normally
        });
    });
}

// 4. GAME LOADER (The Vertical Stack Overlay)
function setupGame(url, title = "Game") {
    const container = document.getElementById('game-container');
    if (!container) return;

    container.innerHTML = `
        <div id="play-overlay">
            <div class="neon-triangle">▶</div>
            <div class="play-now-btn">PLAY NOW</div>
            <p style="color:#00aaff; margin-top:20px; font-weight:bold; letter-spacing:1px;">${title.toUpperCase()}</p>
        </div>
        <iframe src="" id="game-iframe" allowfullscreen></iframe>
    `;

    document.getElementById('play-overlay').onclick = () => {
        const iframe = document.getElementById('game-iframe');
        iframe.src = url;
        document.getElementById('play-overlay').remove();
        iframe.focus();
    };
}

// 5. CAROUSEL & INITIALIZE
function scrollCarousel(id, dir) {
    const t = document.getElementById(id);
    if (t) t.scrollBy({ left: dir === 'left' ? -500 : 500, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    const sb = document.getElementById('gameSearch');
    if (sb) sb.oninput = filterGames;
    
    setupNavigation();
    
    const fs = document.querySelector('.fullscreen-btn');
    if (fs) fs.onclick = () => {
        const el = document.getElementById('game-container');
        if (!document.fullscreenElement) el.requestFullscreen();
        else document.exitFullscreen();
    };
});
