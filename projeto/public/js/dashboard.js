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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function validarCamposUsuario() {
    const nomeUsuario = inputNomeUsuario.value;
    const emailUsuario = inputEmailUsuario.value;
    const senhaUsuario = inputSenhaUsuario.value;
    const confirmacaoSenhaUsuario = inputConfirmarSenhaUsuario.value;
    const idEmpresa = sessionStorage.ID_EMPRESA;
    const funcaoUsuario = sessionStorage.FUNCAO_USUARIO;

    const isEmailValido = emailRegex.test(emailUsuario);

    if (nomeUsuario == "") inputNomeEmpresa.classList.add("error");
    if (!isEmailValido) inputEmail.classList.add("error");
    if (senhaUsuario == "" || senhaUsuario.length < 8) inputSenha.classList.add("error");
    if (confirmacaoSenhaUsuario == "" || confirmacaoSenhaUsuario != senhaUsuario) inputConfirmarSenhaUsuario.classList.add("error");

    if (nomeUsuario != "" && isEmailValido && senhaUsuario == confirmacaoSenhaUsuario && senhaUsuario.length > 0) {

        fetch("/usuario/cadastrar-funcionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeUsuario,
                emailServer: emailUsuario,
                senhaServer: senhaUsuario,
                idEmpresaServer: idEmpresa,
                funcaoServer: funcaoUsuario
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    console.log(resposta);
                    console.log("Cadastro do usuario realizado com sucesso!");

                } else {
                    throw "Houve um erro ao tentar realizar o cadastro do funcionario!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }
}