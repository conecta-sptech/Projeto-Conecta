const database = require("../../database/config");

function buscarIds(cor, idEmpresa) {
    const instrucao = `
        SELECT DISTINCT fkMaquinaAlerta FROM Alerta
            WHERE corAlerta = '${cor}' AND fkEmpresaAlerta = ${idEmpresa}
            AND dataHoraAlerta = (SELECT MAX(dataHoraAlerta) FROM Alerta);
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterMemoria(grafico, idMaquina) {
    let instrucao = ``;
    switch(Number(grafico)){
        case 1:
            instrucao = `
                SELECT TOP 1 memoriaDisponivel FROM leituraMemoria
                    WHERE fkMaquinaMemoria = ${idMaquina}
                        ORDER BY idLeituraMemoria DESC;
            `;
        break;

        case 2:
            instrucao = `
                SELECT TOP 1 memoriaVirtual, memoriaDisponivel FROM leituraMemoria
                    WHERE fkMaquinaMemoria = ${idMaquina}
                        ORDER BY idLeituraMemoria DESC;
            `;

        break;

        case 3:
            instrucao = `
                SELECT TOP 1 tempoLigado FROM leituraMemoria
                    WHERE fkMaquinaMemoria = ${idMaquina}
                        ORDER BY idLeituraMemoria DESC;
            `;
        break;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterCpu(grafico, idMaquina, primeiraLeitura) {
    let instrucao = ``;
    let querySize = primeiraLeitura == `true` ? 15 : 1;

    switch(Number(grafico)){
        case 1:
            instrucao = `
                SELECT TOP ${querySize} cpuUso, dataHoraLeitura  FROM leituraCpu
	                WHERE fkMaquinaCpu = ${idMaquina}
		                ORDER BY idLeituraCpu DESC;
            `;
        break;

        case 2:
            instrucao = `
                SELECT TOP ${querySize} cpuCarga, dataHoraLeitura  FROM leituraCpu
                    WHERE fkMaquinaCpu = ${idMaquina}
                        ORDER BY idLeituraCpu DESC;
            `;
        break;

        case 3:
            instrucao = `
                SELECT TOP ${querySize} cpuTemperatura, dataHoraLeitura  FROM leituraCpu
                    WHERE fkMaquinaCpu = ${idMaquina}
                        ORDER BY idLeituraCpu DESC;
            `;
        break;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterDisco(grafico, idMaquina, primeiraLeitura) {
    let instrucao = ``;
    let querySize = primeiraLeitura == `true` ? 15 : 1;

    switch(Number(grafico)){
        case 1:
            instrucao = `
                SELECT TOP 1discoDisponivel FROM leituraDisco
                    WHERE fkMaquinaDisco = ${idMaquina}
                        ORDER BY idLeituraDisco DESC;
            `;
        break;

        case 2:
            instrucao = `
                SELECT TOP ${querySize} discoTaxaLeitura, dataHoraLeitura  FROM leituraDisco
                    WHERE fkMaquinaDisco = ${idMaquina}
                        ORDER BY idLeituraDisco DESC;
            `;
        break;

        case 3:
            instrucao = `
                SELECT TOP ${querySize} discoTaxaEscrita, dataHoraLeitura  FROM leituraDisco
                    WHERE fkMaquinaDisco = ${idMaquina}
                        ORDER BY idLeituraDisco DESC;
            `;
        break;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterRede(idMaquina) {
    const instrucao = `
        SELECT TOP 1 redeDownload, redeUpload  FROM leituraRede
            WHERE fkMaquinaRede = ${idMaquina}
                ORDER BY idLeituraRede DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarIds,
    obterMemoria,
    obterCpu,
    obterDisco,
    obterRede
}