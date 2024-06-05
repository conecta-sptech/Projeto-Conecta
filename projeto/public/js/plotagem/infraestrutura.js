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

let listaEstado = [];             //[[amarelo], [vermelho]]
function listarIds(cor) {
    return fetch(`/infraestrutura/estado/${cor}/${sessionStorage.getItem("ID_EMPRESA")}`)
        .then(res => res.json())
        .then(data => data.map(item => item.fkMaquinaAlerta));
}

function obterDadosGrafico(idMaquina, primeiraLeitura) {
    return fetch(`/infraestrutura/dados/${idMaquina}/${listaGraficos}/${primeiraLeitura}`)
        .then(res => res.json());
}


let listaLeitura = null;
let indiceMaquina = null;

let categoriesCpu = [];
let dataCpu = [];

let categoriesDisco = [];
let dataDisco = [];
async function plotarDadosGrafico(idMaquina, primeiraLeitura, graficoSelecionado){
    listaLeitura = await obterDadosGrafico(idMaquina, primeiraLeitura);
    console.log(listaLeitura);
    console.log(listaLeitura[0][0].memoriaDisponivel);

    // ----------------------------------------------------------------pega o indice da maquina
    for(let i = 0; i < listaMaquinas.length; i++){
        if(listaMaquinas[i].idMaquina == idMaquina){
            indiceMaquina = i;
            break;
        }
    }

    // ----------------------------------------------------------------seta a coluna x e dados dos gráficos de cpu
    let chaveLeituraCpu = Object.keys(listaLeitura[1][0])[0];
    if (listaLeitura[1].length == 1 && ((listaLeitura[1][0].dataHoraLeitura).slice(11, 16) != categoriesCpu[categoriesCpu.length - 1])){
        categoriesCpu.shift();
        categoriesCpu.push((listaLeitura[1][0].dataHoraLeitura).slice(11, 16));

        dataCpu.shift();
        dataCpu.push(listaLeitura[1][0][chaveLeituraCpu]);
    
    } else if (listaLeitura[1].length > 1) {
        categoriesCpu = [];
        dataCpu = [];

        for(let i = 0; i < listaLeitura[1].length; i++){
            categoriesCpu.unshift((listaLeitura[1][i].dataHoraLeitura).slice(11, 16));
            dataCpu.unshift(listaLeitura[1][i][chaveLeituraCpu])
        }

    }


        // ----------------------------------------------------------------seta a coluna x e dados dos gráficos de disco
        let chaveLeituraDisco = Object.keys(listaLeitura[2][0])[0];
        if (listaLeitura[2].length == 1 && listaGraficos[2] != 1 && ((listaLeitura[2][0].dataHoraLeitura).slice(11, 16) != categoriesDisco[categoriesDisco.length -1])){
            categoriesDisco.shift();
            categoriesDisco.push((listaLeitura[2][0].dataHoraLeitura).slice(11, 16));
    
            dataDisco.shift();
            dataDisco.push(listaLeitura[2][0][chaveLeituraDisco]);
        
        } else if (listaLeitura[2].length > 1 && listaGraficos[2] != 1) {
            categoriesDisco = [];
            dataDisco = [];
    
            for(let i = 0; i < listaLeitura[2].length; i++){
                categoriesDisco.unshift((listaLeitura[2][i].dataHoraLeitura).slice(11, 16));
                dataDisco.unshift(listaLeitura[2][i][chaveLeituraDisco])
            }
    
        }


    // ------------------------------------------chama plotagem/atualizacao de grafico

    if (graficoSelecionado == 0){
        atualizarGraficoRam(primeiraLeitura);

    } else if (graficoSelecionado == 1){
        atualizarGraficoCpu(primeiraLeitura);

    } else if (graficoSelecionado == 2){
        atualizarGraficoDisco(primeiraLeitura);
    
    } else {
        atualizarGraficoRam(primeiraLeitura);
        atualizarGraficoCpu(primeiraLeitura);
        atualizarGraficoDisco(primeiraLeitura);
        atualizarGraficoRede(primeiraLeitura);
    }
}


