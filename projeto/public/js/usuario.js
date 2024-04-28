const telaNovoUsuario = document.querySelector(".novo-usuario-ct");
const telaVisualizarUsuario = document.querySelector(".visualizar-usuario-ct");
const btnNovoUsuario = document.getElementById("btnNovoUsuario");
const btnVisualizarUsuario = document.getElementById("btnVisualizarUsuario");
const inputNomeUsuario = document.getElementById("inputNomeUsuario");
const inputEmailUsuario = document.getElementById("inputEmailUsuario");
const inputSenhaUsuario = document.getElementById("inputSenhaUsuario");
const inputConfirmarSenhaUsuario = document.getElementById("inputConfirmarSenhaUsuario");
const inputBuscarUsuarios = document.getElementById("inputBuscarUsuarios");
const eyeIcon = document.querySelectorAll(".eye-icon");
const line3ModalUsuario = document.getElementById("line3ModalUsuario");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resetarModalUsuario() {
    btnNovoUsuario.classList.add("active");
    btnVisualizarUsuario.classList.remove("active");
    telaNovoUsuario.classList.add("active");
    telaVisualizarUsuario.classList.remove("active");
    line3ModalUsuario.style.display = "flex";

    inputNomeUsuario.value = "";
    inputEmailUsuario.value = "";
    inputSenhaUsuario.value = "";
    inputConfirmarSenhaUsuario.value = "";
    inputBuscarUsuarios.value = "";

    inputNomeUsuario.classList.remove("error");
    inputEmailUsuario.classList.remove("error");
    inputSenhaUsuario.classList.remove("error");
    inputConfirmarSenhaUsuario.classList.remove("error");
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

function validarCamposUsuario() {
    const nomeUsuario = inputNomeUsuario.value;
    const emailUsuario = inputEmailUsuario.value;
    const senhaUsuario = inputSenhaUsuario.value;
    const confirmacaoSenhaUsuario = inputConfirmarSenhaUsuario.value;
    const idEmpresa = sessionStorage.ID_EMPRESA;
    const funcaoUsuario = sessionStorage.FUNCAO_USUARIO;

    const isEmailValido = emailRegex.test(emailUsuario);

    if (nomeUsuario == "") inputNomeUsuario.classList.add("error");
    if (!isEmailValido) inputEmailUsuario.classList.add("error");
    if (senhaUsuario == "" || senhaUsuario.length < 8) inputSenhaUsuario.classList.add("error");
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
                if (resposta.ok) {
                    inputNomeUsuario.value = "";
                    inputEmailUsuario.value = "";
                    inputSenhaUsuario.value = "";
                    inputConfirmarSenhaUsuario.value = "";
                    abrirModalSucesso("Usuário cadastrado com sucesso!");
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro do funcionario!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }
}

function removerErroCamposUsuario() {
    const emailUsuario = inputEmailUsuario.value;
    const senhaUsuario = inputSenhaUsuario.value;
    const confirmacaoSenhaUsuario = inputConfirmarSenhaUsuario.value;
    const isEmailValido = emailRegex.test(emailUsuario);

    if (nomeUsuario != "") inputNomeUsuario.classList.remove("error");
    if (isEmailValido) inputEmailUsuario.classList.remove("error");
    if (senhaUsuario.length >= 8) inputSenhaUsuario.classList.remove("error");
    if (confirmacaoSenhaUsuario == senhaUsuario && confirmacaoSenhaUsuario.length > 0) inputConfirmarSenhaUsuario.classList.remove("error");
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