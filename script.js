// script.js - Classroom 24k V4.7

function setupGame(url) {
    const container = document.getElementById('game-container');
    
    // 1. Create Play Overlay with Triangle
    container.innerHTML = `
        <div id="play-overlay" style="
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(8, 18, 33, 0.8); display: flex; 
            justify-content: center; align-items: center; z-index: 20;">
            
            <div class="play-now-btn" id="start-game-trigger">
                <span style="margin-right: 10px;">▶</span> PLAY NOW
            </div>
        </div>
        <iframe src="" id="game-iframe"></iframe>
    `;

    // 2. Click Logic to load Iframe
    document.getElementById('start-game-trigger').addEventListener('click', function() {
        const iframe = document.getElementById('game-iframe');
        iframe.src = url;
        document.getElementById('play-overlay').style.display = 'none';
    });
}

// Fullscreen Function
function toggleFullscreen() {
    const container = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Carousel Scroll Logic
function scrollCarousel(id, direction) {
    const track = document.getElementById(id);
    const scrollAmount = 300;
    if (direction === 'left') {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Search Function
function filterGames() {
    const input = document.getElementById('gameSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? 'flex' : 'none';
    });
}

// Initial Listener for Fullscreen Button
document.addEventListener('DOMContentLoaded', () => {
    const fsBtn = document.querySelector('.fullscreen-btn');
    if (fsBtn) {
        fsBtn.addEventListener('click', toggleFullscreen);
    }
});
