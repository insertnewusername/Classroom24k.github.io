/* script.js - Classroom 24k V4.7 Master */

// --- 1. GOOGLE ANALYTICS (Insert your Measurement ID below) ---
// This ensures your traffic is tracked correctly.
(function() {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // REPLACE WITH YOUR ID
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // REPLACE WITH YOUR ID
})();

// --- 2. GAME LOADING & PLAY OVERLAY ---
/**
 * Sets up the game container with a Play Button before loading the Iframe.
 * This prevents the page from lagging and ensures the neon hover effect is visible.
 */
function setupGame(url) {
    const container = document.getElementById('game-container');
    
    // Create the Play Overlay with the Triangle and "Play Now" text
    // The CSS handles the neon blue-white to solid blue color swap
    container.innerHTML = `
        <div id="play-overlay" style="
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(8, 18, 33, 0.85); display: flex; 
            justify-content: center; align-items: center; z-index: 50; cursor: default;">
            
            <div class="play-now-btn" id="start-game-trigger">
                <span class="neon-triangle" style="margin-right: 12px;">▶</span> PLAY NOW
            </div>
        </div>
        <iframe src="" id="game-iframe" allowfullscreen></iframe>
    `;

    // Click Event to remove overlay and start the game
    document.getElementById('start-game-trigger').addEventListener('click', function(e) {
        e.preventDefault();
        const iframe = document.getElementById('game-iframe');
        iframe.src = url;
        document.getElementById('play-overlay').style.display = 'none';
        
        // Focus the iframe so keyboard controls work immediately
        iframe.focus();
    });
}

// --- 3. FULLSCREEN FUNCTIONALITY ---
/**
 * Targets the game container to expand the game to the whole screen.
 */
function toggleFullscreen() {
    const elem = document.getElementById('game-container');
    
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// --- 4. CAROUSEL SCROLLING ---
/**
 * Scrolls the specific carousel track left or right.
 */
function scrollCarousel(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const scrollAmount = 400; // Adjust for scroll speed
    if (direction === 'left') {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// --- 5. SEARCH & FILTERING ---
/**
 * Filters game cards in real-time based on search input.
 */
function filterGames() {
    const input = document.getElementById('gameSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(input)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// --- 6. INITIALIZATION ---
/**
 * Runs when the page is loaded to set up persistent listeners.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Connect the Search Bar to the filter function
    const searchBar = document.getElementById('gameSearch');
    if (searchBar) {
        searchBar.addEventListener('keyup', filterGames);
    }

    // Connect the Fullscreen button
    const fsBtn = document.querySelector('.fullscreen-btn');
    if (fsBtn) {
        fsBtn.addEventListener('click', toggleFullscreen);
    }

    // Optional: Log to console to verify script loaded
    console.log("Classroom 24k V4.7 Engine: Active");
});
