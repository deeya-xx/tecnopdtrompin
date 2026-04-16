// =======================
// PARALLAX ELEMENTS
// =======================
const text = document.getElementById("text");
const cloud = document.getElementById("cloud");
const bird1 = document.getElementById("bird1");
const bird2 = document.getElementById("bird2");
const explore = document.getElementById("explore");
const sun = document.getElementById("sun");
const forest = document.getElementById("forest");
const mountains = document.getElementById("mountains");
const sky = document.getElementById("sky");

// =======================
// PARALLAX SCROLL (SMOOTH)
// =======================
let ticking = false;

window.addEventListener('scroll', function () {

    if (!ticking) {
        requestAnimationFrame(() => {

            let value = window.scrollY;

            if (text) text.style.top = 50 + value * -0.2 + '%';
            if (cloud) cloud.style.left = value * 2 + 'px';

            if (bird1) {
                bird1.style.top = value * 0.1 + 'px';
                bird1.style.left = value * 1 + 'px';
            }

            if (bird2) {
                bird2.style.top = value * -0.1 + 'px';
                bird2.style.left = value * -2 + 'px';
            }

            if (explore) explore.style.marginTop = value * 1.5 + 'px';

            if (forest) forest.style.top = value * 0.4 + 'px';
            if (sky) sky.style.top = value * 0.25 + 'px';
            if (mountains) mountains.style.top = value * 0.25 + 'px';
            if (sun) sun.style.top = value * 1 + 'px';

            ticking = false;

        });

        ticking = true;
    }

});

// =======================
// DATE TIME
// =======================
function updateDateTime() {
    const now = new Date();
    const el = document.getElementById("datetime");

    if (el) {
        el.innerHTML =
            now.toLocaleDateString('ms-MY') +
            " | " +
            now.toLocaleTimeString('ms-MY');
    }
}

setInterval(updateDateTime, 1000);
updateDateTime();

// =======================
// AUTO SCROLL
// =======================
let sections = ["utama","sec","perkhidmatan","pengumuman","peta","faq","borang","footer"];
let index = 0;
let autoScroll = true;

setInterval(() => {

    if (!autoScroll) return;

    index = (index + 1) % sections.length;

    const el = document.getElementById(sections[index]);

    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }

}, 20000);

// =======================
// STOP AUTO SCROLL
// =======================
document.querySelectorAll("#mobile-sidebar a").forEach(link => {
    link.addEventListener("click", () => {
        autoScroll = false;
    });
});

// =======================
// IDLE RESET SYSTEM
// =======================
let idleTime = 0;

function resetKiosk() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    autoScroll = true;
    index = 0;
}

["click","touchstart","mousemove","keydown"].forEach(evt => {
    window.addEventListener(evt, () => {
        idleTime = 0;
        autoScroll = false;
    });
});

setInterval(() => {
    idleTime++;
    if (idleTime >= 30) {
        resetKiosk();
        idleTime = 0;
    }
}, 1000);

// =======================
// PERKHIDMATAN
// =======================
document.querySelectorAll(".perkhidmatan-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });
});

// =======================
// FAQ
// =======================
document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});

// =======================
// MAP SEARCH
// =======================
function searchLocation() {
    const input = document.getElementById("mapSearch");
    const map = document.getElementById("map");

    if (!input || !map) return;

    map.src =
        "https://www.google.com/maps?q=" +
        encodeURIComponent(input.value) +
        "&output=embed";
}

// =======================
// QR
// =======================
function generateQR() {
    const box = document.getElementById("qrBox");
    if (!box || !window.QRCode) return;

    box.innerHTML = "";

    new QRCode(box, {
        text: location.href,
        width: 180,
        height: 180
    });
}

function generateBorangQR() {
    const box = document.getElementById("qrBoxBorang");
    if (!box || !window.QRCode) return;

    box.innerHTML = "";

    new QRCode(box, {
        text: "./pdf/form.pdf",
        width: 180,
        height: 180
    });
}
