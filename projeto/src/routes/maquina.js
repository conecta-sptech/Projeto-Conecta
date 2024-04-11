const express = require("express");
const router = express.Router();

const maquinaController = require("../controllers/maquinaController");

router.post("/cadastrar-maquina", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
});

router.get("/buscar-maquina/:idEmpresa", function (req, res) {
//Na rota do tipo get, enviamos valores para o controller pelo endpoint.
    maquinaController.buscarMaquina(req, res);
});
//Rota para o modal de gerenciar máquinas receber as máquinas.

module.exports = router;