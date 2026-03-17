// --- GOOGLE ANALYTICS MASTER TRACKER ---
(function() {
    // 1. Create the external script tag
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-2D22NMRV2Z";
    document.head.appendChild(gtagScript);

    // 2. Initialize the dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-2D22NMRV2Z');
    
    // Make gtag available globally
    window.gtag = gtag;
})();
// ---------------------------------------

// Master Game Setup Function
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    
    // Safety check: stops the script if the container is missing
    if (!container) return;

    // 1. Create the Click to Play Overlay with the Big Play Icon
    const overlay = document.createElement('div');
    overlay.id = 'clickableArea';
    overlay.innerHTML = `
        <div id="playButton">
            <div style="font-size: 100px; line-height: 1;">▶</div>
            <div style="font-size: 24px; font-weight: bold; letter-spacing: 3px; margin-top: 10px;">PLAY</div>
        </div>
    `;

    // 2. Create the Iframe (forced to 100% size)
    const iframe = document.createElement('iframe');
    iframe.id = 'gameFrame';
    iframe.src = gameUrl;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.display = 'none';

    // 3. Logic to swap overlay for game when clicked
    overlay.onclick = function() {
        overlay.style.display = 'none';
        iframe.style.display = 'block';
    };

    // 4. Add them to the page
    container.appendChild(overlay);
    container.appendChild(iframe);
}

// Fullscreen Logic for the Game Container
function openFullscreen() {
    const elem = document.getElementById("game-container");
    if (!elem) return;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari/Chrome */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}
