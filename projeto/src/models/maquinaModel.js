const database = require("../database/config");

function cadastrarMaquina(hostname, ram, disco, clockProcessador, qtdNucleoProcessador, idEmpresa) {
    const instrucao = `
        INSERT INTO Maquina (hostnameMaquina, ramMaquina, discoMaquina, clockProcessadorMaquina, nucleosProcessadorMaquina, fkEmpresaMaquina) VALUES
            ("${hostname}", ${ram}, ${disco}, ${clockProcessador}, ${qtdNucleoProcessador}, ${idEmpresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarMaquina(idMaquina, hostname, ram, disco, clockProcessador, qtdNucleoProcessador, idEmpresa) {
    const instrucao = `
        UPDATE Maquina SET
            hostnameMaquina = ${hostname},
            ramMaquina =  ${ram},
            discoMaquina = ${disco},
            clockProcessadorMaquina = ${clockProcessador},
            nucleosProcessadorMaquina = ${qtdNucleoProcessador}
        WHERE idMaquina = ${idMaquina} AND idEmpresa = ${idEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarMaquina(idEmpresa) {
    const instrucao = `
        SELECT idMaquina, hostnameMaquina, ramMaquina, discoMaquina, clockProcessadorMaquina, nucleosProcessadorMaquina, fkEmpresaMaquina FROM Maquina
            WHERE fkEmpresaMaquina = ${idEmpresa}
                ORDER BY idMaquina;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarMaquina(idMaquina, idEmpresa) {
    const instrucao = `
        DELETE FROM Maquina WHERE idMaquina = ${idMaquina} AND fkEmpresaMaquina = ${idEmpresa}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarMaquina,
    editarMaquina,
    buscarMaquina,
    deletarMaquina
}