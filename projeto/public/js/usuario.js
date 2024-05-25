const telaNovoUsuario = document.querySelector(".novo-usuario-ct");
const telaVisualizarUsuario = document.querySelector(".visualizar-usuario-ct");
const btnNovoUsuario = document.getElementById("btnNovoUsuario");
const btnVisualizarUsuario = document.getElementById("btnVisualizarUsuario");
const inputNomeUsuario = document.getElementById("inputNomeUsuario");
const inputEmailUsuario = document.getElementById("inputEmailUsuario");
const inputSenhaUsuario = document.getElementById("inputSenhaUsuario");
const inputConfirmarSenhaUsuario = document.getElementById("inputConfirmarSenhaUsuario");
const inputBuscarUsuarios = document.getElementById("inputBuscarUsuarios");
const eyeIcon = document.querySelectorAll(".modal .eye-icon");
const line3ModalUsuario = document.getElementById("line3ModalUsuario");

const inputSenhaAtual = document.getElementById("inputSenhaAtual");
const inputNovaSenha = document.getElementById("inputNovaSenha");
const inputConfirmarNovaSenha = document.getElementById("inputConfirmarNovaSenha");
const eyeIconSenhaAtual = document.getElementById("eyeIconSenhaAtual");
const eyeIconNovaSenha = document.querySelectorAll(".modal-usuario-logado .eye-icon");

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

    inputSenhaUsuario.setAttribute("type", "password");
    inputConfirmarSenhaUsuario.setAttribute("type", "password");
    eyeIcon.forEach(e => {
        e.src = "../assets/svg/invisible-password-icon-v2.svg";
    });
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
        listarUsuariosModalGerenciar();
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

function listarUsuarios() {
    return fetch(`/usuario/buscar/${sessionStorage.ID_EMPRESA}/${sessionStorage.FUNCAO_USUARIO}`)
        .then(res => res.json());
}

function filtrarUsuariosModalGerenciar(e) {
    tbodyModalGerenciarUsuario.innerHTML = ``;
    if (e.value == "") {
        listarUsuariosModalGerenciar();
    } else {
        for (let i = 0; i < listaUsuarios.length; i++) {
            if (listaUsuarios[i].nomeUsuario.toUpperCase().startsWith(e.value.toUpperCase()) || listaUsuarios[i].emailUsuario.toUpperCase().startsWith(e.value.toUpperCase())) {
                tbodyModalGerenciarUsuario.innerHTML += `
                    <tr>
                        <td class="nome-td">${listaUsuarios[i].nomeUsuario}</td>
                        <td class="email-td">${listaUsuarios[i].emailUsuario}</td>
                        <td class="icons-ct">
                            <button id="btnExcluir" data-id="${listaUsuarios[i].idUsuario}" onclick="abrirModalConfirmarExclusaoUsuario(this)">
                                <img src="../assets/svg/trash.svg">
                            </button>
                        </td>
                    </tr>
    `;
            }
        }
    }
}

async function listarUsuariosModalGerenciar() {
    tbodyModalGerenciarUsuario.innerHTML = ``;
    listaUsuarios = await listarUsuarios();
    for (let i = 0; i < listaUsuarios.length; i++) {
        tbodyModalGerenciarUsuario.innerHTML += `
        <tr>
            <td class="nome-td">${listaUsuarios[i].nomeUsuario}</td>
            <td class="email-td">${listaUsuarios[i].emailUsuario}</td>
            <td class="icons-ct">
                <button id="btnExcluir" data-id="${listaUsuarios[i].idUsuario}" onclick="abrirModalConfirmarExclusaoUsuario(this)">
                    <img src="../assets/svg/trash.svg">
                </button>
            </td>
        </tr>
        `;
    }
}

function abrirModalConfirmarExclusaoUsuario(e) {
    idUsuario = e.getAttribute("data-id");

    modalExclusaoBackground.classList.add("active");
    modalExclusao.classList.add("active");
    tituloModalExclusao.textContent = "Excluir Usuário";
    mensagemModalExclusao.textContent = "Tem certeza de que deseja excluir este usuário?";
    btnModalExclusao.setAttribute("onclick", `excluirUsuario(${idUsuario})`);
}

function fecharModalConfirmarExclusaoUsuario() {
    modalExclusaoBackground.classList.remove("active");
    modalExclusao.classList.remove("active");
    tbodyModalGerenciarUsuario.innerHTML = "";
}

