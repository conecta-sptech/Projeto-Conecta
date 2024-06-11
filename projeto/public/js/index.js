AOS.init();

const imgP = document.getElementById("imgP");
const funcaoP = document.getElementById("funcaoP");
const divP = document.getElementById("divP");

function mostrarRedesSociais(e) {
    e.classList.add("active");
}

function esconderRedesSociais(e) {
    e.classList.remove("active");
}

const mobileMenu = document.querySelector(".mobile-menu");
const navBar = document.querySelector(".navbar");
const navItems = document.querySelectorAll(".nav-item");

function alternarMenuMobile() {
    mobileMenu.classList.toggle("active");
    navBar.classList.toggle("active");
    navItems.forEach((link, index) => {
        link.style.animation
            ? (link.style.animation = "")
            : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
    })
}

let clicks = 1;
function secretStuff() {
    if (isActive) {
        if (clicks == 5) {
            imgP.setAttribute("src", "assets/img/p.png");
            funcaoP.textContent = "Youtuber";
            divP.innerHTML = `<a target="_blank" href="https://www.youtube.com/watch?v=xvFZjo5PgG0"><img src="assets/img/youtube.png"></a>`;
        } else {
            clicks++;
        }
    }
}

let isActive = false;
function activeSomething() {
    isActive = true;
    console.log(isActive);
}