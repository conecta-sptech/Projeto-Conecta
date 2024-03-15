const inputNomeEmpresa = document.getElementById("inputNomeEmpresa");
const inputCnpj = document.getElementById("inputCnpj");
const inputCep = document.getElementById("inputCep");
const inputEmail = document.getElementById("inputEmail");
const inputSenha = document.getElementById("inputSenha");
const inputConfirmarSenha = document.getElementById("inputConfirmarSenha");
const submitBtn = document.getElementById("submitBtn");
const eyeIcon = document.querySelectorAll(".eye-icon");

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
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const isCnpjValido = cnpjRegex.test(inputCnpj.value);

    const cepRegex = /^\d{5}-\d{3}$/;
    const isCepValido = cepRegex.test(inputCep.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValido = emailRegex.test(inputEmail.value);

    if (inputNomeEmpresa.value == "") inputNomeEmpresa.classList.add("error");
    if (!isCnpjValido) inputCnpj.classList.add("error");
    if (!isCepValido) inputCep.classList.add("error");
    if (!isEmailValido) inputEmail.classList.add("error");
    if (inputSenha.value == "" || inputSenha.value.length < 8) inputSenha.classList.add("error");
    if (inputConfirmarSenha.value == "" || inputConfirmarSenha.value != inputSenha.value) inputConfirmarSenha.classList.add("error");

    if (inputNomeEmpresa.value != "" && isCnpjValido && isCepValido && isEmailValido && inputConfirmarSenha.value == inputSenha.value && inputSenha.value.length > 0) {
        //Enviar formulário
    }
}

function removerErroCampos() {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const isCnpjValido = cnpjRegex.test(inputCnpj.value);

    const cepRegex = /^\d{5}-\d{3}$/;
    const isCepValido = cepRegex.test(inputCep.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValido = emailRegex.test(inputEmail.value);

    if (inputNomeEmpresa.value != "") inputNomeEmpresa.classList.remove("error");
    if (isCnpjValido) inputCnpj.classList.remove("error");
    if (isCepValido) inputCep.classList.remove("error");
    if (isEmailValido) inputEmail.classList.remove("error");
    if (inputSenha.value != "" && inputSenha.value.length > 8) inputSenha.classList.remove("error");
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

function mascararCep() {
    const inputLength = inputCep.value.length;

    if (inputLength == 5) {
        inputCep.value += "-";
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