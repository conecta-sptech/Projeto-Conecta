const chartMemoriaRamUso = document.getElementById("chartMemoriaRamUso");
const chartMemoriaRamSo = document.getElementById("chartMemoriaRamSo");
const chartCpuUso = document.getElementById("chartCpuUso");
const chartCpuProcessos = document.getElementById("chartCpuProcessos");
const chartCpuNucleos = document.getElementById("chartCpuNucleos");
const chartCpuTemperatura = document.getElementById("chartCpuTemperatura");
const chartDiscoArmazenamento = document.getElementById("chartDiscoArmazenamento");
const chartDiscoSwap = document.getElementById("chartDiscoSwap");
const chartRede1 = document.getElementById("chartRede1");
const chartRede2 = document.getElementById("chartRede2");

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
                fontSize: '10px',
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

    new ApexCharts(chartMemoriaRamUso, options).render();
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
        colors: ['#93E4C4', '#000000'],
    };

    new ApexCharts(chartMemoriaRamSo, options).render();
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
                color: '#ffffff' // Título em branco
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
                    fontSize: '16px',
                    colors: Array(15).fill('#ffffff') // Todos os rótulos do eixo x em branco
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "%";
                },
                style: {
                    fontSize: '16px',
                    colors: ['#ffffff'] // Rótulos do eixo y em branco
                }
            }
        },
        colors: ['#93E4C4']
    };

    new ApexCharts(chartCpuUso, options).render();
}

function gerarGraficoProcessadorProcessos() {
    let processos = ['Processo 1', 'Processo 2', 'Processo 3', 'Processo 4', 'Processo 5'];
    let consumos = [80, 45, 35, 30, 25];

    let options = {
        chart: {
            type: 'bar'
        },
        series: [{
            name: 'Uso de CPU',
            data: consumos
        }],
        xaxis: {
            categories: processos
        },
        colors: ['#93E4C4'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + '%';
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        }
    };

    new ApexCharts(chartCpuProcessos, options).render();
}

function gerarGraficoProcessadorNucleos() {
    let nucleos = ['Núcleo 1', 'Núcleo 2', 'Núcleo 3', 'Núcleo 4'];
    let uso = [80, 85, 75, 90];

    let options = {
        chart: {
            type: 'bar',
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
                }
            }
        },
        title: {
            text: 'Uso do Núcleo do Processador %'
        }
    };

    new ApexCharts(chartCpuNucleos, options).render();
}

function gerarGraficoProcessadorTemperatura() {
    let options = {
        series: [{
            name: "Temperatura Do Processador",
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
            text: 'Temperatura Do Processador',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.1
            },
        },
        xaxis: {
            categories: ['0s', '10s', '20s', '30s', '40s', '50s', '60s', '70s', '80s', '90s', '100s', '110s'],
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "° C";
                }
            }
        },
        colors: ['#93E4C4']
    };

    new ApexCharts(chartCpuTemperatura, options).render();
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
                fontSize: '10px',
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

    new ApexCharts(chartDiscoArmazenamento, options).render();
}

function gerarGraficoDiscoMemoriaSwap() {
    let tempo = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    let memoriaSwap = [100, 150, 120, 180, 200, 220, 250, 280, 300, 320];

    let ctx = chartDiscoSwap.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: tempo,
            datasets: [{
                label: 'Memória Swap (MB)',
                data: memoriaSwap,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                stepped: true
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tempo (s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Memória Swap (MB)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Memória Swap ao longo do Tempo'
                }
            }
        }
    });
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