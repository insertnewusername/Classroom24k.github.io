// --- UNIVERSAL NAVIGATION GENERATOR ---
function generateNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // "Popular" now leads to popular.html
    const categories = [
        { name: "Popular", link: "popular.html" },
        { name: "Driving", link: "index.html" },
        { name: "Multiplayer", link: "index.html" },
        { name: "Sport", link: "index.html" }
    ];

    let navHTML = `
        <div class="search-container">
            <input type="text" id="gameSearch" placeholder="Search + Enter..." onkeydown="if(event.key==='Enter') filterGames()">
        </div>
        <div class="nav-links">
    `;

    categories.forEach(cat => {
        navHTML += `<a href="${cat.link}">${cat.name}</a>`;
    });

    navHTML += `</div>`;
    nav.innerHTML = navHTML;
}

// --- SEARCH FILTER LOGIC (Triggered by Enter) ---
function filterGames() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('game-card');
    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "" : "none";
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
        </div>`;
}

function loadIframe(url) {
    document.getElementById('game-container').innerHTML = 
        `<iframe src="${url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
}

window.addEventListener('DOMContentLoaded', generateNav);
