const inputBuscarMaquinasModal = document.getElementById("inputBuscarMaquinasModal");
const tbodyModalGerenciarMaquina = document.getElementById("tbodyModalGerenciarMaquina");

let idMaquina = 0;

function resetarModalMaquina() {
    inputBuscarMaquinasModal.value = "";
    tbodyModalGerenciarMaquina.innerHTML = "";
}

async function listarMaquinasModalGerenciar() {
    tbodyModalGerenciarMaquina.innerHTML = ``;
    listaMaquinas = await listarMaquinas();
    for (let i = 0; i < listaMaquinas.length; i++) {
        tbodyModalGerenciarMaquina.innerHTML += `
        <tr>
            <td class="nome-td">${listaMaquinas[i].hostnameMaquina}</td>
            <td class="icons-ct">
                <button id="btnExcluir" data-id="${listaMaquinas[i].idMaquina}" onclick="abrirModalConfirmarExclusaoMaquina(this)">
                    <img src="../assets/svg/trash.svg">
                </button>
            </td>
        </tr>
        `;
    }
}

function filtrarMaquinasModalGerenciar(e) {
    tbodyModalGerenciarMaquina.innerHTML = ``;
    if (e.value == "") {
        listarMaquinasModalGerenciar();
    } else {
        for (let i = 0; i < listaMaquinas.length; i++) {
            if (listaMaquinas[i].hostnameMaquina.toUpperCase().startsWith(e.value.toUpperCase())) {
                tbodyModalGerenciarMaquina.innerHTML += `
            <tr>
                <td class="nome-td">${listaMaquinas[i].hostnameMaquina}</td>
                <td class="icons-ct">
                    <button id="btnExcluir" data-id="${listaMaquinas[i].idMaquina}" onclick="abrirModalConfirmarExclusaoMaquina(this)">
                        <img src="../assets/svg/trash.svg">
                    </button>
                </td>
            </tr>
        `;
            }
        }
    }
}

function abrirModalConfirmarExclusaoMaquina(e) {
    idMaquina = e.getAttribute("data-id");

    modalExclusaoBackground.classList.add("active");
    modalExclusao.classList.add("active");
    tituloModalExclusao.textContent = "Excluir Máquina";
    mensagemModalExclusao.textContent = "Tem certeza de que deseja excluir esta máquina?";
    btnModalExclusao.setAttribute("onclick", `excluirMaquina(${idMaquina})`);
}

function fecharModalConfirmarExclusaoMaquina() {
    modalExclusaoBackground.classList.remove("active");
    modalExclusao.classList.remove("active");
    tbodyModalGerenciarMaquina.innerHTML = "";
}

function excluirMaquina(idMaquina) {
    fetch(`/maquina/deletar/${idMaquina}/${sessionStorage.ID_EMPRESA}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            abrirModalSucesso("Máquina excluída com sucesso!");
            inputBuscarMaquinasModal.value = "";
            fecharModalConfirmarExclusaoMaquina();
            listarMaquinasModalGerenciar();
        } else {
            throw "Houve um erro ao tentar excluir a máquina.";
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}