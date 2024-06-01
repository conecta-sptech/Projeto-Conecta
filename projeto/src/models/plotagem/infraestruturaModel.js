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
    const instrucao = `
        SELECT memoriaDisponivel FROM leituraMemoria
            WHERE fkMaquinaMemoria = ${idMaquina}
                ORDER BY idLeituraMemoria DESC LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterCpu(grafico, idMaquina, primeiraLeitura) {
    const instrucao = `
        SELECT cpuUso, dataHoraLeitura  FROM leituraCpu
	        WHERE fkMaquinaCpu = ${idMaquina}
		        ORDER BY idLeituraCpu DESC LIMIT 15;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterDisco(grafico, idMaquina, primeiraLeitura) {
    const instrucao = `
        SELECT discoDisponivel FROM leituraDisco
            WHERE fkMaquinaDisco = ${idMaquina}
                ORDER BY idLeituraDisco DESC LIMIT 1
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterRede(idMaquina) {
    const instrucao = `
        SELECT redeDownload, redeUpload  FROM leituraRede
            WHERE fkMaquinaRede = ${idMaquina}
                ORDER BY idLeituraRede DESC LIMIT 1;
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