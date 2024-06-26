const infraestruturaModel = require("../../models/plotagem/infraestruturaModel");

function buscarIds(req, res) {
    const cor = req.params.cor;
    const idEmpresa = req.params.idEmpresa;

    if (cor == undefined) {
        res.status(400).send("Cor do alerta está undefined!");

    } else if (idEmpresa == undefined) {
        res.status(400).send("Id da empresa está undefined!");

    } else {
        infraestruturaModel.buscarIds(cor, idEmpresa).then(function (resultado) {
            console.log(resultado);
            res.status(200).json(resultado);

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as máquinas com estado Vermelho.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}


async function obterDadosGrafico(req, res) {
    const idMaquina = req.params.idMaquina;
    const listaGraficos = (req.params.listaGraficos).split(",");
    const primeiraLeitura = req.params.primeiraLeitura;

    let listaLeitura = [];

    if (idMaquina == undefined) {
        res.status(400).send("Id da máquina está undefined!");

    } else if (listaGraficos == undefined) {
        res.status(400).send("listaGraficos está undefined!");

    } else if (primeiraLeitura == undefined) {
        res.status(400).send("primeiraLeitura está undefined!");

    } else {
        try {
            listaLeitura[0] = await infraestruturaModel.obterMemoria(listaGraficos[0], idMaquina);
            listaLeitura[1] = await infraestruturaModel.obterCpu(listaGraficos[1], idMaquina, primeiraLeitura);
            listaLeitura[2] = await infraestruturaModel.obterDisco(listaGraficos[2], idMaquina, primeiraLeitura);
            listaLeitura[3] = await infraestruturaModel.obterRede(idMaquina);

            console.log(listaLeitura);
            res.status(200).json(listaLeitura);
        } catch (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as leituras.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    }
}

async function obterDadosKpi(req, res) {
    const idEmpresa = req.params.idEmpresa;

    let listaKpi = [];

    if (idEmpresa == undefined) {
        res.status(400).send("Id da empresa está undefined!");

    } else {
        try {
            listaKpi[0] = await infraestruturaModel.obterKpi(idEmpresa, 1);
            listaKpi[1] = await infraestruturaModel.obterKpi(idEmpresa, 2);
            listaKpi[2] = await infraestruturaModel.obterKpi(idEmpresa, 3);
            listaKpi[3] = await infraestruturaModel.obterKpi(idEmpresa, 4);

            console.log(listaKpi);
            res.status(200).json(listaKpi);
        } catch (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as kpis.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    }
}

function atualizarIntervaloLeitura(req, res) {
    const idMaquina = req.params.idMaquina;
    const intervalo = req.body.intervaloServer;

    infraestruturaModel.atualizarIntervaloLeitura(intervalo, idMaquina).then((resposta) => {
        res.status(200).json(resposta);
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = {
    buscarIds,
    obterDadosGrafico,
    obterDadosKpi,
    atualizarIntervaloLeitura
}