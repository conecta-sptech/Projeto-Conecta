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
        usuarioModel.cadastrarEmpresa(nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa).then(function (resposta) {
            res.status(200).send("Empresa cadastrada com sucesso");
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

module.exports = {
    cadastrarEmpresa
}