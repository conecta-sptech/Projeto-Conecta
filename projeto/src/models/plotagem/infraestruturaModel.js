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

module.exports = {
    buscarIds,
}