function excluirUsuario(idUsuario) {
    fetch(`/usuario/deletar/${idUsuario}/${sessionStorage.ID_EMPRESA}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            abrirModalSucesso("Usuário excluído com sucesso!");
            inputBuscarUsuarios.value = "";
            fecharModalConfirmarExclusaoUsuario();
            listarUsuariosModalGerenciar();
        } else {
            throw "Houve um erro ao tentar excluir o usuário.";
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

// -- Modal de alteração de senha do usuário logado --

function validarCamposUsuarioLogado() {
    const senhaAtual = inputSenhaAtual.value;
    const novaSenha = inputNovaSenha.value;
    const confirmarNovaSenha = inputConfirmarNovaSenha.value;

    if (senhaAtual == "" || senhaAtual.length < 8) {
        inputSenhaAtual.classList.add("error");
        abrirModalErro("Senha atual inválida!");
    }
    else if (novaSenha == "" || novaSenha.length < 8) {
        inputNovaSenha.classList.add("error");
        abrirModalErro("Nova senha inválida!");
    }
    else if (confirmarNovaSenha == "" || confirmarNovaSenha != novaSenha) {
        inputConfirmarNovaSenha.classList.add("error");
        abrirModalErro("Confirmação de senha não correspondente!");
    }

    if (senhaAtual != "" && novaSenha == confirmarNovaSenha && novaSenha.length >= 8) {
        fetch(`/usuario/alterar/senha/${sessionStorage.ID_USUARIO}/${sessionStorage.ID_EMPRESA}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                senhaUsuarioAntiga: senhaAtual,
                senhaUsuarioNova: novaSenha
            }),
        }).then(function (resposta) {
            if (resposta.ok) {
                inputSenhaAtual.value = "";
                inputNovaSenha.value = "";
                inputConfirmarNovaSenha.value = "";
                abrirModalSucesso("Senha alterada com sucesso!");
            } else {
                abrirModalErro("Houve um erro ao tentar realizar a alteração de senha!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}

function removerErroCamposUsuarioLogado() {
    const senhaAtual = inputSenhaAtual.value;
    const novaSenha = inputNovaSenha.value;
    const confirmarNovaSenha = inputConfirmarNovaSenha.value;

    if (senhaAtual.length >= 8) inputSenhaAtual.classList.remove("error");
    if (novaSenha.length >= 8) inputNovaSenha.classList.remove("error");
    if (confirmarNovaSenha == novaSenha && confirmarNovaSenha.length >= 8) inputConfirmarNovaSenha.classList.remove("error");
}

function resetarModalUsuarioLogado() {
    inputSenhaAtual.value = "";
    inputNovaSenha.value = "";
    inputConfirmarNovaSenha.value = "";

    inputSenhaAtual.classList.remove("error");
    inputNovaSenha.classList.remove("error");
    inputConfirmarNovaSenha.classList.remove("error");

    inputSenhaAtual.setAttribute("type", "password");
    eyeIconSenhaAtual.src = "../assets/svg/invisible-password-icon-v2.svg";

    inputNovaSenha.setAttribute("type", "password");
    inputConfirmarNovaSenha.setAttribute("type", "password");
    eyeIconNovaSenha.forEach(e => {
        e.src = "../assets/svg/invisible-password-icon-v2.svg";
    });
}

function alternarVisibilidadeSenhaAtual() {
    if (inputSenhaAtual.type == "text") {
        inputSenhaAtual.setAttribute("type", "password");
        eyeIconSenhaAtual.src = "../assets/svg/invisible-password-icon-v2.svg";
    } else {
        inputSenhaAtual.setAttribute("type", "text");
        eyeIconSenhaAtual.src = "../assets/svg/visible-password-icon-v2.svg";
    }
}

function alternarVisibilidadeNovaSenha() {
    if (inputNovaSenha.type == "text" || inputConfirmarNovaSenha.type == "text") {
        inputNovaSenha.setAttribute("type", "password");
        inputConfirmarNovaSenha.setAttribute("type", "password");
        eyeIconNovaSenha.forEach(e => {
            e.src = "../assets/svg/invisible-password-icon-v2.svg";
        });
    } else {
        inputNovaSenha.setAttribute("type", "text");
        inputConfirmarNovaSenha.setAttribute("type", "text");
        eyeIconNovaSenha.forEach(e => {
            e.src = "../assets/svg/visible-password-icon-v2.svg";
        });
    }
}