const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar-empresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
});

router.put("/empresa/:idEmpresa", function (req, res) {
    usuarioController.atualizarEmpresa(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/cadastrar-funcionario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
});

router.patch("/alterar/senha/:idUsuario/:idEmpresa", function (req, res) {
    usuarioController.alterarSenhaUsuario(req, res);
});

router.get("/buscar/:idEmpresa/:funcaoUsuario", function (req, res) {
    usuarioController.buscarUsuario(req, res);
});

router.delete("/deletar/:idUsuario/:idEmpresa", function (req, res) {
    usuarioController.deletarUsuario(req, res);
});

module.exports = router;