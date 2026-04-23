// =======================
// PARALLAX ELEMENTS
// =======================
const time = document.getElementsByClassName('bubbles')[0];

let fish2move = 100;
let fish3move = 900;
let fish4move = 1200;

const text = document.getElementById("text");
const cloud = document.getElementById("cloud");
const bird1 = document.getElementById("bird1");
const bird2 = document.getElementById("bird2");
const explore = document.getElementById("explore");
const header = document.getElementById("header");
const sun = document.getElementById("sun");
const forest = document.getElementById("forest");
const mountains = document.getElementById("mountains");

// OPTIONAL elements (avoid errors if not exist)

const splash = document.getElementById("splash");
const fish1 = document.getElementById("fish1");
const fish2 = document.getElementById("fish2");
const fish3 = document.getElementById("fish3");
const fish4 = document.getElementById("fish4");
const sky = document.getElementById("sky");
const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
const sidebar = document.getElementById("mobile-sidebar");
const overlay = document.getElementById("overlay");
const menuToggle = document.getElementById("menu-toggle");

function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
}

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

menuToggle.addEventListener("click", openSidebar);
overlay.addEventListener("click", closeSidebar);

// =======================
// MOBILE ADJUSTMENT
// =======================
if (screen.width < 400 && time) {
    time.style.setProperty('--transform-duration', '15s');
    time.style.setProperty('--transform-y', '-700vh');

    fish2move = 1680;
    fish3move = 3000;
    fish4move = 4300;
}

// =======================
// PARALLAX SCROLL
// =======================
window.addEventListener('scroll', function () {

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

    //if (header) header.style.top = value * 0.7 + 'px';
    if (sun) sun.style.top = value * 1 + 'px';

    if (splash && value < 380) {
        splash.style.top = 20 + value * -0.3 + 'px';
    }

    if (fish1) fish1.style.right = (value - 100) + 'px';
    if (fish2) fish2.style.left = (value - fish2move) + 'px';
    if (fish3) fish3.style.right = (value - fish3move) + 'px';
    if (fish4) fish4.style.left = (value - fish4move) + 'px';
});

// =======================
// SOCIAL LINKS (SAFE)
// =======================
const links = document.getElementsByClassName("social-media");

function openlink(x) {
    const urls = [
        "https://www.instagram.com/_.vini._02_/",
        "https://www.linkedin.com/in/vineet-kumar-gupta-2833ab196/",
        "https://github.com/VineetKumar02",
        "https://vineet-portfolio-site.netlify.app/"
    ];

    if (urls[x - 1]) {
        window.open(urls[x - 1], "_blank");
    }
}

// attach safely
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", () => openlink(i + 1));
}

// =======================
// DATE & TIME
// =======================
function updateDateTime() {
    const now = new Date();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const date = now.toLocaleDateString('ms-MY', options);
    const time = now.toLocaleTimeString('ms-MY');

    const el = document.getElementById("datetime");
    if (el) {
        el.innerHTML = date + " | " + time;
    }
}


// =======================
// PERKHIDMATAN (FINAL)
// =======================
document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".perkhidmatan-card");

    function closeAll() {
        cards.forEach(c => c.classList.remove("active"));
    }

    function openCard(card) {
        closeAll();
        card.classList.add("active");

        setTimeout(() => {
            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 150);
    }

    cards.forEach(card => {

        // ✅ CLICK CARD ANYWHERE
        card.addEventListener("click", function (e) {

            // ignore toggle button so it doesn't double trigger
            if (e.target.closest(".toggle-btn")) return;

            if (card.classList.contains("active")) {
                card.classList.remove("active");
            } else {
                openCard(card);
            }
        });

    });

    // ✅ GLOBAL BUTTON HANDLER (IMPORTANT FIX)
    document.addEventListener("click", function (e) {

        const btn = e.target.closest(".toggle-btn");
        if (!btn) return;

        const card = btn.closest(".perkhidmatan-card");

        if (!card) return;

        if (card.classList.contains("active")) {
            card.classList.remove("active");
        } else {
            openCard(card);
        }
    });

});


function scrollLeftCards() {
    document.querySelector(".perkhidmatan-grid").scrollBy({
        left: -300,
        behavior: "smooth"
    });
}

function scrollRightCards() {
    document.querySelector(".perkhidmatan-grid").scrollBy({
        left: 300,
        behavior: "smooth"
    });
}

function toggleFullscreenMap() {
    const map = document.getElementById("mapBox");
    const header = document.getElementById("header");

    map.classList.toggle("fullscreen-map");

    // optional: hide header when fullscreen
    if (map.classList.contains("fullscreen-map")) {
        header.style.display = "none";
    } else {
        header.style.display = "flex";
    }
}


function openGoogleMaps() {
    window.open("https://www.google.com/maps/place/Rompin", "_blank");
}

function startVoiceGuide() {
    if (!('speechSynthesis' in window)) {
        alert("Browser tidak menyokong suara");
        return;
    }

    const text = "Anda kini berada di Pejabat Daerah dan Tanah Rompin. Sila gunakan butang arah untuk navigasi, atau cari lokasi menggunakan kotak carian.";

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "ms-MY"; // Malay voice
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.cancel(); // stop previous
    window.speechSynthesis.speak(speech);
}




