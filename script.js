/* script.js - Classroom 24k V4.8 Master */

// --- 1. GOOGLE ANALYTICS (Auto-Config) ---
(function() {
    var GA_ID = 'G-XXXXXXXXXX'; // <-- CHANGE THIS ONCE
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_ID);

    // Helper for tracking specific game plays
    window.trackGame = function(name) {
        gtag('event', 'play_game', { 'game_name': name });
    };
})();

// --- 2. GAME LOADING & PLAY OVERLAY ---
function setupGame(url, gameName = "Game") {
    const container = document.getElementById('game-container');
    if(!container) return;

    // Track which game is being loaded
    if(window.trackGame) window.trackGame(gameName);

    container.innerHTML = `
        <div id="play-overlay" style="
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(8, 18, 33, 0.85); display: flex; 
            justify-content: center; align-items: center; z-index: 50; cursor: default;">
            
            <div class="play-now-btn" id="start-game-trigger">
                <span class="neon-triangle" style="margin-right: 12px;">▶</span> PLAY NOW
            </div>
        </div>
        <iframe src="" id="game-iframe" allow="autoplay; fullscreen; keyboard" allowfullscreen></iframe>
    `;

    document.getElementById('start-game-trigger').addEventListener('click', function(e) {
        e.preventDefault();
        const iframe = document.getElementById('game-iframe');
        const overlay = document.getElementById('play-overlay');
        
        iframe.src = url;
        
        // Use a slight fade out for polish, then REMOVE from DOM
        overlay.style.transition = "opacity 0.3s";
        overlay.style.opacity = "0";
        setTimeout(() => { 
            overlay.remove(); 
            iframe.focus(); // Vital for keyboard controls!
        }, 300);
    });
}

// --- 3. FULLSCREEN FUNCTIONALITY ---
function toggleFullscreen() {
    const elem = document.getElementById('game-container');
    if (!elem) return;

    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) { elem.requestFullscreen(); }
        else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); }
        else if (elem.msRequestFullscreen) { elem.msRequestFullscreen(); }
    } else {
        document.exitFullscreen();
    }
}

// --- 4. CAROUSEL SCROLLING ---
function scrollCarousel(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const scrollAmount = 450; // Matches card width + gap
    track.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
    });
}

// --- 5. SEARCH & FILTERING ---
function filterGames() {
    const input = document.getElementById('gameSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(input) ? "flex" : "none";
    });
}

// --- 6. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('gameSearch');
    if (searchBar) {
        searchBar.addEventListener('input', filterGames); // 'input' is smoother than 'keyup'
    }

    const fsBtn = document.querySelector('.fullscreen-btn');
    if (fsBtn) {
        fsBtn.addEventListener('click', toggleFullscreen);
    }
    
    console.log("Classroom 24k V4.8: Engine Online");
});
