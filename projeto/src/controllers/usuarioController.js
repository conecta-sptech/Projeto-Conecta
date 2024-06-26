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
            res.status(200).send("Empresa cadastrada com sucesso");

            usuarioModel.cadastrarUsuarioEmpresa(cnpjEmpresa, emailEmpresa, senhaEmpresa).then(function (resposta) {
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

function atualizarEmpresa(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const cepEmpresa = req.body.cepServer;
    const numeroEmpresa = req.body.numeroServer;
    const telefoneEmpresa = req.body.telefoneServer;

    const cepRegex = /^\d{5}-\d{3}$/;
    const telefoneRegex = /^\(\d{2}\) \d{4}-\d{4}$/;

    if (!cepRegex.test(cepEmpresa)) {
        res.status(400).send("O CEP digitado é inválido.");
    } else if (numeroEmpresa == "") {
        res.status(400).send("O campo do número da empresa precisa ser preenchido!");
    } else if (!telefoneRegex.test(telefoneEmpresa)) {
        res.status(400).send("O número de telefone digitado é inválido.");
    } else {
        usuarioModel.atualizarEmpresa(cepEmpresa, numeroEmpresa, telefoneEmpresa, idEmpresa).then(() => {
            res.status(200).send("Dados da empresa atualizados com sucesso!");
        }).catch((erro) => {
            res.status(500).json(erro.sqlMessage);
        });
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
                        nomeEmpresa: resultadoAutenticar[0].nomeEmpresa,
                        emailUsuario: resultadoAutenticar[0].emailUsuario,
                        cnpjEmpresa: resultadoAutenticar[0].cnpjEmpresa,
                        cepEmpresa: resultadoAutenticar[0].cepEmpresa,
                        numeroEmpresa: resultadoAutenticar[0].numeroEmpresa,
                        telefoneEmpresa: resultadoAutenticar[0].telefoneEmpresa
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

            if (respostaConfereSenha.changedRows > 0) {
                res.status(200).send("Senha alterada com sucesso");
            } else {
                res.status(400).send("Senha não encontrada");
            }

        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function buscarUsuario(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const funcaoUsuario = req.params.funcaoUsuario;

    if (idEmpresa == undefined) {
        res.status(400).send("Id da empresa do usuario está undefined!");

    } else if (funcaoUsuario == undefined) {
        res.status(400).send("Função do usuario está undefined!");

    } else {
        if (funcaoUsuario == "Administrador") {
            buscarUsuario = usuarioModel.buscarParaAdministrador(idEmpresa)
        } else if (funcaoUsuario == "Gerente") {
            buscarUsuario = usuarioModel.buscarParaGerente(idEmpresa)
        }
        buscarUsuario.then(function (resposta) {
            if (resposta.length > 0) {
                res.status(200).json(resposta);
            } else {
                res.status(204).send("Nenhum usuário encontrado!")
            }
        })
            .catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function deletarUsuario(req, res) {
    const idUsuario = req.params.idUsuario;
    const idEmpresa = req.params.idEmpresa;

    if (idUsuario == undefined) {
        res.status(400).send("Id do usuario está undefined!");

    } else if (idEmpresa == undefined) {
        res.status(400).send("Id da empresa do usuario está undefined!");

    } else {
        usuarioModel.deletarUsuario(idUsuario, idEmpresa).then(function (resposta) {
            res.status(200).json("Usuário deletado com sucesso!");
        })
            .catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrarEmpresa,
    atualizarEmpresa,
    autenticar,
    cadastrarUsuario,
    alterarSenhaUsuario,
    buscarUsuario,
    deletarUsuario
}