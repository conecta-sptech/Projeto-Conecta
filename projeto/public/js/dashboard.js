const sidebar = document.querySelector(".sidebar");
const sidebarIconsCol3 = document.querySelector(".sidebar .icons-col-3");

const nomeUsuario = document.querySelectorAll(".nome-usuario");
const nomeEmpresa = document.getElementById("nomeEmpresa");
const hostnameTempoCt = document.getElementById("hostnameTempoCt");
const hostnameMaquina = document.getElementById("hostnameMaquina");
const companyNameCt = document.querySelector(".company-name-ct");
const tempoAtualizacaoBtn = document.querySelector(".tempo-atualizacao-ct");
const listaTempoAtualizacao = document.getElementById("listaTempoAtualizacao");

const navLine1 = document.querySelector("nav .line-1");
const navLine4 = document.querySelector("nav .line-4");

const btnPesquisarMaquina = document.getElementById("btnPesquisarMaquina");
const btnSuporte = document.getElementById("btnSuporte");
const btnLogoutSidebar = document.querySelector(".sidebar .icons-col-3 .btn-logout");
const btnGerenciarUsuarioSidebar = document.getElementById("btnGerenciarUsuarioSidebar");
const btnGerenciarMaquinaSidebar = document.getElementById("btnGerenciarMaquinaSidebar");
const btnGerenciarMaquinaText = document.querySelector("#btnGerenciarMaquina .icon-description");

const chartsGerenteFuncionario = document.getElementById("chartsGerenteFuncionario");
const chartsAdmin = document.getElementById("chartsAdmin");

const dropDownMenu = document.querySelector(".drop-down-menu");
const downArrowIcon = document.querySelector(".down-arrow-icon");

const modalBackground = document.querySelector(".modal-background");
const modalUsuarioBackground = document.querySelector(".modal-usuario-background");
const modalMaquinaBackground = document.querySelector(".modal-maquina-background");
const modalUsuarioLogadoBackground = document.querySelector(".modal-usuario-logado-background");
const modalLogoutBackground = document.querySelector(".modal-logout-background");
const modalExclusaoBackground = document.querySelector(".modal-exclusao-background");
const modalSucessoBackground = document.querySelector(".modal-sucesso-background");
const modalSucesso = document.querySelector(".modal-sucesso");
const mensagemModalSucesso = document.getElementById("mensagemModalSucesso");
const modalBackgroundErro = document.querySelector(".modal-background-erro");
const modalErro = document.querySelector(".modal-erro-alteracao");
const mensagemModalErro = document.getElementById("mensagemModalErro");
const modalInicial = document.querySelector(".modal-inicio");
const mensagemModalInicial = document.getElementById("mensagemModalInicial");
const modalInicialLine3 = document.querySelector(".modal-inicio .line-3");
const inputBuscarMaquinasModalInicial = document.getElementById("inputBuscarMaquinasModalInicial");

const modalExclusao = document.getElementById("modalExclusao");
const tituloModalExclusao = document.getElementById("tituloModalExclusao");
const mensagemModalExclusao = document.getElementById("mensagemModalExclusao");
const btnModalExclusao = document.getElementById("btnModalExclusao");

const loadingBackground = document.querySelector(".loading-background");
const mainContentLoading = document.getElementById("mainContentLoading");

const tbodyModalInicial = document.getElementById("tbodyModalInicial");
let listaMaquinas = null;
let listaUsuarios = null;
let listaGraficos = [];

function removerTelaLoading() {
    setTimeout(() => {
        mainContentLoading.setAttribute("id", "mainContentNoLoading");
        loadingBackground.classList.remove("active");
    }, 1500);
}

function resetarModalInicial() {
    inputBuscarMaquinasModalInicial.value = "";

    tbodyModalInicial.innerHTML = ``;
    listarMaquinasModalInicial();
}

function abrirModalInicial() {
    modalBackground.classList.add("active");
    modalInicial.classList.add("active");

    modalInicialLine3.innerHTML = `
    <button class="btn-logout" onclick="fecharModal(this)" data-id="modalInicio">Cancelar</button>
    `;

    resetarModalInicial();
}

