const express = require("express");
const router = express.Router();
const baladaController = require("../controllers/baladaController");

router.get("/", baladaController.getAllBaladas);

router.get("/cidade/:cidade", baladaController.getBaladaByCidade);

router.get("/data/:data", baladaController.getBaladaByData);

router.post("/", baladaController.createBalada);

router.put("/:id", baladaController.updateBalada);

router.delete("/:id", baladaController.deleteBalada);
module.exports = router;
