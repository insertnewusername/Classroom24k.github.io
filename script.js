/**
 * script.js - Classroom 24k Final Merged Master
 */

// --- 1. GOOGLE ANALYTICS ---
(function() {
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-2D22NMRV2Z";
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag; // Make globally accessible
    gtag('js', new Date());
    gtag('config', 'G-2D22NMRV2Z');
})();

// --- 2. UNIVERSAL NAVIGATION ---
// Automatically fills <nav></nav> on every page
function generateNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Using your V2.0 styling logic for the nav-links
    nav.innerHTML = `
        <div class="search-container">
            <input type="text" id="gameSearch" placeholder="Search games..." oninput="filterGames()">
        </div>
        <div class="nav-links">
            <a href="index.html#popular">Popular</a>
            <a href="index.html#multiplayer">Multiplayer</a>
            <a href="index.html#sports">Sports</a>
            <a href="index.html#new">New</a>
        </div>
    `;
}

// --- 3. CAROUSEL LOGIC ---
function scrollCarousel(btn, direction) {
    const wrapper = btn.closest('.carousel-wrapper');
    if(!wrapper) return;
    const track = wrapper.querySelector('.carousel-track');
    // Scroll by 660px (roughly 3 cards: 200px + 20px gap)
    track.scrollBy({ left: direction * 660, behavior: 'smooth' });
}

// Support for mouse scroll wheels and mobile touch
function initCarousels() {
    const tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach(track => {
        track.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                track.scrollLeft += e.deltaY;
            }
        });
    });
}

// --- 4. SEARCH LOGIC ---
function filterGames() {
    let inputField = document.getElementById('gameSearch');
    if (!inputField) return;
    
    let input = inputField.value.toLowerCase();
    let cards = document.getElementsByClassName('game-card');
    
    // If on a subpage (no cards found), redirect to home with search query
    if (cards.length === 0 && input.length > 0) {
        window.location.href = "index.html?search=" + encodeURIComponent(input);
        return;
    }
    
    for (let card of cards) {
        let h3 = card.querySelector('h3');
        if (h3) {
            let title = h3.innerText.toLowerCase();
            card.style.display = title.includes(input) ? "" : "none";
        }
    }
}

// --- 5. GAME LOADING (Improved Neon Style) ---
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    if (!container) return;
    
    // Using the play-icon and play-text classes for the vertical stack
    container.innerHTML = `
        <div id="clickableArea" 
             style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; cursor:pointer; background:radial-gradient(circle, #1c426e 0%, #081221 100%);" 
             onclick="loadIframe('${gameUrl}')">
            <div id="playButton" style="text-align:center;">
                <div class="play-icon" style="font-size:80px; color:#f0faff; text-shadow: 0 0 20px #00aaff; margin-bottom:15px;">▶</div>
                <div class="play-text" style="font-weight:bold; letter-spacing:2px; color:white; font-size:1.2rem; border:2px solid #00aaff; padding:10px 30px; border-radius:50px; box-shadow: 0 0 15px #00aaff;">PLAY</div>
            </div>
        </div>`;
}

function loadIframe(url) {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <iframe id="game-frame" 
                src="${url}" 
                style="width:100%; height:100%; border:none;" 
                allowfullscreen="true" 
                webkitallowfullscreen="true" 
                mozallowfullscreen="true">
        </iframe>`;
}

// --- 6. FULLSCREEN ---
function openFullscreen() {
    const elem = document.getElementById("game-container");
    if (!elem) return;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

// --- 7. INITIALIZE ON LOAD ---
window.addEventListener('DOMContentLoaded', () => {
    generateNav();
    initCarousels();
    
    // Check if we arrived from a search redirect
    const urlParams = new URLSearchParams(window.location.search);
    const searchVal = urlParams.get('search');
    if (searchVal) {
        const input = document.getElementById('gameSearch');
        if (input) { 
            input.value = searchVal; 
            filterGames(); 
        }
    }
});