function carregarInformacoesTela() {
    if (sessionStorage.getItem("FUNCAO_USUARIO") == "Administrador") {
        companyNameCt.classList.add("active");
        nomeEmpresa.textContent = sessionStorage.getItem("NOME_EMPRESA");
        hostnameTempoCt.remove();
        btnPesquisarMaquina.remove();
        sidebarIconsCol3.classList.add("admin");
        btnSuporte.remove();
        btnLogoutSidebar.classList.add("admin");
        mensagemModalInicial.innerHTML = "Olá, seja bem-vindo(a)!";

        navLine4.classList.add("admin");
        navLine4.innerHTML = `
        <button class="btn-support" onclick="abrirModal(this)" data-id="modalSuporte" title="Suporte">
                <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0, 0, 400,400">
                    <g id="svgg">
                        <path id="path0"
                            d="M173.878 1.269 C 22.854 20.611,-51.930 197.911,39.472 319.922 C 137.520 450.804,344.432 414.773,391.657 258.594 C 433.821 119.149,318.393 -17.239,173.878 1.269 M228.202 30.799 C 349.888 51.472,411.276 190.994,343.727 293.359 C 270.101 404.933,105.056 394.968,46.106 275.391 C -5.287 171.143,60.950 46.243,176.172 30.131 C 193.992 27.638,210.877 27.855,228.202 30.799 M183.362 100.405 C 162.007 104.457,146.749 117.715,145.498 133.308 C 144.192 149.580,163.464 156.505,172.603 143.047 C 186.167 123.074,219.916 126.496,219.734 147.826 C 219.662 156.247,216.035 161.301,201.865 172.728 C 184.503 186.728,179.440 196.546,179.344 216.406 C 179.272 231.250,181.430 234.375,192.178 234.992 C 205.818 235.774,208.781 233.102,209.904 219.007 C 211.073 204.343,212.901 201.169,226.869 189.540 C 252.208 168.445,260.189 144.919,249.077 124.071 C 239.461 106.029,209.876 95.375,183.362 100.405 M190.099 253.172 C 174.782 256.143,168.549 275.193,178.998 287.095 C 189.318 298.848,209.345 294.295,213.734 279.199 C 218.082 264.241,205.344 250.214,190.099 253.172 "
                            stroke="none" fill="#ffffff" fill-rule="evenodd"></path>
                    </g>
                </svg>
            </button>
        `;

        btnGerenciarMaquinaSidebar.setAttribute("data-id", "modalInfoEmpresa");
        btnGerenciarMaquinaSidebar.innerHTML = `
        <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0, 0, 400,400">
                    <g id="svgg">
                        <path id="path0"
                            d="M166.406 21.875 L 166.406 34.375 141.016 34.375 L 115.625 34.375 115.625 82.230 L 115.625 130.086 123.242 133.734 C 163.647 153.084,188.517 197.929,181.681 239.106 C 177.626 263.531,158.482 306.215,130.011 354.308 C 126.446 360.330,123.296 365.867,123.009 366.613 C 122.518 367.893,125.965 367.969,184.682 367.969 L 246.875 367.969 246.875 329.688 L 246.875 291.406 258.984 291.406 L 271.094 291.406 271.094 329.688 L 271.094 367.969 335.547 367.969 L 400.000 367.969 400.000 201.172 L 400.000 34.375 375.000 34.375 L 350.000 34.375 350.000 21.875 L 350.000 9.375 258.203 9.375 L 166.406 9.375 166.406 21.875 M243.750 103.516 L 243.750 115.625 220.313 115.625 L 196.875 115.625 196.875 103.516 L 196.875 91.406 220.313 91.406 L 243.750 91.406 243.750 103.516 M321.094 103.516 L 321.094 115.625 297.656 115.625 L 274.219 115.625 274.219 103.516 L 274.219 91.406 297.656 91.406 L 321.094 91.406 321.094 103.516 M243.750 153.516 L 243.750 165.625 220.313 165.625 L 196.875 165.625 196.875 153.516 L 196.875 141.406 220.313 141.406 L 243.750 141.406 243.750 153.516 M321.094 153.516 L 321.094 165.625 297.656 165.625 L 274.219 165.625 274.219 153.516 L 274.219 141.406 297.656 141.406 L 321.094 141.406 321.094 153.516 M69.577 148.494 C 30.029 153.341,-0.000 186.831,-0.000 226.090 C 0.000 245.186,10.613 272.777,35.251 317.736 C 49.360 343.482,77.796 390.625,79.216 390.625 C 80.300 390.625,107.253 346.247,119.311 324.609 C 145.920 276.863,158.594 244.983,158.594 225.799 C 158.594 179.904,115.889 142.818,69.577 148.494 M90.625 179.341 C 128.270 188.187,141.175 234.510,113.709 262.196 C 83.701 292.443,32.453 272.793,29.945 230.078 C 28.023 197.345,58.565 171.808,90.625 179.341 M243.750 202.734 L 243.750 214.844 220.313 214.844 L 196.875 214.844 196.875 202.734 L 196.875 190.625 220.313 190.625 L 243.750 190.625 243.750 202.734 M321.094 202.734 L 321.094 214.844 297.656 214.844 L 274.219 214.844 274.219 202.734 L 274.219 190.625 297.656 190.625 L 321.094 190.625 321.094 202.734 M69.558 204.064 C 57.175 208.818,50.775 223.605,55.563 236.401 C 63.274 257.010,91.967 258.281,101.731 238.447 C 111.950 217.690,91.366 195.693,69.558 204.064 M243.750 252.734 L 243.750 264.844 220.313 264.844 L 196.875 264.844 196.875 252.734 L 196.875 240.625 220.313 240.625 L 243.750 240.625 243.750 252.734 M321.094 252.734 L 321.094 264.844 297.656 264.844 L 274.219 264.844 274.219 252.734 L 274.219 240.625 297.656 240.625 L 321.094 240.625 321.094 252.734 "
                            stroke="none" fill="#ffffff" fill-rule="evenodd"></path>
                    </g>
                </svg>
                <span class="icon-description">Gerenciar Empresa</span>
        `;

    } else if (sessionStorage.getItem("FUNCAO_USUARIO") == "Gerente") {
        nomeUsuario.forEach(e => e.textContent = sessionStorage.getItem("NOME_USUARIO").split(' ')[0]);
    } else {
        nomeUsuario.forEach(e => e.textContent = sessionStorage.getItem("NOME_USUARIO").split(' ')[0]);
        btnGerenciarUsuarioSidebar.remove();
        btnGerenciarMaquinaSidebar.remove();
    }
}

