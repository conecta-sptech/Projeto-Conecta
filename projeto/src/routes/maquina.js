const express = require("express");
const router = express.Router();

const maquinaController = require("../controllers/maquinaController");

router.post("/cadastrar-maquina", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
});

router.post("/editar-maquina", function (req, res) {
    maquinaController.editarMaquina(req, res);
});

router.get("/buscar-maquina/:idEmpresa", function (req, res) {
    maquinaController.buscarMaquina(req, res);
});

router.delete("/deletar/:idMaquina/:idEmpresa", function (req, res) {
    maquinaController.deletarMaquina(req, res);
});

module.exports = router;