const express = require("express");
const router = express.Router();

const gestaoController = require("../../controllers/plotagem/gestaoController");

router.get("/buscar-maquinas-inativas/:idEmpresa", function (req, res) {
    gestaoController.obterMaquinasInativas(req, res);
});

router.get("/buscar-maquinas-inativas-ativas/:idEmpresa", function (req, res) {
    gestaoController.obterQtdMaquinasInativasEAtivas(req, res);
});

module.exports = router;