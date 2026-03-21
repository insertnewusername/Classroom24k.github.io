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
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage !== "index.html" && currentPage !== "" && input.length > 0) {
        window.location.href = "index.html?search=" + encodeURIComponent(input);
        return;
    }

    const featuredBanner = document.querySelector('.featured-banner');
    const allCarousels = document.querySelectorAll('.carousel-container');
    const allGamesHeader = document.querySelector('.full-library-section h2');

    if (input.length > 0) {
        // HIDE UI
        if (featuredBanner) featuredBanner.style.display = "none";
        allCarousels.forEach(c => { c.style.display = "none"; });
        if (allGamesHeader) {
            allGamesHeader.innerText = "Search Results";
            allGamesHeader.style.marginTop = "20px";
        }
    } else {
        // RESET UI
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
        <div id="clickableArea" style="width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer; background:radial-gradient(circle, #1c426e 0%, #081221 100%);" onclick="loadIframe('${gameUrl}')">
            <div id="playButton">
                <div class="play-icon">▶</div>
                <div class="play-text">PLAY</div>
            </div>
        </div>`;
}

function loadIframe(url) {
    const container = document.getElementById('game-container');
    container.innerHTML = `<iframe id="game-frame" src="${url}" style="width:100%; height:100%; border:none;" allowfullscreen="true"></iframe>`;
}

function openFullscreen() {
    const elem = document.getElementById("game-container");
    if (elem && elem.requestFullscreen) elem.requestFullscreen();
    else if (elem && elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
}

window.addEventListener('DOMContentLoaded', () => {
    generateNav();
    initCarousels();
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
