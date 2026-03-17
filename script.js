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

// --- MASTER GAME SETUP ---
function setupGame(gameUrl) {
    const container = document.getElementById('game-container');
    if (!container) return;

    const overlay = document.createElement('div');
    overlay.id = 'clickableArea';
    overlay.innerHTML = `
        <div id="playButton">
            <div style="font-size: 100px; line-height: 1;">▶</div>
            <div style="font-size: 24px; font-weight: bold; letter-spacing: 3px; margin-top: 10px;">PLAY</div>
        </div>
    `;

    const iframe = document.createElement('iframe');
    iframe.id = 'gameFrame';
    iframe.src = gameUrl;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.display = 'none';

    overlay.onclick = function() {
        overlay.style.display = 'none';
        iframe.style.display = 'block';
    };

    container.appendChild(overlay);
    container.appendChild(iframe);
}

// --- FULLSCREEN LOGIC ---
function openFullscreen() {
    const elem = document.getElementById("game-container");
    if (!elem) return;
    if (elem.requestFullscreen) { elem.requestFullscreen(); } 
    else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); }
}
