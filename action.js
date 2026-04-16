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
// PERKHIDMATAN (FIXED)
// =======================
// =======================
// PERKHIDMATAN (FINAL)
// =======================
document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".perkhidmatan-card");

    cards.forEach(card => {

        card.addEventListener("click", function (e) {

            e.stopPropagation();

            const isActive = card.classList.contains("active");

            // CLOSE ALL
            cards.forEach(c => c.classList.remove("active"));

            // OPEN ONLY IF NOT ACTIVE
            if (!isActive) {
                card.classList.add("active");
            }

            // ===== SOUND =====
            clickSound.currentTime = 0;
            clickSound.play();

            // ===== RIPPLE =====
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");

            const rect = card.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + "px";
            ripple.style.top = (e.clientY - rect.top) + "px";

            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

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

    if (!map.classList.contains("fullscreen-map")) {
        map.style.transition = "all 0.6s ease";
    }

    map.classList.toggle("fullscreen-map");
}

function openGoogleMaps() {
    window.open("https://www.google.com/maps/place/Rompin", "_blank");
}

function startVoiceGuide() {
    const msg = new SpeechSynthesisUtterance(
        "Selamat datang ke sistem peta Pejabat Daerah dan Tanah Rompin. Sila tekan butang arah untuk navigasi."
    );

    msg.lang = "ms-MY";
    speechSynthesis.speak(msg);
}

function generateQR() {
    const qrBox = document.getElementById("qrBox");

    const url = "https://www.google.com/maps/place/Rompin";

    qrBox.innerHTML = `
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}">
    `;
}

let sections = ["peta", "pengumuman", "perkhidmatan", "sec"];
let index = 0;

setInterval(() => {
    index = (index + 1) % sections.length;

    const el = document.getElementById(sections[index]);

    if (el) {
        el.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

}, 20000); // slower = more kiosk-like

const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

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

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            // close all other items first
            faqItems.forEach((el) => {
                if (el !== item) {
                    el.classList.remove("active");
                }
            });

            // toggle current one
            item.classList.toggle("active");
        });
    });

});

function generateBorangQR() {
    let qrBox = document.getElementById("qrBoxBorang");

    qrBox.innerHTML = "";

   const pdfUrl = "./pdf/pewartaan-kadar-cukai.pdf";
    new QRCode(qrBox, {
        text: pdfUrl,
        width: 180,
        height: 180
    });
}


setInterval(() => {

    // STOP if user clicked
    if (!autoScroll) return;

    index = (index + 1) % sections.length;

    const el = document.getElementById(sections[index]);

    if (el) {
        el.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // update nav highlight automatically
        navLinks.forEach(l => l.classList.remove("active"));

        const activeLink = document.querySelector(`nav a[href="#${sections[index]}"]`);
        if (activeLink) activeLink.classList.add("active");
    }

}, 20000);


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

let pengumumanIndex = 0;

function scrollPengumuman(direction) {
    const container = document.querySelector(".pengumuman-grid");
    const card = document.querySelector(".pengumuman-card");

    const cardWidth = card.offsetWidth + 20; // gap

    pengumumanIndex += direction;

    const maxIndex = document.querySelectorAll(".pengumuman-card").length - 3;

    if (pengumumanIndex < 0) pengumumanIndex = 0;
    if (pengumumanIndex > maxIndex) pengumumanIndex = maxIndex;

    container.style.transform = `translateX(${-pengumumanIndex * cardWidth}px)`;
}
