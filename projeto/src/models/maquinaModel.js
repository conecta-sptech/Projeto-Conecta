const database = require("../database/config");

function cadastrarMaquina(hostname, ram, disco, clockProcessador, qtdNucleoProcessador, idEmpresa) {
    const instrucao = `
        INSERT INTO Maquina (hostnameMaquina, ramMaquina, discoMaquina, clockProcessadorMaquina, nucleosProcessadorMaquina, fkEmpresaMaquina) VALUES
            ("${hostname}", ${ram}, ${disco}, ${clockProcessador}, ${qtdNucleoProcessador}, ${idEmpresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarMaquina(idEmpresa) {
    const instrucao = `
        SELECT hostnameMaquina, ramMaquina, discoMaquina, clockProcessadorMaquina, nucleosProcessadorMaquina, fkEmpresaMaquina FROM Maquina
            WHERE fkEmpresaMaquina = ${idEmpresa}
                ORDER BY idMaquina;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    cadastrarMaquina,
    buscarMaquina
}