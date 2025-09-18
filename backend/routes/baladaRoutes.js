// Importa o express para criar as rotas
const express = require("express");
// Cria o objeto de rotas
const router = express.Router();
// Importa as funções que vão tratar cada rota
const baladaController = require("../controllers/baladaController");

// Rota para buscar todas as baladas
router.get("/", baladaController.getAllBaladas);

// Rota para buscar balada por cidade
router.get("/cidade/:cidade", baladaController.getBaladaByCidade);

// Rota para buscar balada por data
router.get("/data/:data", baladaController.getBaladaByData);

// Rota para criar uma nova balada
router.post("/", baladaController.createBalada);

// Rota para atualizar uma balada pelo id
router.put("/:id", baladaController.updateBalada);

// Rota para deletar uma balada pelo id
router.delete("/:id", baladaController.deleteBalada);

// Exporta as rotas para serem usadas no app principal
module.exports = router;
