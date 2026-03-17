// script.js - The Master Play Button Logic
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    
    // 1. Create the Click to Play Overlay
    const overlay = document.createElement('div');
    overlay.id = 'clickableArea';
    overlay.innerHTML = `
        <div id="playButton">CLICK TO PLAY</div>
        <div class="play-subtext">Classroom 24k - The Blue Zone</div>
    `;

    // 2. Create the Iframe (hidden at first)
    const iframe = document.createElement('iframe');
    iframe.id = 'gameFrame';
    iframe.src = gameUrl;
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.display = 'none';

    // 3. Logic to swap them
    overlay.onclick = function() {
        overlay.style.display = 'none';
        iframe.style.display = 'block';
    };

    // 4. Put them on the page
    container.appendChild(overlay);
    container.appendChild(iframe);
}

// Fullscreen Logic
function openFullscreen() {
    const elem = document.getElementById("game-container");
    if (elem.requestFullscreen) { elem.requestFullscreen(); }
    else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); }
}
