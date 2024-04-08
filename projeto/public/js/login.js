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
            console.log("ESTOU NO THEN DO valirdarCampos()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.FUNCAO_USUARIO = json.funcao;
                    sessionStorage.NOME_EMPRESA = json.nomeEmpresa;

                    setTimeout(function () {
                        window.location = "./dashboard/dashboard.html";
                    }, 1000); // apenas para exibir o loading

                });

            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.error(texto);
                });
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