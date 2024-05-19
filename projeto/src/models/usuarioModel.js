const database = require("../database/config");

function cadastrarEmpresa(nomeEmpresa, cnpjEmpresa) {
    const instrucao = `
        INSERT INTO Empresa (nomeEmpresa, cnpjEmpresa) VALUES
            ("${nomeEmpresa}", "${cnpjEmpresa}");
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuarioEmpresa(emailEmpresa, senhaEmpresa, idEmpresa) {
    const instrucao = `
            INSERT INTO Usuario (idUsuario, nomeUsuario, emailUsuario, senhaUsuario, funcaoUsuario, fkEmpresaUsuario) VALUES
                (1, "Administrador", "${emailEmpresa}", "${senhaEmpresa}", "Administrador", ${idEmpresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticar(email, senha) {
    const instrucao = `
        SELECT idUsuario, nomeUsuario, funcaoUsuario, idEmpresa, nomeEmpresa 
	    FROM Usuario u
		    JOIN Empresa e
			    ON u.fkEmpresaUsuario = e.idEmpresa
        WHERE u.emailUsuario = "${email}" AND u.senhaUsuario = "${senha}";
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarGerente(nomeGerente, emailGerente, senhaGerente, idEmpresa) {
    const instrucao = `
        INSERT INTO Usuario (nomeUsuario, emailUsuario, senhaUsuario, funcaoUsuario, fkEmpresaUsuario) VALUES
            ("${nomeGerente}", "${emailGerente}", "${senhaGerente}", "Gerente", ${idEmpresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFuncionario(nomeGerente, emailGerente, senhaGerente, idEmpresa) {
    const instrucao = `
        INSERT INTO Usuario (nomeUsuario, emailUsuario, senhaUsuario, funcaoUsuario, fkEmpresaUsuario) VALUES
            ("${nomeGerente}", "${emailGerente}", "${senhaGerente}", "Funcionario", ${idEmpresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarSenhaUsuario(idUsuario, idEmpresa, senhaUsuarioAntiga, senhaUsuarioNova) {
    const instrucao = `
        UPDATE Usuario SET senhaUsuario = "${senhaUsuarioNova}"
            WHERE idUsuario = ${idUsuario} AND senhaUsuario = "${senhaUsuarioAntiga}" AND fkEmpresaUsuario = ${idEmpresa}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarParaAdministrador(idEmpresa) {
    const instrucao = `
        SELECT * FROM Usuario
            WHERE fkEmpresaUsuario = ${idEmpresa} AND funcaoUsuario = "Gerente";
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarParaGerente(idEmpresa) {
    const instrucao = `
        SELECT * FROM Usuario
            WHERE fkEmpresaUsuario = ${idEmpresa} AND funcaoUsuario = "Funcionario";
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEmpresa,
    cadastrarUsuarioEmpresa,
    autenticar,
    cadastrarGerente,
    cadastrarFuncionario,
    alterarSenhaUsuario,
    buscarParaAdministrador,
    buscarParaGerente
}

