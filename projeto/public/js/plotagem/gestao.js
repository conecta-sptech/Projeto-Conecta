let chartInatividade;

function gerarGraficoInatividade() {
    let options = {
        series: [],
        chart: {
            type: 'donut',
            width: 400
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(1) + "%";
            },
            style: {
                colors: ['#ffffff']
            },
            offsetX: -10
        },
        labels: ['Máquinas Inativas', 'Máquinas Ativas'],
        colors: ['#808080', '#5ac69c']
    };

    const chart = new ApexCharts(document.querySelector("#chartInatividade"), options);
    chart.render();
    return chart;
}


function atualizarGraficoInatividade(maquinasInativas, maquinasAtivas) {
    chartInatividade.updateSeries([maquinasInativas, maquinasAtivas]);
}


function plotarTabelaInatividade() {
    fetch(`/gestao/buscar-maquinas-inativas/${sessionStorage.getItem("ID_EMPRESA")}`)
        .then(res => res.json())
        .then(data => {
            const tbodyTabelaInatividade = document.querySelector('#tbodyTabelaInatividade');

            tbodyTabelaInatividade.innerHTML = '';

            data.forEach(maquina => {

                let componente = maquina.ultimoComponenteAlerta ? maquina.ultimoComponenteAlerta : "Não possui alertas";

                let dataUltimaLeitura = maquina.ultimaLeitura ? new Date(maquina.ultimaLeitura) : new Date(maquina.ociosidadeMaquina);

                const agora = new Date();
                const diferencaTempoMs = agora - dataUltimaLeitura;

                const horasOcioso = Math.floor(diferencaTempoMs / (1000 * 60 * 60));
                const minutosOcioso = Math.floor((diferencaTempoMs / (1000 * 60)) % 60);

                const novaLinha = document.createElement('tr');
                novaLinha.innerHTML = `
                    <th>${maquina.hostnameMaquina}</th>
                    <th>${horasOcioso}h ${minutosOcioso}min</th>
                    <th>${componente}</th>
                `;
                tbodyTabelaInatividade.appendChild(novaLinha);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar máquinas inativas:', error);
        });
}

async function obterDadosInatividade() {
    const response = await fetch(`/gestao/buscar-maquinas-inativas-ativas/${sessionStorage.getItem("ID_EMPRESA")}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar dados de inatividade');
    }
    return response.json();
}

async function plotarGraficoInatividade() {
    try {
        const data = await obterDadosInatividade();
        const { maquinasAtivas, maquinasInativas, totalMaquinas } = data;

        if (!chartInatividade) {
            chartInatividade = gerarGraficoInatividade();
        }

        atualizarGraficoInatividade(maquinasInativas, maquinasAtivas);
        h1InventarioMaquinas.innerHTML = `Máquinas inativas: ${maquinasInativas}/${totalMaquinas}`;

    } catch (error) {
        console.error('Erro ao plotar gráfico de inatividade:', error);
    }
}


async function iniciar() {
    try {
        plotarTabelaInatividade();
        setInterval(plotarTabelaInatividade, 60000);
        plotarGraficoInatividade();
    } catch (error) {
        console.error('Erro ao iniciar:', error);
    }
}

iniciar();