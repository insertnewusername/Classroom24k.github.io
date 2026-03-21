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

// --- 3. SEARCH LOGIC ---
function filterGames() {
    let inputField = document.getElementById('gameSearch');
    if (!inputField) return;
    
    let input = inputField.value.toLowerCase();
    
    // Determine if we are on the main library page (index.html)
    // This checks the end of the URL to support both local files and hosted domains
    const isMainLibrary = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    
    // REDIRECTION LOGIC:
    // If we are NOT on index.html, or we are on a game-specific page, redirect to index
    if (!isMainLibrary || document.getElementById('game-container')) {
        if (input.length > 0) {
            window.location.href = "index.html?search=" + encodeURIComponent(input);
            return;
        }
    }

    // FILTERING LOGIC (Only runs if we are on index.html and not playing a game):
    let cards = document.getElementsByClassName('game-card');
    let noResultsMsg = document.getElementById('noResults');
    const featured = document.querySelector('.featured-banner');
    const sections = document.querySelectorAll('.carousel-container, .full-library-section h2');

    if (input.length > 0) {
        if (featured) featured.style.display = "none";
        sections.forEach(s => s.style.display = "none");
    } else {
        if (featured) featured.style.display = "";
        sections.forEach(s => s.style.display = "");
        if (noResultsMsg) noResultsMsg.style.display = "none";
    }

    let visibleCount = 0;
    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(input)) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    }

    if (noResultsMsg) {
        noResultsMsg.style.display = (visibleCount === 0 && input.length > 0) ? "block" : "none";
    }
}

// --- 4. CAROUSEL & UTILS ---
function scrollCarousel(btn, direction) {
    const wrapper = btn.closest('.carousel-wrapper');
    const track = wrapper.querySelector('.carousel-track');
    track.scrollBy({ left: direction * 660, behavior: 'smooth' });
}

function initCarousels() {
    const tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach(track => {
        track.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth && e.deltaY > 0;
                const isAtStart = track.scrollLeft <= 0 && e.deltaY < 0;
                if (!isAtEnd && !isAtStart) { e.preventDefault(); track.scrollLeft += e.deltaY; }
            }
        }, { passive: false });
    });
}

// --- 5. GAME LOADING ---
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    if (!container) return;
    
    container.innerHTML = `
        <div id="clickableArea" class="iframe-hover-zone" style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; cursor:pointer; background:radial-gradient(circle, #1c426e 0%, #081221 100%);" onclick="loadIframe('${gameUrl}')">
            <div id="playButton" style="text-align:center;">
                <div class="play-icon" style="font-size:100px; color:#ffffff; text-shadow: 0 0 15px #00aaff; line-height:1;">▶</div>
                <div class="play-text" style="color:#ffffff; font-size:1.8rem; letter-spacing:6px; margin-top:10px; font-weight:bold; text-shadow: 0 0 10px #00aaff;">PLAY</div>
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
    }
}

// --- 6. INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    generateNav();
    initCarousels();
    const urlParams = new URLSearchParams(window.location.search);
    const searchVal = urlParams.get('search');
    if (searchVal) {
        const input = document.getElementById('gameSearch');
        if (input) { 
            input.value = searchVal; 
            // Give the DOM a moment to settle before filtering
            setTimeout(filterGames, 100); 
        }
    }
});
