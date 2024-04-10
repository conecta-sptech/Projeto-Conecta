const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar-empresa", function (req, res) {
    // função a ser chamada quando acessar /usuario/cadastrarEmpresa
    usuarioController.cadastrarEmpresa(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;