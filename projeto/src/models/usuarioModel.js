const database = require("../database/config");

function cadastrarEmpresa(nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa) {
    const instrucao = `
        INSERT INTO
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEmpresa
}

