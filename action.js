// =======================
// MENU
// =======================
const menu = document.getElementById("menu-toggle");
const sidebar = document.getElementById("mobile-sidebar");
const overlay = document.getElementById("overlay");

menu.onclick = () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
};

overlay.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
};

// =======================
// DATE TIME FIX
// =======================
function updateDateTime(){
    const now = new Date();
    document.getElementById("datetime").textContent =
        now.toLocaleString('ms-MY');
}
setInterval(updateDateTime,1000);
updateDateTime();

// =======================
// MAP SEARCH
// =======================
function searchLocation(){
    const q = document.getElementById("mapSearch").value;
    document.getElementById("map").src =
        `https://www.google.com/maps?q=${q}&output=embed`;
}

// =======================
// FAQ TOGGLE
// =======================
document.querySelectorAll(".faq-item").forEach(item=>{
    item.onclick = () => item.classList.toggle("active");
});

// =======================
// IDLE RESET (FIXED)
// =======================
let idle;

function resetIdle(){
    clearTimeout(idle);
    idle = setTimeout(()=>{
        window.scrollTo({top:0,behavior:"smooth"});
    },30000);
}

["click","mousemove","keydown","touchstart"].forEach(e=>{
    window.addEventListener(e,resetIdle);
});

// =======================
// PARALLAX SIMPLE SAFE
// =======================
window.addEventListener("scroll",()=>{
    let y = window.scrollY;

    const cloud = document.getElementById("cloud");
    const mountains = document.getElementById("mountains");

    if(cloud) cloud.style.transform = `translateX(${y*0.2}px)`;
    if(mountains) mountains.style.transform = `translateY(${y*0.1}px)`;
});