let sections = ["utama", "perkhidmatan", "pengumuman", "peta", "faq", "borang"];
let index = 0;

setInterval(() => {

    if (!autoScroll) return;

    index = (index + 1) % sections.length;

    const el = document.getElementById(sections[index]);

    if (el) {
        el.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        navLinks.forEach(l => l.classList.remove("active"));

        const activeLink = document.querySelector(`nav a[href="#${sections[index]}"]`);
        if (activeLink) activeLink.classList.add("active");
    }

}, 20000);


document.querySelectorAll(".pengumuman-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });
});

function searchLocation() {
    const input = document.getElementById("mapSearch").value;
    const mapFrame = document.getElementById("map");

    if (!input.trim()) return;

    mapFrame.src =
        "https://www.google.com/maps?q=" +
        encodeURIComponent(input) +
        "&output=embed";
}

function findNearby() {
    const mapFrame = document.getElementById("map");
    mapFrame.src =
        "https://www.google.com/maps?q=nearby+Rompin+Pahang&output=embed";
}

window.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("mapSearch");

    if (input) {
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                searchLocation();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".faq-item");

    document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", function () {

        const item = this.parentElement;

        // close others
        document.querySelectorAll(".faq-item").forEach(el => {
            if (el !== item) el.classList.remove("active");
        });

        // toggle
        item.classList.toggle("active");
    });
});

});

function generateQR() {
    const qrBox = document.getElementById("qrBox");

    if (!qrBox) {
        console.error("qrBox NOT FOUND");
        return;
    }

    if (typeof QRCode === "undefined") {
        alert("QR library not loaded");
        return;
    }

    qrBox.innerHTML = "";

    new QRCode(qrBox, {
        text: "https://www.google.com/maps/place/Rompin",
        width: 180,
        height: 180
    });
}

function generateBorangQR(file) {

    const modal = document.getElementById("qrModal");
    const box = document.getElementById("qrModalBox");

    modal.style.display = "flex";
    box.innerHTML = "";

    new QRCode(box, {
        text: window.location.origin + "/" + file,
        width: 200,
        height: 200
    });
}

function closeQRModal() {
    document.getElementById("qrModal").style.display = "none";
    document.getElementById("qrModalBox").innerHTML = "";
}
window.addEventListener("click", function(e) {
    const modal = document.getElementById("qrModal");
    if (e.target === modal) {
        closeQRModal();
    }
});


// =======================
// NAV CLICK ACTIVE (FINAL FIX)
// =======================
const navLinks = document.querySelectorAll("nav ul li a");

let autoScroll = true; // control auto scroll

navLinks.forEach(link => {
    link.addEventListener("click", function () {

        // STOP auto scroll when user clicks
        autoScroll = false;

        // remove all active
        navLinks.forEach(l => l.classList.remove("active"));

        // add active to clicked
        this.classList.add("active");

    });
});

function showPhonePopup() {
    document.getElementById("phoneModal").style.display = "flex";
}

function closePhonePopup() {
    document.getElementById("phoneModal").style.display = "none";
}

// close when clicking outside box
window.addEventListener("click", function(e) {
    const modal = document.getElementById("phoneModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});





function openPDF(file) {
    const overlay = document.getElementById("pdfOverlay");
    const viewer = document.getElementById("pdfViewer");

    overlay.style.display = "flex";

    viewer.innerHTML = `
        <iframe src="${file}" width="100%" height="100%"></iframe>
    `;
}

// CLOSE PDF
function closePDF() {
    document.getElementById("pdfOverlay").style.display = "none";
    document.getElementById("pdfViewer").innerHTML = "";
}

document.querySelectorAll("#mobile-sidebar a").forEach(link => {
    link.addEventListener("click", function () {

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    });
});


window.addEventListener("load", () => {
    document.getElementById("qrBoxBorang").innerHTML = "";
});

const pdfUrl = "pdf/pewartaan-kadar-cukai.pdf";

function loadPDFPreview() {
    const container = document.getElementById("pdfPreview");
    if (!container) return;

    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {

        pdf.getPage(1).then(page => {

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            const viewport = page.getViewport({ scale: 0.6 });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            page.render(renderContext).promise.then(() => {
                container.innerHTML = "";
                container.appendChild(canvas);
            });

        });

    }).catch(err => {
        container.innerHTML = "Failed to load preview";
        console.error(err);
    });
}

window.onload = function () {
    loadPDFPreview();
};

const pengumumanGrid = document.querySelector(".pengumuman-grid");
const pengumumanCard = document.querySelector(".pengumuman-card");

function getPengumumanScroll() {
    const card = document.querySelector(".pengumuman-card");
    if (!card) return 300;
    return card.offsetWidth + 20;
}

function nextPengumuman() {
    document.querySelector(".pengumuman-grid").scrollBy({
        left: getPengumumanScroll(),
        behavior: "smooth"
    });
}

function prevPengumuman() {
    document.querySelector(".pengumuman-grid").scrollBy({
        left: -getPengumumanScroll(),
        behavior: "smooth"
    });
}


