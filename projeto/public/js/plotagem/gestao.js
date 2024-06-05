

function plotarTabelaInatividade() {
    fetch(`/gestao/buscar-maquinas-inativas/${sessionStorage.getItem("ID_EMPRESA")}`)
    .then(res => res.json())
    .then(data => {

        tbodyTabelaInatividade.innerHTML = '';

        data.forEach(maquina => {

            let componente = maquina.ultimoComponenteAlerta ? maquina.ultimoComponenteAlerta : "Não possui alertas";

            let dataUltimaLeitura;
            if (maquina.ultimaLeitura == null) {
                dataUltimaLeitura = new Date(maquina.ociosidadeMaquina);
            } else {
                dataUltimaLeitura = new Date(maquina.ultimaLeitura);
            }
            // Log the dates
                        console.log('Data Ultima Leitura:', dataUltimaLeitura);

                        const agora = new Date();
                        const diferencaTempoMs = agora - dataUltimaLeitura;

                        // Log the difference in time
                        console.log('Difference in milliseconds:', diferencaTempoMs);

                        const horasOcioso = Math.floor(diferencaTempoMs / (1000 * 60 * 60)); // Horas
                        const minutosOcioso = Math.floor((diferencaTempoMs / (1000 * 60)) % 60); // Minutos

                        // Log the calculated idle time
                        console.log('Idle time:', horasOcioso + 'h ' + minutosOcioso + 'min');

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


async function obterDadosInatividade(){
    const response = await fetch(`/gestao/buscar-maquinas-inativas-ativas/${sessionStorage.getItem("ID_EMPRESA")}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar dados de inatividade');
    }
    return response.json();
}

async function plotarGraficoInatividade(){
    try {
        const data = await obterDadosInatividade();
        const { maquinasAtivas, maquinasInativas, totalMaquinas } = data;
        let chart = gerarGraficoInatividade();
        chart.updateSeries([maquinasInativas, maquinasAtivas]);
        h1InventarioMaquinas.innerHTML = `Máquinas inativas: ${maquinasInativas}/${totalMaquinas}`;
    } catch (error) {
        console.error('Erro ao plotar gráfico de inatividade:', error);
    }
}

