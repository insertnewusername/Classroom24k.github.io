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
            <a href="index.html">Multiplayer</a>
            <a href="index.html">Sport</a>
        </div>
    `;
}

// --- SEARCH LOGIC (Only triggers on Enter) ---
function filterGames() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('game-card');
    
    // Redirect logic for searching from game pages back to home
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
    container.innerHTML = `<iframe id="game-frame" src="${url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
    
    // Focus the iframe so controls work immediately
    setTimeout(() => {
        const frame = document.getElementById('game-frame');
        if(frame) frame.focus();
    }, 100);
}

// --- FULLSCREEN LOGIC ---
function openFullscreen() {
    const elem = document.getElementById("game-frame");
    if (!elem) {
        alert("Please click PLAY before entering fullscreen!");
        return;
    }
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

// Check for search query on page load (Helper for search across pages)
window.addEventListener('DOMContentLoaded', () => {
    generateNav();
    const urlParams = new URLSearchParams(window.location.search);
    const searchVal = urlParams.get('search');
    if (searchVal) {
        document.getElementById('gameSearch').value = searchVal;
        filterGames();
    }
});
