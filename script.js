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

// --- 3. SEARCH LOGIC (Redirects + Vanishing UI) ---
function filterGames() {
    let inputField = document.getElementById('gameSearch');
    if (!inputField) return;
    
    let input = inputField.value.toLowerCase();
    let cards = document.getElementsByClassName('game-card');
    let noResultsMsg = document.getElementById('noResults');
    
    // REDIRECT logic: Send to index if searching from anywhere else
    const path = window.location.pathname;
    const isHomePage = path.endsWith('index.html') || path.endsWith('/') || path === "";

    if (!isHomePage && input.length > 0) {
        window.location.href = "index.html?search=" + encodeURIComponent(input);
        return;
    }

    const featuredBanner = document.querySelector('.featured-banner');
    const allCarousels = document.querySelectorAll('.carousel-container');
    const allGamesHeader = document.querySelector('.full-library-section h2');

    if (input.length > 0) {
        // HIDE UI for Search Mode
        if (featuredBanner) featuredBanner.style.display = "none";
        allCarousels.forEach(c => { c.style.display = "none"; });
        
        if (allGamesHeader) {
            allGamesHeader.innerText = "Search Results";
            allGamesHeader.style.marginTop = "20px";
        }
    } else {
        // RESET UI to Normal Mode
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

// --- 4. CAROUSEL LOGIC ---
function scrollCarousel(btn, direction) {
    const container = btn.closest('.carousel-container');
    const track = container.querySelector('.carousel-track');
    const scrollAmount = 600; 
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function initCarousels() {
    const tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach(track => {
        track.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth && e.deltaY > 0;
                const isAtStart = track.scrollLeft <= 0 && e.deltaY < 0;
                if (!isAtEnd && !isAtStart) { 
                    e.preventDefault(); 
                    track.scrollLeft += e.deltaY; 
                }
            }
        }, { passive: false });
    });
}

// --- 5. GAME LOADING & PLAYER ---
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    if (!container) return;
    
    // Re-applied the clean, no-background look for the play button
    container.innerHTML = `
        <div id="clickableArea" style="width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer; background:#081221;" onclick="loadIframe('${gameUrl}')">
            <div id="playButton" style="background:none; animation:none; box-shadow:none;">
                <div class="play-icon" style="font-size:120px; color:#00aaff; text-shadow: 0 0 20px rgba(0, 170, 255, 0.6);">▶</div>
                <div class="play-text" style="color:#00aaff; font-size:2rem; letter-spacing:5px; margin-top:10px;">PLAY NOW</div>
            </div>
        </div>`;
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
    
    // Automatically filter if returning from a search redirect
    const urlParams = new URLSearchParams(window.location.search);
    const searchVal = urlParams.get('search');
    if (searchVal) {
        const input = document.getElementById('gameSearch');
        if (input) { 
            input.value = searchVal; 
            setTimeout(filterGames, 150); 
        }
    }
});
