// --- UNIVERSAL NAVIGATION GENERATOR ---
function generateNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const categories = [
        { name: "Popular", link: "index.html" },
        { name: "Driving", link: "index.html" },
        { name: "Multiplayer", link: "index.html" },
        { name: "Sport", link: "index.html" }
    ];

    let navHTML = '';
    categories.forEach(cat => {
        navHTML += `<a href="${cat.link}">${cat.name}</a>`;
    });

    navHTML += `
        <div class="search-container">
            <input type="text" id="gameSearch" placeholder="Search games..." onkeyup="filterGames()">
        </div>
    `;
    nav.innerHTML = navHTML;
}

// --- SEARCH FILTER LOGIC ---
function filterGames() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('game-card');

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        cards[i].style.display = title.includes(input) ? "" : "none";
    }
}

// --- GAME LOADING LOGIC ---
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    
    container.innerHTML = `
        <div id="clickableArea" onclick="loadIframe('${gameUrl}')">
            <div id="playButton">
                <div class="play-icon">▶</div>
                <div class="play-text">PLAY</div>
            </div>
        </div>
    `;
}

function loadIframe(url) {
    const container = document.getElementById('game-container');
    container.innerHTML = `<iframe src="${url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
}

function openFullscreen() {
    const elem = document.querySelector("iframe");
    if (!elem) return;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

window.addEventListener('DOMContentLoaded', generateNav);
