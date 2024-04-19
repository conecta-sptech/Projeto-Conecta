AOS.init();

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