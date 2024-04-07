const sidebar = document.querySelector(".sidebar");
const modalBackground = document.querySelector(".modal-background");

function alterarMenu() {
    sidebar.classList.toggle("active");
}

function abrirModal(e) {
    const id = e.getAttribute("data-id");
    document.getElementById(id).classList.add("active");
    modalBackground.classList.add("active");
}

function fecharModal(e) {
    const id = e.getAttribute("data-id");
    document.getElementById(id).classList.remove("active");
    modalBackground.classList.remove("active");
}

function encerrarSessao() {
    window.location.href = "../login.html";
}