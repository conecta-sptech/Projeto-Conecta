const inputEmail = document.getElementById("inputEmail");
const inputSenha = document.getElementById("inputSenha");
const submitBtn = document.getElementById("submitBtn");

function alternarVisibilidadeSenha(e) {
    if (inputSenha.type == "text") {
        inputSenha.setAttribute("type", "password");
        e.src = "assets/svg/invisible-password-icon.svg";
    } else {
        inputSenha.setAttribute("type", "text");
        e.src = "assets/svg/visible-password-icon.svg";
    }
}

function validarCampos() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValido = emailRegex.test(inputEmail.value);

    if (!isEmailValido) inputEmail.classList.add("error");
    if (inputSenha.value == "" || inputSenha.value.length < 8) inputSenha.classList.add("error");

    if (isEmailValido && inputSenha.value != "") {
        //Enviar formulário
    }
}

function removerErroCampos() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValido = emailRegex.test(inputEmail.value);

    if (isEmailValido) inputEmail.classList.remove("error");
    if (inputSenha.value != "" && inputSenha.value.length > 8) inputSenha.classList.remove("error");
}

function enviarClicandoEnter(e) {
    if (e.key == "Enter") {
        if (document.activeElement != submitBtn) {
            submitBtn.click();
        }
    }
}

document.addEventListener("keypress", enviarClicandoEnter);