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

// OPTIONAL elements
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
// PARALLAX SCROLL (FIX SMOOTH)
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

            if (splash && value < 380) {
                splash.style.top = 20 + value * -0.3 + 'px';
            }

            if (fish1) fish1.style.right = (value - 100) + 'px';
            if (fish2) fish2.style.left = (value - fish2move) + 'px';
            if (fish3) fish3.style.right = (value - fish3move) + 'px';
            if (fish4) fish4.style.left = (value - fish4move) + 'px';

            ticking = false;

        });

        ticking = true;
    }

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

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", () => openlink(i + 1));
}

// =======================
// DATE & TIME (FIX)
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
    const timeStr = now.toLocaleTimeString('ms-MY');

    const el = document.getElementById("datetime");
    if (el) {
        el.innerHTML = date + " | " + timeStr;
    }
}

// RUN
setInterval(updateDateTime, 1000);
updateDateTime();

// =======================
// AUTO SCROLL (FIX)
// =======================
let sections = ["peta", "pengumuman", "perkhidmatan", "sec"];
let index = 0;
let autoScroll = true;

const navLinks = document.querySelectorAll("#mobile-sidebar a");

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

        const activeLink = document.querySelector(`#mobile-sidebar a[href="#${sections[index]}"]`);
        if (activeLink) activeLink.classList.add("active");
    }

}, 20000);

// STOP auto scroll bila klik
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        autoScroll = false;

        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    });
});

// =======================
// KIOSK IDLE RESET (NEW)
// =======================
let idleTime = 0;

function resetKiosk() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

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
document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".perkhidmatan-card");

    cards.forEach(card => {

        card.addEventListener("click", function (e) {

            e.stopPropagation();

            const isActive = card.classList.contains("active");

            cards.forEach(c => c.classList.remove("active"));

            if (!isActive) {
                card.classList.add("active");
            }

            clickSound.currentTime = 0;
            clickSound.play();

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

// =======================
// SOUND
// =======================
const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

// unlock sound (fix browser block)
document.addEventListener("click", () => {
    clickSound.play().catch(()=>{});
}, { once: true });

// =======================
// FAQ
// =======================
document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach((el) => {
                if (el !== item) {
                    el.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });

});
