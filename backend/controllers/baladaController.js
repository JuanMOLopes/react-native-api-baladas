
// Este arquivo recebe os pedidos da API e chama as funções do banco de dados

// Importa o arquivo que cuida do banco de dados das baladas
const Balada = require("../models/balada");

// Controlador para buscar todas as baladas
exports.getAllBaladas = (req, res) => {
  Balada.getAllBaladas((err, baladas) => {
    if (err) {
      res.status(500).send(err); // Se der erro, responde com erro
    } else {
      res.json(baladas); // Se der certo, responde com a lista de baladas
    }
  });
};

// Controlador para buscar balada por cidade
exports.getBaladaByCidade = (req, res) => {
  Balada.getBaladaByCidade(req.params.cidade, (err, balada) => {
    if (err) {
      res.status(500).send(err); // Se der erro, responde com erro
    } else if (balada) {
      res.json(balada); // Se encontrar, responde com a balada
    } else {
      res.status(404).send({ message: "Balada não encontrada" }); // Se não encontrar, responde com mensagem
    }
  });
};

// Controlador para buscar balada por data
exports.getBaladaByData = (req, res) => {
  Balada.getBaladaByData(req.params.data, (err, balada) => {
    if (err) {
      res.status(500).send(err); // Se der erro, responde com erro
    } else if (balada) {
      res.json(balada); // Se encontrar, responde com a balada
    } else {
      res.status(404).send({ message: "Balada não encontrada" }); // Se não encontrar, responde com mensagem
    }
  });
};

// Controlador para criar uma nova balada
exports.createBalada = (req, res) => {
  Balada.createBalada(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err); // Se der erro, responde com erro
    } else {
      res.status(201).json(result); // Se der certo, responde com o resultado
    }
  });
};

// Controlador para atualizar uma balada existente
exports.updateBalada = (req, res) => {
  Balada.updateBalada(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(500).send(err); // Se der erro, responde com erro
    } else if (result.changes) {
      res.status(200).json(result); // Se atualizou, responde com o resultado
    } else {
      res.status(404).send({ message: "Balada não encontrada" }); // Se não encontrou, responde com mensagem
    }
  });
};

// Controlador para deletar uma balada
exports.deleteBalada = (req, res) => {
  Balada.deleteBalada(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send(err); // Se der erro, responde com erro
    } else if (result.changes) {
      res.status(200).json({ message: "Balada deletada com sucesso" }); // Se deletou, responde com mensagem
    } else {
      res.status(404).send({ message: "Balada não encontrada" }); // Se não encontrou, responde com mensagem
    }
  });
};
