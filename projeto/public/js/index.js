AOS.init();

function mostrarRedesSociais(e) {
    e.classList.add("active");
}

function esconderRedesSociais(e) {
    e.classList.remove("active");
}

const mobileMenu = document.querySelector(".mobile-menu"),
    navBar = document.querySelector(".navbar"),
    navItems = document.querySelectorAll(".nav-item");

function midiaBotao() {
    const midiaBotao = document.querySelector(".mobile-menu");
    mobileMenu.classList.toggle("active");
    navBar.classList.toggle("active");
    navItems.forEach((link, index) => {
        link.style.animation
            ? (link.style.animation = "")
            : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
    })
}

function handleMenuButton() {
    navBar.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    
}