function atualizarGraficoRam(plotagem){
    switch(listaGraficos[0]){
        case 1:
            let totalMemory1 = listaMaquinas[indiceMaquina].ramMaquina;
            let freeMemory1 = listaLeitura[0][0].memoriaDisponivel;
            let freeMemoryPercent1 = Number(((freeMemory1 * 100) / totalMemory1).toFixed(2));
            let usedMemoryPercent1 = Number((100 - freeMemoryPercent1).toFixed(2));

            if (plotagem) {
            gerarGraficoMemoriaRamUso(usedMemoryPercent1, freeMemoryPercent1);
            
            } else {
                graficoRam1.updateSeries([usedMemoryPercent1, freeMemoryPercent1]);
            }
        break;

        case 2:
            let fisicalMemory2 = listaMaquinas[indiceMaquina].ramMaquina;
            let virtualMemory2 = listaLeitura[0][0].memoriaVirtual;
            let totalMemory2 = fisicalMemory2 + virtualMemory2;
            let fisicalMemoryPercent2 = Number(((fisicalMemory2 * 100) / totalMemory2).toFixed(2));
            let virtualMemoryPercent2 = Number((100 - fisicalMemoryPercent2).toFixed(2));
            
            if (plotagem) {
                gerarGraficoMemoriaRamVirtual(fisicalMemoryPercent2, virtualMemoryPercent2);

            } else {
                graficoRam2.updateSeries([fisicalMemoryPercent2, virtualMemoryPercent2]);
            }

        break;

        case 3:
            gerarGraficoMemoriaRamTempoLigado(listaLeitura[0][0].tempoLigado);
        break;
    }
}

function atualizarGraficoCpu(plotagem){
    switch(listaGraficos[1]){
        case 1:
            if (plotagem) {
                gerarGraficoProcessadorUso(dataCpu, categoriesCpu);

            } else {
                graficoCpu1.updateSeries([{
                    data: dataCpu
                }]);
                graficoCpu1.updateOptions({
                    xaxis: {categories: categoriesCpu}
                });
            }
        break;

        case 2:
            if (plotagem) {
                gerarGraficoProcessadorCarga(dataCpu, categoriesCpu);

            } else {
                graficoCpu2.updateSeries([{
                    data: dataCpu
                }]);
                graficoCpu2.updateOptions({
                    xaxis: {categories: categoriesCpu}
                });
            }
        break;

        case 3:
            if (plotagem) {
                gerarGraficoProcessadorTemperatura(dataCpu, categoriesCpu);

            } else {
                graficoCpu3.updateSeries([{
                    data: dataCpu
                }]);
                graficoCpu3.updateOptions({
                    xaxis: {categories: categoriesCpu}
                });
            }
        break;
    }
}

function atualizarGraficoDisco(plotagem){
    switch(listaGraficos[2]){
        case 1:
            let totalStorage1 = listaMaquinas[indiceMaquina].discoMaquina
            let freeStorage1 = listaLeitura[2][0].discoDisponivel
            let freeStoragePercent1 = Number(((freeStorage1 * 100) / totalStorage1).toFixed(2)); // Uso de memória RAM em porcentagem
            let usedStoragePercent1 = Number((100 - freeStoragePercent1).toFixed(2));

            if (plotagem) {
                gerarGraficoDiscoArmazenamento(usedStoragePercent1, freeStoragePercent1);
            
            } else {
                graficoDisco1.updateSeries([usedStoragePercent1, freeStoragePercent1]);

            }
        break;

        case 2:
            if (plotagem) {
                gerarGraficoDiscoDownload(dataDisco, categoriesDisco);
            
            } else {
                graficoDisco2.updateSeries([{
                    data: dataDisco
                }]);
                graficoDisco2.updateOptions({
                    xaxis: {categories: categoriesDisco}
                });
            }
        break;

        case 3:
            if (plotagem) {
                gerarGraficoDiscoUpload(dataDisco, categoriesDisco);
            
            } else {
                graficoDisco3.updateSeries([{
                    data: dataDisco
                }]);
                graficoDisco3.updateOptions({
                    xaxis: {categories: categoriesDisco}
                });
            }
        break;
    }
}

function atualizarGraficoRede(plotagem){
    if (plotagem){
        gerarGraficoRede([listaLeitura[3][0].redeDownload], [listaLeitura[3][0].redeUpload]);
    
    } else {
        graficoRede1.updateSeries([listaLeitura[3][0].redeDownload]);
        graficoRede2.updateSeries([listaLeitura[3][0].redeUpload]);
    }
}

// -------------------------------------------------------------memória

let graficoRam1 = null;
let graficoRam2 = null;
function gerarGraficoMemoriaRamUso(usedMemoryPercent, freeMemoryPercent) {
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

    graficoRam1 = new ApexCharts(chartMemoriaRam, options);
    graficoRam1.render();
}

