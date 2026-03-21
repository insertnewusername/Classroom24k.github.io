// --- GOOGLE ANALYTICS ---
(function() {
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-2D22NMRV2Z";
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-2D22NMRV2Z');
    window.gtag = gtag;
})();

// --- UNIVERSAL NAVIGATION ---
function generateNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    nav.innerHTML = `
        <div class="search-container">
            <input type="text" id="gameSearch" placeholder="Search" onkeydown="if(event.key==='Enter') filterGames()">
        </div>
        <div class="nav-links">
            <a href="popular.html">Popular</a>
            <a href="driving.html">Driving</a>
            <a href="multiplayer.html">Multiplayer</a>
            <a href="sport.html">Sport</a>
        </div>
    `;
}

// --- IMPROVED CAROUSEL LOGIC ---

// Button Scrolling
function scrollCarousel(btn, direction) {
    const wrapper = btn.closest('.carousel-wrapper');
    const track = wrapper.querySelector('.carousel-track');
    const scrollAmount = 440; 
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// Mouse Wheel Scrolling (Sideways only)
function initCarousels() {
    const tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach(track => {
        track.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                // If the track can actually scroll more, stop the page from moving
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

// --- SEARCH LOGIC ---
function filterGames() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('game-card');
    if (cards.length === 0) {
        window.location.href = "index.html?search=" + encodeURIComponent(input);
        return;
    }
    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "" : "none";
    }
}

// --- GAME PAGE LOGIC ---
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    if (!container) return;
    container.innerHTML = `
        <div id="clickableArea" style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; cursor:pointer; background:radial-gradient(circle, #1c426e 0%, #081221 100%);" onclick="loadIframe('${gameUrl}')">
            <div id="playButton" style="transition: transform 0.6s ease-in-out;">
                <div class="play-icon" style="font-size:80px; text-shadow: 0 0 20px #00aaff; color:white;">▶</div>
                <div style="font-weight:bold; letter-spacing:2px; color:white; margin-top:10px;">PLAY</div>
            </div>
        </div>`;
}

function loadIframe(url) {
    const container = document.getElementById('game-container');
    container.innerHTML = `<iframe id="game-frame" src="${url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
}

function openFullscreen() {
    const elem = document.getElementById("game-container");
    if (!elem) return;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
}

// --- INITIALIZE ---
window.addEventListener('DOMContentLoaded', () => {
    generateNav();
    initCarousels();
    
    const urlParams = new URLSearchParams(window.location.search);
    const searchVal = urlParams.get('search');
    if (searchVal) {
        const input = document.getElementById('gameSearch');
        if (input) { input.value = searchVal; filterGames(); }
    }
});
