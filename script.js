// script.js - The Master Play Button Logic
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    
    if (!container) return;

    // 1. Create the Click to Play Overlay with a Big Icon
    const overlay = document.createElement('div');
    overlay.id = 'clickableArea';
    overlay.innerHTML = `
        <div id="playButton">
            <div style="font-size: 100px; line-height: 1;">▶</div>
            <div style="font-size: 24px; font-weight: bold; letter-spacing: 3px; margin-top: 10px;">PLAY</div>
        </div>
    `;

    // 2. Create the Iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'gameFrame';
    iframe.src = gameUrl;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.display = 'none';

    // 3. Logic to swap them
    overlay.onclick = function() {
        overlay.style.display = 'none';
        iframe.style.display = 'block';
    };

    container.appendChild(overlay);
    container.appendChild(iframe);
}

// Fullscreen Logic
function openFullscreen() {
    const elem = document.getElementById("game-container");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}
