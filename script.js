/**
 * script.js - Classroom 24k - Final Master (Carousel & Loading Fix)
 */

// --- 1. GOOGLE ANALYTICS ---
(function() {
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-2D22NMRV2Z";
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-2D22NMRV2Z');
})();

// --- 2. UNIVERSAL NAVIGATION ---
function generateNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    nav.innerHTML = `
        <div class="search-container">
            <input type="text" id="gameSearch" placeholder="Search" 
                   onkeydown="if(event.key==='Enter') filterGames()">
        </div>
        <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="popular.html">Popular</a>
            <a href="driving.html">Driving</a>
            <a href="multiplayer.html">Multiplayer</a>
            <a href="sports.html">Sports</a>
        </div>
    `;
}

// --- 3. SEARCH LOGIC ---
function filterGames() {
    let inputField = document.getElementById('gameSearch');
    if (!inputField) return;
    
    let input = inputField.value.toLowerCase();
    const isMainLibrary = window.location.pathname.endsWith('index.html') || 
                          window.location.pathname === '/' || 
                          window.location.pathname.endsWith('.html') === false;
    
    // Redirect to home if searching from a game page
    if (document.getElementById('game-container') || !isMainLibrary) {
        if (input.length > 0) {
            window.location.href = "index.html?search=" + encodeURIComponent(input);
            return;
        }
    }

    let cards = document.getElementsByClassName('game-card');
    const featured = document.querySelector('.featured-banner');
    const carousels = document.querySelectorAll('.carousel-container');
    const libraryHeaders = document.querySelectorAll('.full-library-section h2');

    if (input.length > 0) {
        if (featured) featured.style.display = "none";
        carousels.forEach(c => c.style.display = "none");
        libraryHeaders.forEach(h => h.style.display = "none");
    } else {
        if (featured) featured.style.display = "";
        carousels.forEach(c => c.style.display = "");
        libraryHeaders.forEach(h => h.style.display = "");
    }

    let visibleCount = 0;
    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(input)) {
            card.style.display = "flex"; // Match CSS display
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    }
}

// --- 4. CAROUSEL LOGIC (Fixed for 200px cards + 25px gap) ---
function scrollCarousel(direction, btn) {
    const wrapper = btn.closest('.carousel-container');
    const track = wrapper.querySelector('.carousel-track');
    
    // One card (200px) + Gap (25px) = 225px. 
    // Scroll 4 cards at a time = 900px
    const scrollStep = 900; 
    
    track.scrollBy({ 
        left: direction * scrollStep, 
        behavior: 'smooth' 
    });
}

// --- 5. GAME LOADING (Optimized for Layout Lock) ---
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    if (!container) return;
    
    // Use the existing HTML hover zone or create it
    container.innerHTML = `
        <div class="iframe-hover-zone" onclick="loadIframe('${gameUrl}')">
            <div class="play-content">
                <div class="play-icon" style="font-size:80px; margin-bottom:10px;">▶</div>
                <div class="play-text" style="font-size:2rem; letter-spacing:4px;">PLAY NOW</div>
            </div>
        </div>`;
}

function loadIframe(url) {
    const container = document.getElementById('game-container');
    // Clear the hover zone and inject iframe immediately
    container.innerHTML = `<iframe id="game-frame" src="${url}" allowfullscreen="true"></iframe>`;
}

function openFullscreen() {
    const frame = document.getElementById("game-frame") || document.getElementById("game-container");
    if (frame) {
        if (frame.requestFullscreen) frame.requestFullscreen();
        else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
        else if (frame.msRequestFullscreen) frame.msRequestFullscreen();
    }
}

// --- 6. INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    generateNav();
    
    // Handle Search Redirects from other pages
    const urlParams = new URLSearchParams(window.location.search);
    const searchVal = urlParams.get('search');
    if (searchVal) {
        const input = document.getElementById('gameSearch');
        if (input) { 
            input.value = searchVal; 
            setTimeout(filterGames, 150); 
        }
    }

    // Attach scroll events to carousel buttons if they exist
    document.querySelectorAll('.left-btn').forEach(btn => {
        btn.onclick = () => scrollCarousel(-1, btn);
    });
    document.querySelectorAll('.right-btn').forEach(btn => {
        btn.onclick = () => scrollCarousel(1, btn);
    });
});
