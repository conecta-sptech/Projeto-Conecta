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


module.exports = {
    buscarIds
}