async function listarMaquinasModalInicial() {
    listaEstado[0] = await listarIds("Amarelo");
    listaEstado[1] = await listarIds("Vermelho");

    for (let i = 0; i < listaMaquinas.length; i++) {
        tbodyModalInicial.innerHTML += `
        <tr>
            <td class="icons-ct">
                <button onclick="definirDashboard(this)" class="btn-visualizar-maquina-inicio" data-id="${listaMaquinas[i].idMaquina}" data-hostname="${listaMaquinas[i].hostnameMaquina}">
                    <img src="../assets/svg/visible-password-icon-v3.svg">
                </button>
            </td>
            <td class="hostname-td">${listaMaquinas[i].hostnameMaquina}</td>
            <td class="ram-td">${listaMaquinas[i].ramMaquina} GB</td>
            <td class="disco-td">${listaMaquinas[i].discoMaquina} GB</td>
            <td class="clock-td">${listaMaquinas[i].clockProcessadorMaquina} GHz</td>
            <td class="nucleos-td">${listaMaquinas[i].nucleosProcessadorMaquina}</td>
        </tr>
        `;

        if (listaEstado[0].includes(listaMaquinas[i].idMaquina)) {
            document.querySelector(`.btn-visualizar-maquina-inicio[data-id="${listaMaquinas[i].idMaquina}"]`).style.backgroundColor = "#EDE63F";
        }

        if (listaEstado[1].includes(listaMaquinas[i].idMaquina)) {
            document.querySelector(`.btn-visualizar-maquina-inicio[data-id="${listaMaquinas[i].idMaquina}"]`).style.backgroundColor = "#E53C3C";
       }
    }
}

function carregarModalInicial() {
    if (sessionStorage.getItem("FUNCAO_USUARIO") != "Administrador") {
        setTimeout(() => {
            modalBackground.classList.add("active");
            modalInicial.classList.add("active");
            listarMaquinasModalInicial();
        }, 1600);
    } else {
        chartsGerenteFuncionario.remove();
        chartsAdmin.classList.add("active");
        modalInicial.remove();
    }

    carregarInformacoesTela();
}

function definirDashboard(e) {
    const idMaquina = e.getAttribute("data-id");
    listaGraficos = [2, 2, 3, 1];

    companyNameCt.classList.add("active");
    nomeEmpresa.textContent = sessionStorage.getItem("NOME_EMPRESA");
    hostnameMaquina.textContent = e.getAttribute("data-hostname");
    tempoAtualizacaoBtn.classList.add("active");

    if (sessionStorage.getItem("FUNCAO_USUARIO") == "Administrador") {
        chartsAdmin.classList.add("active");
        chartsGerenteFuncionario.remove();

        plotarGraficoInatividade();
        plotarTabelaInatividade();
        gerarGraficoInatividade();

    } else {
        chartsGerenteFuncionario.classList.add("active");
        chartsAdmin.remove();

        chartMemoriaRam.innerHTML = "";
        chartCpu.innerHTML = "";
        chartDisco.innerHTML = "";
        chartRede1.innerHTML = "";
        chartRede2.innerHTML = "";

        plotarDadosGrafico(idMaquina, true);

        plotarDadosGrafico(idMaquina, false);

        gerarGraficoProcessadorUso();
        gerarGraficoDiscoArmazenamento();
        gerarGraficoRede();
    }

    modalBackground.classList.remove("active");
    modalInicial.classList.remove("active");
}


