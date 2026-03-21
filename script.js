/* * script.js - Classroom 24k Final Master REPAIR - V5.5
 * Features: Full GA4 Tracking, Search Engine, Smooth Category Redirects, 
 * Infinite-Logic Carousels, Vertical Play Overlay, and Keyboard Hooking.
 */

// ==========================================
// 1. ADVANCED GOOGLE ANALYTICS 4 (GA4)
// ==========================================
(function() {
    // INSERT YOUR ID HERE
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; 
    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        'cookie_flags': 'SameSite=None;Secure',
        'content_group': 'Games'
    });

    // Global Tracking Helper for Buttons/Categories
    window.logEvent = function(action, category, label) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    };
})();

// ==========================================
// 2. SEARCH & FILTERING SYSTEM
// ==========================================
function filterGames() {
    const searchInput = document.getElementById('gameSearch');
    if (!searchInput) return;

    const filter = searchInput.value.toLowerCase();
    const allCards = document.querySelectorAll('.game-card');
    
    let matchCount = 0;

    allCards.forEach(card => {
        const titleText = card.querySelector('h3') ? card.querySelector('h3').innerText.toLowerCase() : '';
        if (titleText.includes(filter)) {
            card.style.display = "flex";
            matchCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Optional: Log search terms to GA to see what users want
    if (filter.length > 3 && window.logEvent) {
        window.logEvent('search', 'user_interaction', filter);
    }
}

// ==========================================
// 3. DYNAMIC GAME LOADER (Vertical Stack)
// ==========================================
function setupGame(gameUrl, gameTitle = "Game") {
    const container = document.getElementById('game-container');
    if (!container) return;

    // Log game start
    if (window.logEvent) window.logEvent('play_press', 'game_flow', gameTitle);

    // Build the Overlay with Vertical Stack (Triangle ABOVE Button)
    container.innerHTML = `
        <div id="play-overlay">
            <div class="neon-triangle">▶</div>
            <div class="play-now-btn" id="launch-trigger">PLAY NOW</div>
            <div class="game-loading-text">LOADING: ${gameTitle.toUpperCase()}</div>
        </div>
        <iframe src="" id="game-iframe" 
                allow="autoplay; fullscreen; keyboard; gamepad" 
                scrolling="no" 
                frameborder="0">
        </iframe>
    `;

    const launchGame = () => {
        const iframe = document.getElementById('game-iframe');
        const overlay = document.getElementById('play-overlay');
        
        iframe.src = gameUrl;
        
        // Visual transition
        overlay.style.transition = "opacity 0.5s ease";
        overlay.style.opacity = "0";
        
        setTimeout(() => {
            overlay.remove();
            iframe.focus(); // Vital for arrow key movement
        }, 500);
    };

    // Attach click to the whole overlay or just the button
    document.getElementById('launch-trigger').addEventListener('click', (e) => {
        e.stopPropagation();
        launchGame();
    });
    
    document.querySelector('.neon-triangle').addEventListener('click', launchGame);
}

// ==========================================
// 4. CATEGORY NAVIGATION & SMOOTH REDIRECTS
// ==========================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const destination = this.getAttribute('href');

            // If it's an internal ID link
            if (destination.startsWith('#')) {
                const targetSection = document.querySelector(destination);
                if (targetSection) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetSection.offsetTop - 100, // Offset for sticky nav
                        behavior: 'smooth'
                    });
                    if (window.logEvent) window.logEvent('nav_click', 'navigation', destination);
                }
            } 
            // Otherwise, it's a real page redirect (let it happen)
        });
    });
}

// ==========================================
// 5. ENHANCED CAROUSEL ENGINE
// ==========================================
function scrollCarousel(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const scrollStep = 600; // Scroll 3 cards at a time
    const target = (direction === 'left') ? track.scrollLeft - scrollStep : track.scrollLeft + scrollStep;

    track.scrollTo({
        left: target,
        behavior: 'smooth'
    });
}

// Mouse Drag-to-Scroll Functionality
function initDragScroll() {
    const tracks = document.querySelectorAll('.carousel-track');
    
    tracks.forEach(track => {
        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.style.cursor = 'grabbing';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = 'pointer';
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = 'pointer';
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; // Scroll multiplier
            track.scrollLeft = scrollLeft - walk;
        });
    });
}

// ==========================================
// 6. INITIALIZATION & FULLSCREEN
// ==========================================
function toggleFullscreen() {
    const gameBox = document.getElementById('game-container');
    if (!gameBox) return;

    if (!document.fullscreenElement) {
        if (gameBox.requestFullscreen) gameBox.requestFullscreen();
        else if (gameBox.webkitRequestFullscreen) gameBox.webkitRequestFullscreen();
        else if (gameBox.msRequestFullscreen) gameBox.msRequestFullscreen();
        if (window.logEvent) window.logEvent('fullscreen_on', 'ui', 'game');
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Search
    const searchInput = document.getElementById('gameSearch');
    if (searchInput) searchInput.addEventListener('input', filterGames);

    // 2. Setup Fullscreen
    const fsBtn = document.querySelector('.fullscreen-btn');
    if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);

    // 3. Setup Nav & Drag
    initNavigation();
    initDragScroll();

    console.log("Classroom 24k Engine V5.5: All 200+ lines active.");
});
