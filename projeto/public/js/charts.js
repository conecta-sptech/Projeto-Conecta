const chartMemoriaRam = document.getElementById("chartMemoriaRam");
const chartMemoriaTaxaCt = document.getElementById("chartMemoriaTaxaCt");
const chartMemoriaTaxa1 = document.getElementById("chartMemoriaTaxa1");
const chartMemoriaTaxa2 = document.getElementById("chartMemoriaTaxa2");
const chartCpu = document.getElementById("chartCpu");
const chartDisco = document.getElementById("chartDisco");
const chartDiscoSwap = document.getElementById("chartDiscoSwap");
const chartRede1 = document.getElementById("chartRede1");
const chartRede2 = document.getElementById("chartRede2");

const btnExibirListaRam = document.getElementById("btnExibirListaRam");
const btnExibirListaCpu = document.getElementById("btnExibirListaCpu");
const btnExibirListaDisco = document.getElementById("btnExibirListaDisco");
const chartListRam = document.getElementById("chartListRam");
const chartListCpu = document.getElementById("chartListCpu");
const chartListDisco = document.getElementById("chartListDisco");

function gerarGraficoMemoriaRamUso() {
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

function gerarGraficoMemoriaRamSo() {
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

function gerarGraficoMemoriaRamTaxa() {
    // Velocidade de download
    let downloadOptions = {
        chart: {
            height: 220,
            width: 180,
            type: "radialBar",
        },
        series: [54],
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
                        fontSize: "22px",
                        color: '#ffffff',
                        show: true,
                        formatter: function (val) {
                            return val + " MB/s";
                        },
                        offsetY: 4
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
            height: 220,
            width: 180,
            type: "radialBar",
        },
        series: [39],
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
                        fontSize: "22px",
                        color: '#ffffff',
                        show: true,
                        formatter: function (val) {
                            return val + " MB/s";
                        },
                        offsetY: 4
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

    new ApexCharts(chartMemoriaTaxa1, downloadOptions).render();
    new ApexCharts(chartMemoriaTaxa2, uploadOptions).render();
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

function gerarGraficoProcessadorProcessos() {
    let processos = ['Processo 1', 'Processo 2', 'Processo 3', 'Processo 4', 'Processo 5'];
    let consumos = [80, 45, 35, 30, 25];

    let options = {
        chart: {
            type: 'bar',
            height: 360,
            width: '100%'
        },
        series: [{
            name: 'Uso de CPU',
            data: consumos
        }],
        xaxis: {
            categories: processos,
            labels: {
                style: {
                    fontSize: "18px",
                    colors: '#FFFFFF'
                }
            },
            axisBorder: {
                color: '#FFFFFF'
            },
            axisTicks: {
                color: '#FFFFFF'
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "18px",
                    colors: '#FFFFFF',
                },
                formatter: function (value) {
                    return value + "%";
                }
            },
            axisBorder: {
                color: '#FFFFFF'
            },
            axisTicks: {
                color: '#FFFFFF'
            }
        },
        colors: ['#93E4C4'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            }
        },
        title: {
            text: 'Processos que mais consomem a CPU',
            align: 'left',
            style: {
                fontSize: "20px",
                color: '#FFFFFF'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + '%';
            },
            offsetY: -20,
            style: {
                fontSize: '18px',
                colors: ["#FFFFFF"]
            }
        }
    };

    new ApexCharts(chartCpu, options).render();
}

function gerarGraficoProcessadorNucleos() {
    let nucleos = ['N1', 'N2', 'N3', 'N4'];
    let uso = [80, 85, 75, 90];

    let options = {
        chart: {
            type: 'bar',
            height: 360,
            width: '100%',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        colors: ['#93E4C4'],
        series: [{
            data: uso.map((valor, index) => ({ y: valor, x: nucleos[index] }))
        }],
        xaxis: {
            categories: nucleos,
            labels: {
                formatter: function (val) {
                    return val;
                },
                style: {
                    fontSize: '18px',
                    colors: '#FFFFFF'
                },
                axisBorder: {
                    color: '#FFFFFF'
                },
                axisTicks: {
                    color: '#FFFFFF'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '18px',
                    colors: '#FFFFFF'
                }
            },
            axisBorder: {
                color: '#FFFFFF'
            },
            axisTicks: {
                color: '#FFFFFF'
            }
        },
        title: {
            text: 'Uso dos Núcleos da CPU',
            style: {
                fontSize: '20px',
                color: '#FFFFFF'
            }
        }
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

let chartSwap = null;
function gerarGraficoDiscoMemoriaSwap() {
    let tempo = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    let memoriaSwap = [100, 150, 120, 180, 200, 220, 250, 280, 300, 320];

    let ctx = chartDiscoSwap.getContext('2d');
    chartSwap = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tempo,
            datasets: [{
                label: 'Memória Swap (MB)',
                data: memoriaSwap,
                borderColor: '#5ac69c',
                tension: 0.1,
                stepped: true
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tempo (s)',
                        color: '#FFFFFF'
                    },
                    ticks: {
                        color: '#FFFFFF'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Memória Swap (MB)',
                        color: '#FFFFFF'
                    },
                    ticks: {
                        color: '#FFFFFF'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Memória Swap ao longo do tempo',
                    color: '#FFFFFF'
                },
                legend: {
                    labels: {
                        color: '#FFFFFF'
                    }
                }
            }
        }
    });
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
            height: 280,
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
                        fontSize: "30px",
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
            height: 280,
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
                        fontSize: "30px",
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

        chartMemoriaTaxaCt.style.display = "none";
        chartMemoriaRam.style.display = "block";
        chartMemoriaRam.innerHTML = "";
        gerarGraficoMemoriaRamUso();
    }

    if (id == "2") {
        btnExibirListaRam.classList.remove("active");
        chartListRam.classList.remove("active");

        chartMemoriaTaxaCt.style.display = "none";
        chartMemoriaRam.style.display = "block";
        chartMemoriaRam.innerHTML = "";
        gerarGraficoMemoriaRamSo();
    }

    if (id == "3") {
        btnExibirListaRam.classList.remove("active");
        chartListRam.classList.remove("active");

        chartMemoriaRam.style.display = "none";
        chartMemoriaTaxaCt.style.display = "flex";
        gerarGraficoMemoriaRamTaxa();
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
        gerarGraficoProcessadorNucleos();
    }

    if (id == "6") {
        btnExibirListaCpu.classList.remove("active");
        chartListCpu.classList.remove("active");

        chartCpu.innerHTML = "";
        gerarGraficoProcessadorProcessos();
    }

    if (id == "7") {
        btnExibirListaCpu.classList.remove("active");
        chartListCpu.classList.remove("active");

        chartCpu.innerHTML = "";
        gerarGraficoProcessadorTemperatura();
    }

    if (id == "8") {
        btnExibirListaDisco.classList.remove("active");
        chartListDisco.classList.remove("active");

        chartDiscoSwap.style.display = "none";
        chartDisco.style.display = "block";
        chartDisco.innerHTML = "";
        gerarGraficoDiscoArmazenamento();
    }

    if (id == "9") {
        btnExibirListaDisco.classList.remove("active");
        chartListDisco.classList.remove("active");

        if (chartSwap != null) chartSwap.destroy();
        chartDisco.style.display = "none";
        chartDiscoSwap.style.display = "block";
        gerarGraficoDiscoMemoriaSwap();
    }

    if (id == "10") {
        btnExibirListaDisco.classList.remove("active");
        chartListDisco.classList.remove("active");

        chartDiscoSwap.style.display = "none";
        chartDisco.style.display = "block";
        chartDisco.innerHTML = "";
        gerarGraficoDiscoCache();
    }
}