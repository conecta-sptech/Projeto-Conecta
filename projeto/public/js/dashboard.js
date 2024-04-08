const sidebar = document.querySelector(".sidebar");
const modalBackground = document.querySelector(".modal-background");

const telaNovoUsuario = document.querySelector(".novo-usuario-ct");
const telaVisualizarUsuario = document.querySelector(".visualizar-usuario-ct");
const btnNovoUsuario = document.getElementById("btnNovoUsuario");
const btnVisualizarUsuario = document.getElementById("btnVisualizarUsuario");
const inputNomeUsuario = document.getElementById("inputNomeUsuario");
const inputEmailUsuario = document.getElementById("inputEmailUsuario");
const inputSenhaUsuario = document.getElementById("inputSenhaUsuario");
const inputConfirmarSenhaUsuario = document.getElementById("inputConfirmarSenhaUsuario");
const eyeIcon = document.querySelectorAll(".eye-icon");
const line3ModalUsuario = document.getElementById("line3ModalUsuario");
const line3ModalMaquina = document.getElementById("line3ModalMaquina");

const telaNovaMaquina = document.querySelector(".nova-maquina-ct");
const telaVisualizarMaquina = document.querySelector(".visualizar-maquina-ct");
const btnNovaMaquina = document.getElementById("btnNovaMaquina");
const btnVisualizarMaquina = document.getElementById("btnVisualizarMaquina");
const inputNomeMaquina = document.getElementById("inputNomeMaquina");
const inputIpMaquina = document.getElementById("inputIpMaquina");
const inputRamMaquina = document.getElementById("inputRamMaquina");
const inputCpuMaquina = document.getElementById("inputCpuMaquina");
const inputDiscoMaquina = document.getElementById("inputDiscoMaquina");

function alterarMenu() {
    sidebar.classList.toggle("active");
}

function resetarModalUsuario() {
    btnNovoUsuario.classList.add("active");
    btnVisualizarUsuario.classList.remove("active");
    telaNovoUsuario.classList.add("active");
    telaVisualizarUsuario.classList.remove("active");
    line3ModalUsuario.style.display = "flex";
}

function resetarModalMaquina() {
    btnNovaMaquina.classList.add("active");
    btnVisualizarMaquina.classList.remove("active");
    telaNovaMaquina.classList.add("active");
    telaVisualizarMaquina.classList.remove("active");
    line3ModalMaquina.style.display = "flex";
}

function abrirModal(e) {
    const id = e.getAttribute("data-id");
    document.getElementById(id).classList.add("active");
    modalBackground.classList.add("active");

    resetarModalUsuario();
    resetarModalMaquina();
}

function fecharModal(e) {
    const id = e.getAttribute("data-id");
    document.getElementById(id).classList.remove("active");
    modalBackground.classList.remove("active");
}

function encerrarSessao() {
    sessionStorage.clear();
    window.location.href = "../login.html";
}

function alterarFuncaoUsuario(e) {
    if (e.classList.active != "active" && e.id == "btnNovoUsuario") {
        btnNovoUsuario.classList.add("active");
        btnVisualizarUsuario.classList.remove("active");
        telaNovoUsuario.classList.add("active");
        telaVisualizarUsuario.classList.remove("active");
        line3ModalUsuario.style.display = "flex";
    } else if (e.classList.active != "active" && e.id == "btnVisualizarUsuario") {
        btnVisualizarUsuario.classList.add("active");
        btnNovoUsuario.classList.remove("active");
        telaVisualizarUsuario.classList.add("active");
        telaNovoUsuario.classList.remove("active");
        line3ModalUsuario.style.display = "none";
    }
}

function alterarFuncaoMaquina(e) {
    if (e.classList.active != "active" && e.id == "btnNovaMaquina") {
        btnNovaMaquina.classList.add("active");
        btnVisualizarMaquina.classList.remove("active");
        telaNovaMaquina.classList.add("active");
        telaVisualizarMaquina.classList.remove("active");
        line3ModalMaquina.style.display = "flex";
    } else if (e.classList.active != "active" && e.id == "btnVisualizarMaquina") {
        btnVisualizarMaquina.classList.add("active");
        btnNovaMaquina.classList.remove("active");
        telaVisualizarMaquina.classList.add("active");
        telaNovaMaquina.classList.remove("active");
        line3ModalMaquina.style.display = "none";
    }
}

function alternarVisibilidadeSenha() {
    if (inputSenhaUsuario.type == "text" || inputConfirmarSenhaUsuario.type == "text") {
        inputSenhaUsuario.setAttribute("type", "password");
        inputConfirmarSenhaUsuario.setAttribute("type", "password");
        eyeIcon.forEach(e => {
            e.src = "../assets/svg/invisible-password-icon-v2.svg";
        });
    } else {
        inputSenhaUsuario.setAttribute("type", "text");
        inputConfirmarSenhaUsuario.setAttribute("type", "text");
        eyeIcon.forEach(e => {
            e.src = "../assets/svg/visible-password-icon-v2.svg";
        });
    }
}