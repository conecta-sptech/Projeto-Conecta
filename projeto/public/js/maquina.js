const telaNovaMaquina = document.querySelector(".nova-maquina-ct");
const telaVisualizarMaquina = document.querySelector(".visualizar-maquina-ct");
const btnNovaMaquina = document.getElementById("btnNovaMaquina");
const btnVisualizarMaquina = document.getElementById("btnVisualizarMaquina");
const inputNomeMaquina = document.getElementById("inputNomeMaquina");
const inputIpMaquina = document.getElementById("inputIpMaquina");
const inputRamMaquina = document.getElementById("inputRamMaquina");
const inputCpuMaquina = document.getElementById("inputCpuMaquina");
const inputDiscoMaquina = document.getElementById("inputDiscoMaquina");
const inputBuscarMaquinasModal = document.getElementById("inputBuscarMaquinasModal");
const line3ModalMaquina = document.getElementById("line3ModalMaquina");

function resetarModalMaquina() {
    btnNovaMaquina.classList.add("active");
    btnVisualizarMaquina.classList.remove("active");
    telaNovaMaquina.classList.add("active");
    telaVisualizarMaquina.classList.remove("active");
    line3ModalMaquina.style.display = "flex";

    inputNomeMaquina.value = "";
    inputIpMaquina.value = "";
    inputRamMaquina.value = "";
    inputCpuMaquina.value = "";
    inputDiscoMaquina.value = "";
    inputBuscarMaquinasModal.value = "";

    inputNomeMaquina.classList.remove("error");
    inputIpMaquina.classList.remove("error");
    inputRamMaquina.classList.remove("error");
    inputCpuMaquina.classList.remove("error");
    inputDiscoMaquina.classList.remove("error");
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
    const nomeMaquina = inputNomeMaquina.value;
    const ipMaquina = inputIpMaquina.value;
    const ramMaquina = inputRamMaquina.value;
    const cpuMaquina = inputCpuMaquina.value;
    const discoMaquina = inputDiscoMaquina.value;
    const idEmpresa = sessionStorage.ID_EMPRESA;

    if (nomeMaquina == "") inputNomeMaquina.classList.add("error");
    if (ipMaquina == "") inputIpMaquina.classList.add("error");
    if (ramMaquina == "") inputRamMaquina.classList.add("error");
    if (cpuMaquina == "") inputCpuMaquina.classList.add("error");
    if (discoMaquina == "") inputDiscoMaquina.classList.add("error");

    if (nomeMaquina != "" && ipMaquina != "" && ramMaquina != "" && cpuMaquina != "" && discoMaquina != "") {
        //fetch
    }
}

function removerErroCamposMaquina() {
    const nomeMaquina = inputNomeMaquina.value;
    const ipMaquina = inputIpMaquina.value;
    const ramMaquina = inputRamMaquina.value;
    const cpuMaquina = inputCpuMaquina.value;
    const discoMaquina = inputDiscoMaquina.value;

    if (nomeMaquina != "") inputNomeMaquina.classList.remove("error");
    if (ipMaquina != "") inputIpMaquina.classList.remove("error");
    if (ramMaquina != "") inputRamMaquina.classList.remove("error");
    if (cpuMaquina != "") inputCpuMaquina.classList.remove("error");
    if (discoMaquina != "") inputDiscoMaquina.classList.remove("error");
}