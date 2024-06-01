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

let leiturasAtuais = null;
async function plotarDadosGrafico(idMaquina, primeiraLeitura){
    leiturasAtuais = await obterDadosGrafico(idMaquina, primeiraLeitura)
    console.log(leiturasAtuais);
    console.log(leiturasAtuais[0][0].memoriaDisponivel);
    gerarGraficoMemoriaRamUso(4, Number(leiturasAtuais[0][0].memoriaDisponivel));
}