const database = require("../database/config");

function cadastrarEmpresa(nomeEmpresa, cnpjEmpresa) {
    const instrucao = `
        INSERT INTO Empresa (nomeEmpresa, cnpjEmpresa) VALUES
            ('${nomeEmpresa}', '${cnpjEmpresa}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarEmpresa(cep, numero, telefone, idEmpresa) {
    const instrucao = `UPDATE empresa SET cepEmpresa = '${cep}', numeroEmpresa = '${numero}', telefoneEmpresa = '${telefone}' WHERE idEmpresa = '${idEmpresa}';`;
    return database.executar(instrucao);
}

function cadastrarUsuarioEmpresa(cnpjEmpresa, emailEmpresa, senhaEmpresa) {
    const instrucao = `
        INSERT INTO Usuario (nomeUsuario, emailUsuario, senhaUsuario, funcaoUsuario, fkEmpresaUsuario)
            VALUES ('Administrador', '${emailEmpresa}', '${senhaEmpresa}', 'Administrador',
            (SELECT idEmpresa FROM Empresa WHERE cnpjEmpresa = '${cnpjEmpresa}')
        );
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticar(email, senha) {
    const instrucao = `
        SELECT u.idUsuario, u.nomeUsuario, u.emailUsuario, u.funcaoUsuario, e.idEmpresa, e.nomeEmpresa, e.cnpjEmpresa, e.cepEmpresa, e.numeroEmpresa, e.telefoneEmpresa
	    FROM Usuario u
		    JOIN Empresa e
			    ON u.fkEmpresaUsuario = e.idEmpresa
        WHERE u.emailUsuario = '${email}' AND u.senhaUsuario = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarGerente(nomeGerente, emailGerente, senhaGerente, idEmpresa) {
    const instrucao = `
        INSERT INTO Usuario (nomeUsuario, emailUsuario, senhaUsuario, funcaoUsuario, fkEmpresaUsuario) VALUES
            ('${nomeGerente}', '${emailGerente}', '${senhaGerente}', 'Gerente', ${idEmpresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFuncionario(nomeGerente, emailGerente, senhaGerente, idEmpresa) {
    const instrucao = `
        INSERT INTO Usuario (nomeUsuario, emailUsuario, senhaUsuario, funcaoUsuario, fkEmpresaUsuario) VALUES
            ('${nomeGerente}', '${emailGerente}', '${senhaGerente}', 'Funcionario', ${idEmpresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarSenhaUsuario(idUsuario, idEmpresa, senhaUsuarioAntiga, senhaUsuarioNova) {
    const instrucao = `
        UPDATE Usuario SET senhaUsuario = '${senhaUsuarioNova}'
            WHERE idUsuario = ${idUsuario} AND senhaUsuario = '${senhaUsuarioAntiga}' AND fkEmpresaUsuario = ${idEmpresa}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarParaAdministrador(idEmpresa) {
    const instrucao = `
        SELECT * FROM Usuario
            WHERE fkEmpresaUsuario = ${idEmpresa} AND funcaoUsuario = 'Gerente';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarParaGerente(idEmpresa) {
    const instrucao = `
        SELECT * FROM Usuario
            WHERE fkEmpresaUsuario = ${idEmpresa} AND funcaoUsuario = 'Funcionario';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarUsuario(idUsuario, idEmpresa) {
    const instrucao = `
        DELETE FROM Usuario WHERE idUsuario = ${idUsuario} AND fkEmpresaUsuario = ${idEmpresa}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEmpresa,
    atualizarEmpresa,
    cadastrarUsuarioEmpresa,
    autenticar,
    cadastrarGerente,
    cadastrarFuncionario,
    alterarSenhaUsuario,
    buscarParaAdministrador,
    buscarParaGerente,
    deletarUsuario
}