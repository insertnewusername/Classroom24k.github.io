/**
 * script.js - Classroom 24k Final Master
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
        </div>
    `;
}

// --- 3. SEARCH LOGIC (Redirects + UI Filtering) ---
function filterGames() {
    let inputField = document.getElementById('gameSearch');
    if (!inputField) return;
    
    let input = inputField.value.toLowerCase();
    let cards = document.getElementsByClassName('game-card');
    let noResultsMsg = document.getElementById('noResults');
    
    // REDIRECT: If searching from popular.html or a game page, jump to index
    const path = window.location.pathname;
    const isHomePage = path.endsWith('index.html') || path.endsWith('/') || path === "";

    if (!isHomePage && input.length > 0) {
        window.location.href = "index.html?search=" + encodeURIComponent(input);
        return;
    }

    // UI Elements to toggle
    const featuredBanner = document.querySelector('.featured-banner');
    const allCarousels = document.querySelectorAll('.carousel-container');
    const allGamesHeader = document.querySelector('.full-library-section h2');

    if (input.length > 0) {
        // Hide regular layout for search results
        if (featuredBanner) featuredBanner.style.display = "none";
        allCarousels.forEach(c => { c.style.display = "none"; });
        
        if (allGamesHeader) {
            allGamesHeader.innerText = "Search Results";
            allGamesHeader.style.marginTop = "20px";
        }
    } else {
        // Restore regular layout
        if (featuredBanner) featuredBanner.style.display = "flex";
        allCarousels.forEach(c => { c.style.display = "block"; });
        if (allGamesHeader) {
            allGamesHeader.innerText = "All Games";
            allGamesHeader.style.marginTop = "80px";
        }
        if (noResultsMsg) noResultsMsg.style.display = "none";
    }

    let visibleCount = 0;
    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(input)) {
            card.style.display = "flex"; 
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    }

    if (noResultsMsg) {
        noResultsMsg.style.display = (visibleCount === 0 && input.length > 0) ? "block" : "none";
    }
}

// --- 4. CAROUSEL LOGIC (Arrows + Wheel) ---
function scrollCarousel(btn, direction) {
    const container = btn.closest('.carousel-container');
    const track = container.querySelector('.carousel-track');
    // Scroll by roughly 3 cards (200px + 20px gap) * 3 = 660px
    const scrollAmount = 660; 
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function initCarousels() {
    const tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach(track => {
        track.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth && e.deltaY > 0;
                const isAtStart = track.scrollLeft <= 0 && e.deltaY < 0;
                // Only prevent default if we aren't at the very start/end of the track
                if (!isAtEnd && !isAtStart) { 
                    e.preventDefault(); 
                    track.scrollLeft += e.deltaY; 
                }
            }
        }, { passive: false });
    });
}

// --- 5. GAME LOADING (Clean Play Button, No Hover Box) ---
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    if (!container) return;
    
    // Clear the container and add the "Play Now" overlay
    container.innerHTML = `
        <div id="clickableArea" style="width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer; background:#081221;" onclick="loadIframe('${gameUrl}')">
            <div id="playButton" style="transition: transform 0.2s ease; pointer-events: none;">
                <div class="play-icon" style="font-size:120px; color:#00aaff; text-shadow: 0 0 25px rgba(0, 170, 255, 0.6);">▶</div>
                <div class="play-text" style="color:#00aaff; font-size:2rem; letter-spacing:5px; margin-top:10px; font-weight:bold;">PLAY NOW</div>
            </div>
        </div>`;
    
    // Manual hover listener to ensure a snappy scale without blue boxes
    const area = document.getElementById('clickableArea');
    const btn = document.getElementById('playButton');
    area.onmouseenter = () => btn.style.transform = "scale(1.1)";
    area.onmouseleave = () => btn.style.transform = "scale(1)";
}

function loadIframe(url) {
    const container = document.getElementById('game-container');
    container.innerHTML = `<iframe id="game-frame" src="${url}" style="width:100%; height:100%; border:none;" allowfullscreen="true"></iframe>`;
}

function openFullscreen() {
    const elem = document.getElementById("game-container");
    if (elem) {
        if (elem.requestFullscreen) elem.requestFullscreen();
        else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    }
}

// --- 6. INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    generateNav();
    initCarousels();
    
    // Handle cross-page search parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchVal = urlParams.get('search');
    if (searchVal) {
        const input = document.getElementById('gameSearch');
        if (input) { 
            input.value = searchVal; 
            // Small delay to ensure all carousels/cards are rendered before filtering
            setTimeout(filterGames, 150); 
        }
    }
});
