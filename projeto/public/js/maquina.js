const telaNovaMaquina = document.querySelector(".nova-maquina-ct");
const telaVisualizarMaquina = document.querySelector(".visualizar-maquina-ct");
const btnNovaMaquina = document.getElementById("btnNovaMaquina");
const btnVisualizarMaquina = document.getElementById("btnVisualizarMaquina");
const inputHostnameMaquina = document.getElementById("inputHostnameMaquina");
const inputSistemaOperacionalMaquina = document.getElementById("inputSistemaOperacionalMaquina");
const inputRamMaquina = document.getElementById("inputRamMaquina");
const inputDiscoMaquina = document.getElementById("inputDiscoMaquina");
const inputClockMaquina = document.getElementById("inputClockMaquina");
const inputNucleoMaquina = document.getElementById("inputNucleoMaquina");
const inputBuscarMaquinasModal = document.getElementById("inputBuscarMaquinasModal");
const line3ModalMaquina = document.getElementById("line3ModalMaquina");

function resetarModalMaquina() {
    btnNovaMaquina.classList.add("active");
    btnVisualizarMaquina.classList.remove("active");
    telaNovaMaquina.classList.add("active");
    telaVisualizarMaquina.classList.remove("active");
    line3ModalMaquina.style.display = "flex";

    inputHostnameMaquina.value = "";
    inputSistemaOperacionalMaquina.value = "";
    inputRamMaquina.value = "";
    inputDiscoMaquina.value = "";
    inputClockMaquina.value = "";
    inputNucleoMaquina.value = "";
    inputBuscarMaquinasModal.value = "";

    inputHostnameMaquina.classList.remove("error");
    inputSistemaOperacionalMaquina.classList.remove("error");
    inputRamMaquina.classList.remove("error");
    inputDiscoMaquina.classList.remove("error");
    inputClockMaquina.classList.remove("error");
    inputNucleoMaquina.classList.remove("error");
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

function validarCamposMaquina() {
    const nomeMaquina = inputHostnameMaquina.value;
    const sistemaOperacionalMaquina = inputSistemaOperacionalMaquina.value;
    const ramMaquina = inputRamMaquina.value;
    const discoMaquina = inputDiscoMaquina.value;
    const clockMaquina = inputClockMaquina.value;
    const nucleoMaquina = inputNucleoMaquina.value;
    const idEmpresa = sessionStorage.ID_EMPRESA;

    if (nomeMaquina == "") inputHostnameMaquina.classList.add("error");
    if (sistemaOperacionalMaquina == "") inputSistemaOperacionalMaquina.classList.add("error");
    if (ramMaquina == "") inputRamMaquina.classList.add("error");
    if (discoMaquina == "") inputDiscoMaquina.classList.add("error");
    if (clockMaquina == "") inputClockMaquina.classList.add("error");
    if (nucleoMaquina == "") inputNucleoMaquina.classList.add("error");

    if (nomeMaquina != "" && sistemaOperacionalMaquina != "" && ramMaquina != "" && discoMaquina != "" && clockMaquina != "" && nucleoMaquina != "") {
        //fetch
    }
}

function removerErroCamposMaquina() {
    const nomeMaquina = inputHostnameMaquina.value;
    const sistemaOperacionalMaquina = inputSistemaOperacionalMaquina.value;
    const ramMaquina = inputRamMaquina.value;
    const clockMaquina = inputClockMaquina.value;
    const discoMaquina = inputDiscoMaquina.value;
    const nucleoMaquina = inputNucleoMaquina.value;

    if (nomeMaquina != "") inputHostnameMaquina.classList.remove("error");
    if (sistemaOperacionalMaquina != "") inputSistemaOperacionalMaquina.classList.remove("error");
    if (ramMaquina != "") inputRamMaquina.classList.remove("error");
    if (discoMaquina != "") inputDiscoMaquina.classList.remove("error");
    if (clockMaquina != "") inputClockMaquina.classList.remove("error");
    if (nucleoMaquina != "") inputNucleoMaquina.classList.remove("error");
}