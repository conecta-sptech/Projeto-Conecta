// Gráfico de Inatividade Dashboard Gerentes

function gerarGraficoInatividade(){
    let options = {
        series: [],
        chart: {
            type: 'donut',
            width: 400
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(1) + "%"
            },
            style: {
                colors: ['#ffffff']
            },
            offsetX: -10
        },
        labels: ['Máquinas Inativas', 'Máquinas Ativas'],
        colors: ['#808080', '#5ac69c']
    };

<<<<<<< HEAD
    let chart = new ApexCharts(document.querySelector("#chartInatividade"), options);
    chart.render();
    return chart;
}

//   -----------------------------------------------------

function exibirChartsRam() {
    btnExibirListaRam.classList.toggle("active");
    chartListRam.classList.toggle("active");
}

function exibirChartsCpu() {
    btnExibirListaCpu.classList.toggle("active");
    chartListCpu.classList.toggle("active");
}

function exibirChartsDisco() {
    btnExibirListaDisco.classList.toggle("active");
    chartListDisco.classList.toggle("active");
}

function exibirChartEscolhido(e) {
    const id = e.getAttribute("data-id");

    if (id == "1") {
        btnExibirListaRam.classList.remove("active");
        chartListRam.classList.remove("active");

        chartMemoriaRam.innerHTML = "";
        gerarGraficoMemoriaRamUso();
    }

    if (id == "2") {
        btnExibirListaRam.classList.remove("active");
        chartListRam.classList.remove("active");

        chartMemoriaRam.innerHTML = "";
        gerarGraficoMemoriaRamVirtual();
    }

    if (id == "3") {
        btnExibirListaRam.classList.remove("active");
        chartListRam.classList.remove("active");

        chartMemoriaRam.innerHTML = "";
        gerarGraficoMemoriaRamTempoLigado();
    }

    if (id == "4") {
        btnExibirListaCpu.classList.remove("active");
        chartListCpu.classList.remove("active");

        chartCpu.innerHTML = "";
        gerarGraficoProcessadorUso();
    }

    if (id == "5") {
        btnExibirListaCpu.classList.remove("active");
        chartListCpu.classList.remove("active");

        chartCpu.innerHTML = "";
        gerarGraficoProcessadorCarga();
    }

    if (id == "6") {
        btnExibirListaCpu.classList.remove("active");
        chartListCpu.classList.remove("active");

        chartCpu.innerHTML = "";
        gerarGraficoProcessadorTemperatura();
    }

    if (id == "7") {
        btnExibirListaDisco.classList.remove("active");
        chartListDisco.classList.remove("active");

        chartDisco.innerHTML = "";
        gerarGraficoDiscoArmazenamento();
    }

    if (id == "8") {
        btnExibirListaDisco.classList.remove("active");
        chartListDisco.classList.remove("active");

        chartDisco.innerHTML = "";
        gerarGraficoDiscoMemoriaSwap();
    }

    if (id == "9") {
        btnExibirListaDisco.classList.remove("active");
        chartListDisco.classList.remove("active");

        chartDisco.innerHTML = "";
        gerarGraficoDiscoCache();
    }
}

// const iconeMaquina = document.getElementById("svgLaptop");
// const copias = 10;

// for (let i = 0; i < copias; i++) {
//     const iconeClonado = iconeMaquina.cloneNode(true);
//     // document.body.appendChild(iconeClonado);
// }
=======
let chart = new ApexCharts(document.querySelector("#chartInatividade"), options);
chart.render();
>>>>>>> ac49dad2414c5f20520b59846805a03b1b85ccfa
