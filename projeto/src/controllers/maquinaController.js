const maquinaModel = require("../models/maquinaModel");

function cadastrarMaquina(req, res) {
    const hostname = req.body.hostnameServer;
    const ram = req.body.ramServer;
    const disco = req.body.discoServer;
    const clockProcessador = req.body.clockProcessadorServer;
    const qtdNucleoProcessador = req.body.qtdNucleoProcessadorServer;
    const idEmpresa = req.body.idEmpresaServer;

    if (hostname == undefined) {
        res.status(400).send("Hostname da máquina está undefined!");

    } else if (ram == undefined) {
        res.status(400).send("Ram da máquina está undefined!");

    } else if (disco == undefined) {
        res.status(400).send("Disco da máquina está undefined!");

    } else if (clockProcessador == undefined) {
        res.status(400).send("Clock do processador está undefined!");

    } else if (qtdNucleoProcessador == undefined) {
        res.status(400).send("Nucleos do processador está undefined!");

    } else if (idEmpresa == undefined) {
        res.status(400).send("Id da máquina está undefined!");

    } else {
        maquinaModel.cadastrarMaquina(hostname, ram, disco, clockProcessador, qtdNucleoProcessador, idEmpresa).then(function (resposta) {
            console.log(resposta);
            res.status(200).send("Máquina cadastrada com sucesso");
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function editarMaquina(req, res) {
    const idMaquina = req.body.idMaquinaServer;
    const hostname = req.body.hostnameServer;
    const ram = req.body.ramServer;
    const disco = req.body.discoServer;
    const clockProcessador = req.body.clockProcessadorServer;
    const qtdNucleoProcessador = req.body.qtdNucleoProcessadorServer;
    const idEmpresa = req.body.idEmpresaServer;

    if (idMaquina == undefined) {
        res.status(400).send("Id da máquina está undefined!");

    } else if (hostname == undefined) {
        res.status(400).send("Hostname da máquina está undefined!");

    } else if (ram == undefined) {
        res.status(400).send("Ram da máquina está undefined!");

    } else if (disco == undefined) {
        res.status(400).send("Disco da máquina está undefined!");

    } else if (clockProcessador == undefined) {
        res.status(400).send("Clock do processador está undefined!");

    } else if (qtdNucleoProcessador == undefined) {
        res.status(400).send("Nucleos do processador está undefined!");

    } else if (idEmpresa == undefined) {
        res.status(400).send("Id da máquina está undefined!");

    } else {
        maquinaModel.editarMaquina(idMaquina, hostname, ram, disco, clockProcessador, qtdNucleoProcessador, idEmpresa).then(function (resposta) {
            console.log(resposta);
            res.status(200).send("Máquina editada com sucesso");
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function buscarMaquina(req, res) {
    const idEmpresa = req.params.idEmpresa;

    maquinaModel.buscarMaquina(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            //Envia o resultado para o fetch em json

        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as máquinas cadastradas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletarMaquina(req, res) {
    const idMaquina = req.params.idMaquina;
    const idEmpresa = req.params.idEmpresa;

    if (idMaquina == undefined) {
        res.status(400).send("Id da máquina está undefined!");

    } else if (idEmpresa == undefined) {
        res.status(400).send("Id da empresa do usuario está undefined!");

    } else {
        maquinaModel.deletarMaquina(idMaquina, idEmpresa).then(function (resposta) {
            res.status(200).json("Máquina deletada com sucesso!");
        })
            .catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrarMaquina,
    editarMaquina,
    buscarMaquina,
    deletarMaquina
}