function gerarGraficoMemoriaRamVirtual(fisicalMemoryPercent, virtualMemoryPercent) {
    let options = {
        chart: {
            type: 'donut',
        },
        series: [fisicalMemoryPercent, virtualMemoryPercent],
        labels: ['Física', 'Virtual'],
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

    graficoRam2 = new ApexCharts(chartMemoriaRam, options);
    graficoRam2.render();
}

function gerarGraficoMemoriaRamTempoLigado(tempoLigadoHoras) {
    let tempoLigadoDias = (tempoLigadoHoras / 24).toFixed(1);


    chartMemoriaRam.innerHTML = `
    <h4>Tempo de Atividade</h4>
    <div class="tempo-atividade-ct">
        <img src="../assets/svg/clock.svg">
        <div>
            <p>${tempoLigadoHoras} hora(s)</p>
            <p>${tempoLigadoDias} dias(s)</p>
        </div>
    </div>
    `;
}


// -------------------------------------------------------------cpu

let graficoCpu1 = null;
let graficoCpu2 = null;
let graficoCpu3 = null;
function gerarGraficoProcessadorUso(dataCpu, categoriesCpu) {
    let options = {
        series: [{
            name: "Uso Processador",
            data: dataCpu
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
            categories: categoriesCpu,
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

    graficoCpu1 = new ApexCharts(chartCpu, options);
    graficoCpu1.render();
}

function gerarGraficoProcessadorCarga(dataCpu, categoriesCpu) {
    let options = {
        series: [{
            name: "Carga da CPU",
            data: dataCpu
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
            categories: categoriesCpu,
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

    graficoCpu2 = new ApexCharts(chartCpu, options);
    graficoCpu2.render();
}

function gerarGraficoProcessadorTemperatura(dataCpu, categoriesCpu) {
    let options = {
        series: [{
            name: "Temperatura Da CPU",
            data: dataCpu
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
            categories: categoriesCpu,
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
                    return value + "°C";
                },
                style: {
                    fontSize: "18px",
                    colors: '#FFFFFF'
                }
            }
        },
        colors: ['#93E4C4']
    };

    graficoCpu3 = new ApexCharts(chartCpu, options);
    graficoCpu3.render();
}

// -------------------------------------------------------------disco

let graficoDisco1 = null;
let graficoDisco2 = null;
let graficoDisco3 = null;
function gerarGraficoDiscoArmazenamento(usedStoragePercent, freeStoragePercent) {
    let options = {
        chart: {
            type: 'donut',
        },
        series: [usedStoragePercent, freeStoragePercent],
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

    graficoDisco1 = new ApexCharts(chartDisco, options);
    graficoDisco1.render();
}

function gerarGraficoDiscoDownload(dataDisco, categoriesDisco) {
    let options = {
        series: [{
            name: "Taxa Download",
            data: dataDisco
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
            text: 'Taxa Download',
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
            categories: categoriesDisco,
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
                    return value + " Kb/s";
                },
                style: {
                    fontSize: "12px",
                    colors: '#FFFFFF'
                }
            }
        },
        colors: ['#93E4C4']
    };

    graficoDisco2 = new ApexCharts(chartDisco, options);
    graficoDisco2.render();
}

function gerarGraficoDiscoUpload(dataDisco, categoriesDisco) {
    let options = {
        series: [{
            name: "Taxa Upload",
            data: dataDisco
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
            text: 'Taxa Upload',
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
            categories: categoriesDisco,
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
                    return value + " Kb/s";
                },
                style: {
                    fontSize: "12px",
                    colors: '#FFFFFF'
                }
            }
        },
        colors: ['#93E4C4']
    };

    graficoDisco3 = new ApexCharts(chartDisco, options);
    graficoDisco3.render();
}

// -------------------------------------------------------------rede

let graficoRede1 = null;
let graficoRede2 = null;
function gerarGraficoRede(downlaodTax, uploadTax) {
    let downloadOptions = {
        chart: {
            height: 270,
            type: "radialBar",
        },
        series: downlaodTax,
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
        series: uploadTax,
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

    graficoRede1 = new ApexCharts(chartRede1, downloadOptions);
    graficoRede1.render();

    graficoRede2 = new ApexCharts(chartRede2, downloadOptions);
    graficoRede2.render();
}


function exibirChartEscolhido(e) {
    const id = Number(e.getAttribute("data-id"));
    let graficoSelecionado = -1;

    if (id <= 3) {
        listaGraficos[0] = id;
        graficoSelecionado = 0;

        btnExibirListaRam.classList.remove("active");
        chartListRam.classList.remove("active");
        chartMemoriaRam.innerHTML = "";

    } else if (id <= 6) {
        listaGraficos[1] = id - 3;
        graficoSelecionado = 1;

        btnExibirListaCpu.classList.remove("active");
        chartListCpu.classList.remove("active");
        chartCpu.innerHTML = "";
    
    } else {
        listaGraficos[2] = id - 6;
        graficoSelecionado = 2;

        btnExibirListaDisco.classList.remove("active");
        chartListDisco.classList.remove("active");
        chartDisco.innerHTML = "";
    }
    plotarDadosGrafico(idMaquinaSelecionada, true, graficoSelecionado);
}