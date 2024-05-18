const inputBuscarMaquinasModal = document.getElementById("inputBuscarMaquinasModal");
const tbodyModalGerenciarMaquina = document.getElementById("tbodyModalGerenciarMaquina");

let idMaquina = 0;

function resetarModalMaquina() {
    inputBuscarMaquinasModal.value = "";
    tbodyModalGerenciarMaquina.innerHTML = "";
}

function listarMaquinasModalGerenciar() {
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

function filtrarMaquinasModalInicial(e) {
    tbodyModalGerenciarMaquina.innerHTML = ``;
    for (let i = 0; i < listaMaquinas.length; i++) {
        if (e.value == "") {
            tbodyModalGerenciarMaquina.innerHTML = ``;
            listarMaquinasModalGerenciar();
        }
        else if ((listaMaquinas[i].hostnameMaquina.toUpperCase().startsWith(e.value.toUpperCase()))) {
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
    listarMaquinasModalGerenciar();
}

function excluirMaquina(idMaquina) {
    // Realizar o fetch de exclusão



    fecharModalConfirmarExclusaoMaquina();
}