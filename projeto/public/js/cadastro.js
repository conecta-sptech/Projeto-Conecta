const inputNomeEmpresa = document.getElementById("inputNomeEmpresa");
const inputCnpj = document.getElementById("inputCnpj");
const inputEmail = document.getElementById("inputEmail");
const inputSenha = document.getElementById("inputSenha");
const inputConfirmarSenha = document.getElementById("inputConfirmarSenha");
const submitBtn = document.getElementById("submitBtn");
const eyeIcon = document.querySelectorAll(".eye-icon");

const modalBackground = document.querySelector(".modal-background");
const modalSucesso = document.querySelector(".modal-sucesso");
const modalErro = document.querySelector(".modal-erro");
const contagemRegressiva = document.getElementById("contagemRegressiva");

const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fazerContagemRedirecionamento() {
    let numeroAtual = 3;

    setInterval(() => {
        if (numeroAtual > 0) {
            numeroAtual--;
            contagemRegressiva.textContent = numeroAtual;
        } else {
            window.location = "login.html";
        }
    }, 1000);
}

function abrirModalSucesso() {
    modalBackground.classList.add("active");
    modalSucesso.classList.add("active");
    fazerContagemRedirecionamento();
}

function abrirModalErro() {
    modalBackground.classList.add("active");
    modalErro.classList.add("active");
}

function fecharModalErro() {
    modalBackground.classList.remove("active");
    modalErro.classList.remove("active");
}

function alternarVisibilidadeSenha() {
    if (inputSenha.type == "text" || inputConfirmarSenha.type == "text") {
        inputSenha.setAttribute("type", "password");
        inputConfirmarSenha.setAttribute("type", "password");
        eyeIcon.forEach(e => {
            e.src = "assets/svg/invisible-password-icon.svg";
        });
    } else {
        inputSenha.setAttribute("type", "text");
        inputConfirmarSenha.setAttribute("type", "text");
        eyeIcon.forEach(e => {
            e.src = "assets/svg/visible-password-icon.svg";
        });
    }
}

function validarCampos() {
    const nomeEmpresa = inputNomeEmpresa.value;
    const cnpjEmpresa = inputCnpj.value;
    const emailEmpresa = inputEmail.value;
    const senhaEmpresa = inputSenha.value;
    const confirmacaoSenhaEmpresa = inputConfirmarSenha.value;

    const isCnpjValido = cnpjRegex.test(cnpjEmpresa);
    const isEmailValido = emailRegex.test(emailEmpresa);

    if (nomeEmpresa == "") inputNomeEmpresa.classList.add("error");
    if (!isCnpjValido) inputCnpj.classList.add("error");
    if (!isEmailValido) inputEmail.classList.add("error");
    if (senhaEmpresa == "" || senhaEmpresa.length < 8) inputSenha.classList.add("error");
    if (confirmacaoSenhaEmpresa == "" || confirmacaoSenhaEmpresa != senhaEmpresa) inputConfirmarSenha.classList.add("error");

    if (nomeEmpresa != "" && isCnpjValido && isEmailValido && senhaEmpresa == confirmacaoSenhaEmpresa && senhaEmpresa.length > 0) {

        fetch("/usuario/cadastrar-empresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeEmpresa,
                cnpjServer: cnpjEmpresa,
                emailServer: emailEmpresa,
                senhaServer: senhaEmpresa
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    abrirModalSucesso();
                } else {
                    abrirModalErro();
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }
}

function removerErroCampos() {
    const isCnpjValido = cnpjRegex.test(inputCnpj.value);
    const isEmailValido = emailRegex.test(inputEmail.value);

    if (inputNomeEmpresa.value != "") inputNomeEmpresa.classList.remove("error");
    if (isCnpjValido) inputCnpj.classList.remove("error");
    if (isEmailValido) inputEmail.classList.remove("error");
    if (inputSenha.value != "" && inputSenha.value.length >= 8) inputSenha.classList.remove("error");
    if (inputConfirmarSenha.value == inputSenha.value && inputSenha.value.length > 0) inputConfirmarSenha.classList.remove("error");
}

function mascararCnpj() {
    const inputLength = inputCnpj.value.length;

    if (inputLength == 2 || inputLength == 6) {
        inputCnpj.value += ".";
    } else if (inputLength == 10) {
        inputCnpj.value += "/";
    } else if (inputLength == 15) {
        inputCnpj.value += "-";
    }
}

function enviarClicandoEnter(e) {
    if (e.key == "Enter") {
        if (document.activeElement != submitBtn) {
            submitBtn.click();
        }
    }
}
document.addEventListener("keypress", enviarClicandoEnter);