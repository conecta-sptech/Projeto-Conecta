const express = require("express");
const router = express.Router();

const infraestruturaController = require("../../controllers/plotagem/infraestruturaController");

router.get("/estado/:cor/:idEmpresa", (req, res) => {
    infraestruturaController.buscarIds(req, res);
});

router.get("/dados/:idMaquina/:listaGraficos/:primeiraLeitura", (req, res) => {
    infraestruturaController.obterDadosGrafico(req, res);
});

router.put("/maquina/:idMaquina/intervalo-leitura", (req, res) => {
    infraestruturaController.atualizarIntervaloLeitura(req, res);
});

router.get("/kpi/:idEmpresa", (req, res) => {
    infraestruturaController.obterDadosKpi(req, res);
});

module.exports = router;