const chartMemoriaRam = document.getElementById("chartMemoriaRam");
const chartMemoriaTaxa1 = document.getElementById("chartMemoriaTaxa1");
const chartMemoriaTaxa2 = document.getElementById("chartMemoriaTaxa2");
const chartCpu = document.getElementById("chartCpu");
const chartDisco = document.getElementById("chartDisco");
const chartRede1 = document.getElementById("chartRede1");
const chartRede2 = document.getElementById("chartRede2");

const btnExibirListaRam = document.getElementById("btnExibirListaRam");
const btnExibirListaCpu = document.getElementById("btnExibirListaCpu");
const btnExibirListaDisco = document.getElementById("btnExibirListaDisco");
const chartListRam = document.getElementById("chartListRam");
const chartListCpu = document.getElementById("chartListCpu");
const chartListDisco = document.getElementById("chartListDisco");

function gerarGraficoMemoriaRamUso(totalMemory, freeMemory) {
    let freeMemoryPercent = Number(((freeMemory * 100) / totalMemory).toFixed(2)); // Uso de memória RAM em porcentagem
    let usedMemoryPercent = Number((100 - freeMemoryPercent).toFixed(2));

    console.log(freeMemoryPercent);
    console.log(usedMemoryPercent);

    let options = {
        chart: {
            type: 'donut',
        },
        series: [usedMemoryPercent, freeMemoryPercent],
        labels: ['Usado', 'Livre'],
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return val + '%';
            },
            style: {
                fontSize: '12px',
                color: '#ffffff'
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            fontSize: '22px',
                            color: '#ffffff'
                        },
                        value: {
                            fontSize: '16px',
                            color: '#ffffff'
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                return '100%';
                            },
                            color: '#ffffff'
                        }
                    }
                }
            }
        },
        legend: {
            show: false,
        },
        colors: ['#93E4C4', '#333'],
    };

    setTimeout(() => {new ApexCharts(chartMemoriaRam, options).render();}, 200);
}


function gerarGraficoMemoriaRamUsoa() {
    let totalMemory = 16; // Total de memória RAM disponível (em GB)
    let usedMemory = 10; // Memória RAM usada (em GB)
    let memoryUsage = (usedMemory / totalMemory) * 100; // Uso de memória RAM em porcentagem

    let options = {
        chart: {
            type: 'donut',
        },
        series: [memoryUsage, 100 - memoryUsage],
        labels: ['Usado', 'Livre'],
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex] + '%';
            },
            style: {
                fontSize: '12px',
                color: '#ffffff'
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            fontSize: '22px',
                            color: '#ffffff'
                        },
                        value: {
                            fontSize: '16px',
                            color: '#ffffff'
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                return '100%';
                            },
                            color: '#ffffff'
                        }
                    }
                }
            }
        },
        legend: {
            show: false,
        },
        colors: ['#93E4C4', '#333'],
    };

    new ApexCharts(chartMemoriaRam, options).render();
}


function gerarGraficoMemoriaRamVirtual() {
    let totalMemory = 16; // Total de memória RAM disponível (em GB)
    let usedMemory = 8; // Memória RAM usada (em GB)
    let systemMemory = 2; // Memória RAM dedicada ao sistema operacional (em GB)

    // Calculando a memória RAM livre excluindo a memória dedicada ao sistema operacional
    let freeMemory = totalMemory - usedMemory - systemMemory;

    // Calculando a porcentagem de memória RAM usada pelo sistema operacional
    let systemMemoryPercentage = (systemMemory / totalMemory) * 100;

    let options = {
        chart: {
            type: 'donut',
        },
        series: [systemMemoryPercentage, 100 - systemMemoryPercentage],
        labels: ['SO', 'Outros'],
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return val + '%';
            },
            style: {
                fontSize: '16px',
                color: '#ffffff'
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            fontSize: '22px',
                            color: '#ffffff'
                        },
                        value: {
                            fontSize: '16px',
                            offsetY: 8,
                            color: '#ffffff'
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: '#ffffff',
                            formatter: function (w) {
                                return '100%';
                            }
                        }
                    }
                }
            }
        },
        legend: {
            show: false,
        },
        colors: ['#93E4C4', '#2B2B2B'],
    };

    new ApexCharts(chartMemoriaRam, options).render();
}

