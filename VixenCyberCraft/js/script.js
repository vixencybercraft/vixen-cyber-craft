// Function to load content from home.json (for dynamic content)
function loadContent() {
    // data/home.json file theke content load korar cheshta korche
    fetch('data/home.json')
        .then(response => {
            if (!response.ok) {
                // Jodi file load na hoy, console-e warning debe
                console.warn('Could not load data/home.json. Using default HTML content.');
                return null; 
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                // Home page-er shob ID-te dynamic data load korar byabostha.
                // Jodi apnar index.html-e ei ID gulo na thake (jemon: 'hero-subtitle-text'), 
                // tahole ei content gulo change hobe na. Eta apnar index.html-e check kore nite hobe.
                const heroSubtitle = document.getElementById('hero-subtitle-text');
                const whyUsSubtitle = document.getElementById('why-us-subtitle-text');
                const contactCtaText = document.getElementById('contact-cta-text');
                
                if (heroSubtitle) heroSubtitle.innerHTML = `<strong>Vixen Cyber Craft</strong> ${data.hero_subtitle}`;
                if (whyUsSubtitle) whyUsSubtitle.innerHTML = data.why_us_subtitle;
                if (contactCtaText) contactCtaText.innerHTML = data.contact_cta;
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

// ===== Theme Toggle (Green / Blue emphasis) =====
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    let theme = 'dual'; 
    themeToggle.addEventListener('click', () => {
        const root = document.documentElement.style;
        const bg = (c1, c2, c3, c4, c5) => `radial-gradient(1200px 800px at 10% 10%, ${c1}, transparent 50%), radial-gradient(1200px 800px at 90% 20%, ${c2}, transparent 50%), radial-gradient(800px 500px at 50% 90%, ${c3}, transparent 60%), ${c4}`;

        if (theme === 'dual') {
            // Set to Green theme
            root.setProperty('--neon1', '#00ff85');
            root.setProperty('--neon2', '#0ea5e9'); 
            root.setProperty('--neon3', '#ff00ff');
            document.body.style.background = bg('rgba(0,255,133,.14)', 'rgba(14,165,233,.12)', 'rgba(0,255,133,.07)', 'var(--bg)');
            theme = 'green';
        } else if (theme === 'green') {
            // Set to Blue theme 
            root.setProperty('--neon1', '#14ffec');
            root.setProperty('--neon2', '#3b82f6');
            root.setProperty('--neon3', '#ff00ff');
            document.body.style.background = bg('rgba(34,255,196,0.12)', 'rgba(59,130,246,0.10)', 'rgba(20,255,236,0.07)', 'var(--bg)');
            theme = 'blue';
        } else { 
            // Reset to Dual theme and reload 
            location.reload(); 
        }
    });
}

// ===== Coding Simulator (Typewriter) - Only for index.html =====
function setupTerminal() {
    const terminalBody = document.getElementById('terminalBody');
    if (!terminalBody) return; 

    const lines = [
        'Initializing Vixen Cyber Craft environment...',
        'Loading modules: recon, exploit, reporting, OPSEC ✔',
        'Connecting to lab range 10.8.8.0/24 ... OK',
        'Launching BurpSuite → setting proxy 127.0.0.1:8080',
        'nmap -sC -sV -p- target.local',
        'Found: 80/tcp http | 445/tcp smb | 3389/tcp rdp',
        'sqlmap -u https://vuln.site/products?id=1 --dump --risk=3 --batch',
        'Generating professional pentest report (HTML/PDF) ...',
        'Red team C2 online. Emulating TTPs (MITRE ATT&CK).',
        'Deploying detections for Blue Team SIEM alerts ...',
        'Done. Welcome to Vixen Cyber Craft!'
    ];
    let li = 0, ci = 0;
    const speed = 22;

    function type() {
        if (li < lines.length) {
            if (ci === 0) {
                const line = document.createElement('div');
                line.className = 'line';
                terminalBody.appendChild(line);
            }
            const currentLine = terminalBody.lastElementChild;
            currentLine.textContent = lines[li].slice(0, ci);
            ci++;
            if (ci > lines[li].length) { 
                const br = document.createElement('br');
                terminalBody.appendChild(br);
                li++; ci = 0;
                setTimeout(type, 350);
            } else {
                setTimeout(type, speed + Math.random()*30);
            }
            terminalBody.scrollTop = terminalBody.scrollHeight;
        } else {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            terminalBody.appendChild(cursor);
        }
    }
    setTimeout(type, 600);
}

// ===== Matrix Rain Effect (Canvas inside terminal) - Only for index.html =====
function setupMatrix() {
    const matrix = document.getElementById('matrixCanvas');
    if (!matrix) return;
    
    const ctx = matrix.getContext('2d');
    function resizeMatrix(){
        matrix.width = matrix.parentElement.clientWidth;
        matrix.height = matrix.parentElement.clientHeight;
    }
    resizeMatrix();
    window.addEventListener('resize', resizeMatrix);

    const glyphs = '01010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@&%!*<>';
    const fontSize = 14;
    let columns = Math.floor(matrix.width / fontSize);
    let drops = new Array(columns).fill(1);
    let lastTime = 0;

    function drawMatrix(timestamp){
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        // Draw background with slight transparency for a fade effect
        ctx.fillStyle = 'rgba(0, 10, 16, 0.24)';
        ctx.fillRect(0,0,matrix.width,matrix.height);

        ctx.fillStyle = '#00ff85'; // Matrix color
        ctx.font = fontSize + 'px monospace';
        
        for (let i=0; i<drops.length; i++){
            if (deltaTime > 25) { 
                const text = glyphs[Math.floor(Math.random()*glyphs.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                ctx.fillText(text, x, y);
                
                if (y > matrix.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }
        requestAnimationFrame(drawMatrix);
    }
    drawMatrix(0);
}

// ===== Floating Particles (global canvas) =====
function setupParticles() {
    const pCanvas = document.getElementById('particles');
    const pCtx = pCanvas.getContext('2d');
    function resizeParticles(){ pCanvas.width = innerWidth; pCanvas.height = innerHeight; }
    resizeParticles();
    window.addEventListener('resize', resizeParticles);

    const particles = Array.from({length: 90}, () => ({
        x: Math.random()*innerWidth,
        y: Math.random()*innerHeight,
        vx: (Math.random()-.5)*0.6,
        vy: (Math.random()-.5)*0.6,
        r: Math.random()*2 + 0.6
    }));

    function stepParticles(){
        pCtx.clearRect(0,0,pCanvas.width,pCanvas.height);
        for (const p of particles){
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
            if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
            pCtx.beginPath(); pCtx.arc(p.x, p.y, p.r, 0, Math.PI*2); pCtx.fill();
        }
        // connect nearby
        for (let i=0; i<particles.length; i++){
            for (let j=i+1; j<particles.length; j++){
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y; const d = Math.hypot(dx, dy);
                if (d < 90){
                    pCtx.globalAlpha = (90 - d)/200;
                    const neon2 = getComputedStyle(document.documentElement).getPropertyValue('--neon2').trim();
                    const neon3 = getComputedStyle(document.documentElement).getPropertyValue('--neon3').trim();
                    
                    const grad = pCtx.createLinearGradient(a.x, a.y, b.x, b.y);
                    grad.addColorStop(0, neon2);
                    grad.addColorStop(1, neon3);
                    pCtx.strokeStyle = grad; 
                    pCtx.beginPath(); pCtx.moveTo(a.x, a.y); pCtx.lineTo(b.x, b.y); pCtx.stroke();
                    pCtx.globalAlpha = 1;
                }
            }
        }
        requestAnimationFrame(stepParticles);
    }
    stepParticles();
}


// ===== General Setup on Load =====
window.onload = function() {
    // Footer-e current year set kora
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    
    loadContent(); // Dynamic content from JSON
    setupTerminal(); // Typewriter/Terminal only on index.html
    setupMatrix(); // Matrix Rain only on index.html
    setupParticles(); // Global particles on all pages
    setupThemeToggle(); // Theme change on all pages
};

// ===== Smooth scroll for hash links (used on index.html) =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const hash = a.getAttribute('href');
        // Check if the hash is pointing to a section on the current page
        if (hash.length > 1 && document.getElementById(hash.slice(1))) {
            e.preventDefault(); 
            document.getElementById(hash.slice(1)).scrollIntoView({behavior:'smooth', block:'start'});
        }
    });
});