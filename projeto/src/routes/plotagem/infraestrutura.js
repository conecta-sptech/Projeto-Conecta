const express = require("express");
const router = express.Router();

const infraestruturaController = require("../../controllers/plotagem/infraestruturaController");

router.get("/estado/:cor/:idEmpresa", (req, res) => {
    infraestruturaController.buscarIds(req, res);
});

module.exports = router;