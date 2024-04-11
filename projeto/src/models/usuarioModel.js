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
            INSERT INTO Usuario (idUsuario, nomeUsuario, emailUsuario, senhaUsuario, funcaoUsuario, fkEmpresa) VALUES
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
			    ON u.fkEmpresa = e.idEmpresa
        WHERE u.emailUsuario = "${email}" AND u.senhaUsuario = "${senha}";
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEmpresa,
    cadastrarUsuarioEmpresa,
    autenticar
}

