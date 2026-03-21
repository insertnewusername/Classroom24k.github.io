// --- GOOGLE ANALYTICS MASTER TRACKER ---
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
            <a href="index.html">Driving</a>
            <a href="multiplayer.html">Multiplayer</a>
            <a href="index.html">Sport</a>
        </div>
    `;
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

// --- GAME LOADING ---
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    if (!container) return;

    container.innerHTML = `
        <div id="clickableArea" onclick="loadIframe('${gameUrl}')">
            <div id="playButton">
                <div class="play-icon">▶</div>
                <div class="play-text">PLAY</div>
            </div>
        </div>`;
}

function loadIframe(url) {
    const container = document.getElementById('game-container');
    // We keep the container the same, just swap the inside
    container.innerHTML = `<iframe id="game-frame" src="${url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
    
    setTimeout(() => {
        const frame = document.getElementById('game-frame');
        if(frame) frame.focus();
    }, 100);
}

// --- UPDATED FULLSCREEN LOGIC ---
// This now targets the CONTAINER so it works even before Play is clicked
function openFullscreen() {
    const elem = document.getElementById("game-container");
    if (!elem) return;
    
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

window.addEventListener('DOMContentLoaded', () => {
    generateNav();
    const urlParams = new URLSearchParams(window.location.search);
    const searchVal = urlParams.get('search');
    if (searchVal) {
        const searchInput = document.getElementById('gameSearch');
        if (searchInput) {
            searchInput.value = searchVal;
            filterGames();
        }
    }
});