function gerarGraficoMemoriaRamTempoLigado() {
    chartMemoriaRam.innerHTML = `
    <h4>Tempo de Atividade</h4>
    <div class="tempo-atividade-ct">
        <img src="../assets/svg/clock.svg">
        <div>
            <p>7:00 hora(s)</p>
            <p>28/04/2024</p>
        </div>
    </div>
    `;
}

function gerarGraficoProcessadorUso() {
    let options = {
        series: [{
            name: "Uso Processador",
            data: [89, 45, 72, 33, 56, 21, 94, 12, 68, 77, 43, 91, 26, 58, 37]
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Utilização da CPU',
            align: 'left',
            style: {
                fontSize: '20px',
                color: '#ffffff'
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.1
            },
        },
        xaxis: {
            categories: ['0s', '10s', '20s', '30s', '40s', '50s', '60s', '70s', '80s', '90s', '100s', '110s', '120s', '130s', '140s'],
            labels: {
                style: {
                    fontSize: '18px',
                    colors: Array(15).fill('#ffffff')
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "%";
                },
                style: {
                    fontSize: '18px',
                    colors: ['#ffffff']
                }
            }
        },
        colors: ['#93E4C4']
    };

    new ApexCharts(chartCpu, options).render();
}

function gerarGraficoProcessadorCarga() {
    let options = {
        series: [{
            name: "Carga da CPU",
            data: [37, 58, 26, 91, 43, 77, 68, 12, 94, 21, 56, 33, 72, 45, 89]
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Carga da CPU',
            align: 'left',
            style: {
                fontSize: '20px',
                color: '#ffffff'
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.1
            },
        },
        xaxis: {
            categories: ['0s', '10s', '20s', '30s', '40s', '50s', '60s', '70s', '80s', '90s', '100s', '110s', '120s', '130s', '140s'],
            labels: {
                style: {
                    fontSize: '18px',
                    colors: Array(15).fill('#ffffff')
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "%";
                },
                style: {
                    fontSize: '18px',
                    colors: ['#ffffff']
                }
            }
        },
        colors: ['#93E4C4']
    };

    new ApexCharts(chartCpu, options).render();
}

function gerarGraficoProcessadorTemperatura() {
    let options = {
        series: [{
            name: "Temperatura Da CPU",
            data: [77, 54, 89, 62, 42, 95, 71, 36, 81, 48, 67, 93]
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Temperatura da CPU',
            align: 'left',
            style: {
                fontSize: "20px",
                color: '#FFFFFF'
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.1
            },
        },
        xaxis: {
            categories: ['0s', '10s', '20s', '30s', '40s', '50s', '60s', '70s', '80s', '90s', '100s', '110s'],
            labels: {
                style: {
                    fontSize: "18px",
                    colors: '#FFFFFF'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "° C";
                },
                style: {
                    fontSize: "18px",
                    colors: '#FFFFFF'
                }
            }
        },
        colors: ['#93E4C4']
    };

    new ApexCharts(chartCpu, options).render();
}

function gerarGraficoDiscoArmazenamento() {
    let totalStorage = 100; // Total de armazenamento disponível (em GB)
    let usedStorage = 60; // Armazenamento usado (em GB)
    let freeStorage = totalStorage - usedStorage; // Espaço livre (em GB)

    let options = {
        chart: {
            type: 'donut',
        },
        series: [usedStorage, freeStorage],
        labels: ['Usado', 'Livre'],
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex] + '%';
            },
            style: {
                fontSize: '16px',
                color: '#ffffff'
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            fontSize: '22px',
                            color: '#ffffff'
                        },
                        value: {
                            fontSize: '16px',
                            color: '#ffffff'
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: '#ffffff',
                            formatter: function (w) {
                                return '100%';
                            }
                        }
                    }
                }
            }
        },
        legend: {
            show: false,
        },
        colors: ['#93E4C4', '#333'],
    };

    new ApexCharts(chartDisco, options).render();
}

