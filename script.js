/* script.js - Classroom 24k V5.9 Master Restoration */

// 1. GOOGLE ANALYTICS
(function() {
    const G_ID = 'G-XXXXXXXXXX'; // Replace with yours
    const s = document.createElement('script');
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${G_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date()); gtag('config', G_ID);
})();

// 2. SEARCH ENGINE
function filterGames() {
    const term = document.getElementById('gameSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        const title = card.querySelector('h3') ? card.querySelector('h3').innerText.toLowerCase() : '';
        card.style.display = title.includes(term) ? "flex" : "none";
    });
}

// 3. GAME LOADER
function setupGame(url) {
    const container = document.getElementById('game-container');
    if (!container) return;

    // "Game" text removed as requested
    container.innerHTML = `
        <div id="play-overlay">
            <div class="neon-triangle">▶</div>
            <div class="play-now-btn">PLAY NOW</div>
        </div>
        <iframe src="" id="game-iframe" allowfullscreen></iframe>
    `;

    document.getElementById('play-overlay').onclick = function() {
        const iframe = document.getElementById('game-iframe');
        iframe.src = url;
        this.remove(); // Removes overlay so game is clickable
        iframe.focus();
    };
}

// 4. FULLSCREEN (Fixed Aesthetic)
function toggleFullscreen() {
    const container = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) container.requestFullscreen();
        else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 5. CAROUSEL & INIT
function scrollCarousel(id, dir) {
    const track = document.getElementById(id);
    if(track) track.scrollBy({ left: dir === 'left' ? -600 : 600, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('gameSearch');
    if (search) search.oninput = filterGames;

    const fsBtn = document.querySelector('.fullscreen-btn');
    if (fsBtn) fsBtn.onclick = toggleFullscreen;

    // Restore Category Scroll
    document.querySelectorAll('.carousel-track').forEach(track => {
        let isDown = false; let startX; let scrollLeft;
        track.onmousedown = (e) => { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; };
        track.onmouseleave = () => isDown = false;
        track.onmouseup = () => isDown = false;
        track.onmousemove = (e) => { if(!isDown) return; e.preventDefault(); const x = e.pageX - track.offsetLeft; const walk = (x - startX) * 2; track.scrollLeft = scrollLeft - walk; };
    });
});
