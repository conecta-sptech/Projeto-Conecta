const usuarioModel = require("../models/usuarioModel");

function cadastrarEmpresa(req, res) {
    const nomeEmpresa = req.body.nomeServer;
    const cnpjEmpresa = req.body.cnpjServer;
    const emailEmpresa = req.body.emailServer;
    const senhaEmpresa = req.body.senhaServer;

    if (nomeEmpresa == undefined) {
        res.status(400).send("Nome da empresa está undefined!");

    } else if (cnpjEmpresa == undefined) {
        res.status(400).send("Cnpj da empresa está undefined!");

    } else if (emailEmpresa == undefined) {
        res.status(400).send("E-mail da empresa está undefined!");

    } else if (senhaEmpresa == undefined) {
        res.status(400).send("Senha da empresa está undefined!");

    } else {
        usuarioModel.cadastrarEmpresa(nomeEmpresa, cnpjEmpresa).then(function (resposta) {
            console.log(resposta);
            let idEmpresa = resposta.insertId;
            res.status(200).send("Empresa cadastrada com sucesso");

            usuarioModel.cadastrarUsuarioEmpresa(emailEmpresa, senhaEmpresa, idEmpresa).then(function (resposta) {
                console.log(resposta);
                res.status(200).send("Usuário administrador da empresa cadastrada com sucesso");

            }).catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            })

        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function autenticar(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Email do usuário está undefined!");

    } else if (senha == undefined) {
        res.status(400).send("Senha do usuário está indefinida!");

    } else {

        usuarioModel.autenticar(email, senha).then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);
                    res.json({
                        id: resultadoAutenticar[0].idUsuario,
                        nome: resultadoAutenticar[0].nomeUsuario,
                        funcao: resultadoAutenticar[0].funcaoUsuario,
                        idEmpresa: resultadoAutenticar[0].idEmpresa,
                        nomeEmpresa: resultadoAutenticar[0].nomeEmpresa
                    });

                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");

                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");

                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

}

function cadastrarUsuario(req, res) {
    const nomeUsuario = req.body.nomeServer;
    const emailUsuario = req.body.emailServer;
    const senhaUsuario = req.body.senhaServer;
    const idEmpresa = req.body.idEmpresaServer;
    const funcaoUsuario = req.body.funcaoServer;

    if (nomeUsuario == undefined) {
        res.status(400).send("Nome do usuario está undefined!");

    } else if (emailUsuario == undefined) {
        res.status(400).send("E-mail do usuario está undefined!");

    } else if (senhaUsuario == undefined) {
        res.status(400).send("Senha do usuario está undefined!");

    } else {
        if (funcaoUsuario === "Administrador") {
            cadastro = usuarioModel.cadastrarGerente(nomeUsuario, emailUsuario, senhaUsuario, idEmpresa)
        } else if (funcaoUsuario === "Gerente") {
            cadastro = usuarioModel.cadastrarFuncionario(nomeUsuario, emailUsuario, senhaUsuario, idEmpresa)
        }
        cadastro.then(function (resposta) {
            console.log(resposta);
            res.status(200).send("Usuário funcionário da empresa cadastrado com sucesso");
        })
            .catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function alterarSenhaUsuario(req, res) {
    const idUsuario = req.params.idUsuario;
    const idEmpresa = req.params.idEmpresa;
    const senhaUsuarioAntiga = req.body.senhaUsuarioAntiga;
    const senhaUsuarioNova = req.body.senhaUsuarioNova;

    if (idUsuario == undefined) {
        res.status(400).send("Id do usuario está undefined!");

    } else if (idEmpresa == undefined) {
        res.status(400).send("Id da empresa está undefined!");

    } else if (senhaUsuarioAntiga == undefined) {
        res.status(400).send("Senha antiga do usuario está undefined!");

    } else if (senhaUsuarioNova == undefined) {
        res.status(400).send("Senha nova do usuario está undefined!");

    } else {
        usuarioModel.alterarSenhaUsuario(idUsuario, idEmpresa, senhaUsuarioAntiga, senhaUsuarioNova).then(function (respostaConfereSenha) {
            console.log(respostaConfereSenha);
            console.log(respostaConfereSenha.changedRows)

            if (respostaConfereSenha.changedRows > 0){
                res.status(200).send("Senha alterada com sucesso");
            } else {
                res.status(400).send("Senha não encontrada");
            }

        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

module.exports = {
    cadastrarEmpresa,
    autenticar,
    cadastrarUsuario,
    alterarSenhaUsuario
}