function gerarGraficoDiscoMemoriaSwap() {
    let options = {
        series: [{
            name: "Memória SWAP",
            data: [93, 67, 48, 81, 36, 71, 95, 42, 62, 89, 54, 77]
        }],
        chart: {
            height: 224,
            width: 570,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Memória SWAP',
            align: 'left',
            style: {
                fontSize: "14px",
                color: '#FFFFFF'
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.1
            },
        },
        xaxis: {
            categories: ['0s', '10s', '20s', '30s', '40s', '50s', '60s', '70s', '80s', '90s', '100s', '110s'],
            labels: {
                style: {
                    fontSize: "12px",
                    colors: '#FFFFFF'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "%";
                },
                style: {
                    fontSize: "12px",
                    colors: '#FFFFFF'
                }
            }
        },
        colors: ['#93E4C4']
    };

    new ApexCharts(chartDisco, options).render();
}

function gerarGraficoDiscoCache() {
    let options = {
        series: [{
            name: "Uso do Cache",
            data: [77, 54, 89, 62, 42, 95, 71, 36, 81, 48, 67, 93]
        }],
        chart: {
            height: 224,
            width: 570,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Uso do Cache',
            align: 'left',
            style: {
                fontSize: "14px",
                color: '#FFFFFF'
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.1
            },
        },
        xaxis: {
            categories: ['0s', '10s', '20s', '30s', '40s', '50s', '60s', '70s', '80s', '90s', '100s', '110s'],
            labels: {
                style: {
                    fontSize: "12px",
                    colors: '#FFFFFF'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "%";
                },
                style: {
                    fontSize: "12px",
                    colors: '#FFFFFF'
                }
            }
        },
        colors: ['#93E4C4']
    };

    new ApexCharts(chartDisco, options).render();
}

function gerarGraficoRede() {
    // Velocidade de download
    let downloadOptions = {
        chart: {
            height: 270,
            type: "radialBar",
        },
        series: [67],
        colors: ["#93E4C4"],
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                track: {
                    background: '#333',
                    startAngle: -135,
                    endAngle: 135,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: "26px",
                        color: '#ffffff',
                        show: true,
                        formatter: function (val) {
                            return val + " Mbps";
                        }
                    }
                }
            }
        },
        fill: {
            gradient: {
                shade: "dark",
                type: "horizontal",
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "butt"
        }
    };

    // Velocidade de upload
    let uploadOptions = {
        chart: {
            height: 270,
            type: "radialBar",
        },
        series: [41],
        colors: ["#93E4C4"],
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                track: {
                    background: '#333',
                    startAngle: -135,
                    endAngle: 135,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: "26px",
                        color: '#ffffff',
                        show: true,
                        formatter: function (val) {
                            return val + " Mbps";
                        }
                    }
                }
            }
        },
        fill: {
            gradient: {
                shade: "dark",
                type: "horizontal",
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "butt"
        }
    };

    new ApexCharts(chartRede1, downloadOptions).render();
    new ApexCharts(chartRede2, uploadOptions).render();
}

// Gráfico de Inatividade Dashboard Gerentes

let options = {
    series: [33, 77],
    chart: {
        type: 'donut',
        width: 400
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val + "%"
        },
        style: {
            colors: ['#ffffff']
        },
        offsetX: -10
    },
    labels: [' Máquinas Inativas', ' Máquinas Ativas'],
    colors: ['#808080', '#5ac69c']
};

let chart = new ApexCharts(document.querySelector("#chartInatividade"), options);
chart.render();

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