const inputEmail = document.getElementById("inputEmail");
const inputSenha = document.getElementById("inputSenha");
const submitBtn = document.getElementById("submitBtn");

const modalBackground = document.querySelector(".modal-background");
const modalErro = document.querySelector(".modal-erro");

function abrirModalErro() {
    modalBackground.classList.add("active");
    modalErro.classList.add("active");
}

function fecharModalErro() {
    modalBackground.classList.remove("active");
    modalErro.classList.remove("active");
}

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
    const email = inputEmail.value;
    const senha = inputSenha.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValido = emailRegex.test(email);

    if (!isEmailValido) inputEmail.classList.add("error");
    if (senha == "" || senha.length < 8) inputSenha.classList.add("error");

    if (isEmailValido && senha.length >= 8) {
        fetch("/usuario/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log(json);
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.FUNCAO_USUARIO = json.funcao;

                    sessionStorage.ID_EMPRESA = json.idEmpresa;
                    sessionStorage.NOME_EMPRESA = json.nomeEmpresa;
                    sessionStorage.EMAIL_USUARIO = json.emailUsuario;
                    sessionStorage.CNPJ_EMPRESA = json.cnpjEmpresa;

                    if (json.cepEmpresa && json.numeroEmpresa && json.telefoneEmpresa) {
                        sessionStorage.CEP_EMPRESA = json.cepEmpresa;
                        sessionStorage.NUMERO_EMPRESA = json.numeroEmpresa;
                        sessionStorage.TELEFONE_EMPRESA = json.telefoneEmpresa;
                    }

                    window.location = "./dashboard/dashboard.html";
                });

            } else {
                resposta.text().then(texto => {
                    console.error(texto);
                });

                abrirModalErro();
            }

        }).catch(function (erro) {
            console.log(erro);
        })
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