function listarMaquinas() {
    return fetch(`/maquina/buscar-maquina/${sessionStorage.getItem("ID_EMPRESA")}`)
        .then(res => res.json());
}

window.addEventListener("load", async () => {
    if (sessionStorage.length == 0) {
        window.location.href = "../login.html";
    } else {
        removerTelaLoading();
        carregarModalInicial();
        listaMaquinas = await listarMaquinas();
    }
});

function abrirModalSucesso(message) {
    modalSucessoBackground.classList.add("active");
    modalSucesso.classList.add("active");

    mensagemModalSucesso.textContent = message;
}

function abrirModalErro(message) {
    modalBackgroundErro.classList.add("active");
    modalErro.classList.add("active");

    mensagemModalErro.textContent = message;

}

function abrirModal(e) {
    const id = e.getAttribute("data-id");
    document.getElementById(id).classList.add("active");

    if (id == "modalLogout") {
        modalLogoutBackground.classList.add("active");
    } else if (id == "modalUsuario") {
        modalUsuarioBackground.classList.add("active");
        resetarModalUsuario();
    } else if (id == "modalMaquina") {
        modalMaquinaBackground.classList.add("active");
        resetarModalMaquina();
        listarMaquinasModalGerenciar();
    } else if (id == "modalUsuarioLogado") {
        modalUsuarioLogadoBackground.classList.add("active");
        resetarModalUsuarioLogado();
    } else {
        modalBackground.classList.add("active");
    }
}

function fecharModal(e) {
    const id = e.getAttribute("data-id");
    document.getElementById(id).classList.remove("active");

    if (id == "modalLogout") {
        modalLogoutBackground.classList.remove("active");
    } else if (id == "modalUsuario") {
        modalUsuarioBackground.classList.remove("active");
    } else if (id == "modalMaquina") {
        modalMaquinaBackground.classList.remove("active");
    } else if (id == "modalUsuarioLogado") {
        modalUsuarioLogadoBackground.classList.remove("active");
    } else if (id == "modalSucesso") {
        modalSucessoBackground.classList.remove("active");
    } else if (id == "modalExclusao") {
        modalExclusaoBackground.classList.remove("active");
    }
    else if (id == "modalErro") {
        modalBackgroundErro.classList.remove("active");
    } else {
        modalBackground.classList.remove("active");
    }
}

function alterarMenuSidebar() {
    sidebar.classList.toggle("active");
    navLine1.classList.toggle("active");
}

function alternarMenuNavbar() {
    dropDownMenu.classList.toggle("active");
    downArrowIcon.classList.toggle("active");
}

function encerrarSessao() {
    sessionStorage.clear();
    window.location.href = "../login.html";
}

function mostrarDescricaoKpi(e) {
    const id = e.getAttribute("data-id");
    document.getElementById(id).classList.add("active");

}

function esconderDescricaoKpi(e) {
    const id = e.getAttribute("data-id");
    document.getElementById(id).classList.remove("active");
}

function mostrarListaTempoAtualizacao() {
    listaTempoAtualizacao.classList.toggle("active");
}

function definirTempoAtualizacao() {
    listaTempoAtualizacao.classList.remove("active");
}

function filtrarMaquinasModalInicial(e) {
    tbodyModalInicial.innerHTML = ``;
    for (let i = 0; i < listaMaquinas.length; i++) {
        if (e.value == "") {
            tbodyModalInicial.innerHTML = ``;
            listarMaquinasModalInicial();
        }
        else if ((listaMaquinas[i].hostnameMaquina.toUpperCase().startsWith(e.value.toUpperCase()))) {
            tbodyModalInicial.innerHTML += `
             <tr>
            <td class="icons-ct">
                <button onclick="definirDashboard(this)" class="btn-visualizar-maquina-inicio" data-id="${listaMaquinas[i].idMaquina}" data-hostname="${listaMaquinas[i].hostnameMaquina}">
                    <img src="../assets/svg/visible-password-icon-v3.svg">
                </button>
            </td>
            <td class="hostname-td">${listaMaquinas[i].hostnameMaquina}</td>
            <td class="ram-td">${listaMaquinas[i].ramMaquina} GB</td>
            <td class="disco-td">${listaMaquinas[i].discoMaquina} GB</td>
            <td class="clock-td">${listaMaquinas[i].clockProcessadorMaquina} GHz</td>
            <td class="nucleos-td">${listaMaquinas[i].nucleosProcessadorMaquina}</td>
            </tr>
            `;
        }
    }
}


