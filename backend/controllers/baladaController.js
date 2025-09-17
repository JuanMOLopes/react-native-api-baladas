//O models é responsável pela lógica de acesso ao banco de dados.

//O controller recebe as requisições HTTP da API,
//  chama as funções do models e retorna as respostas para o frontend.

const Balada = require("../models/balada");
exports.getAllBaladas = (req, res) => { // Controlador para obter todas as baladas
  Balada.getAllBaladas((err, baladas) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(baladas);
    }
  });
};

exports.getBaladaByCidade = (req, res) => { // Controlador para obter uma balada pelo nome da cidade
  Balada.getBaladaByCidade(req.params.cidade, (err, balada) => {
    if (err) {
      res.status(500).send(err);
    } else if (balada) {
      res.json(balada);
    } else {
      res.status(404).send({ message: "Balada não encontrada" });
    }
  });
};

exports.getBaladaByData = (req, res) => { // Controlador para obter uma balada pela data
  Balada.getBaladaByData(req.params.data, (err, balada) => {
    if (err) {
      res.status(500).send(err);
    } else if (balada) {
      res.json(balada);
    } else {
      res.status(404).send({ message: "Balada não encontrada" });
    }
  });
};

exports.createBalada = (req, res) => { // Controlador para criar uma nova balada
  Balada.createBalada(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(result);
    }
  });
};
exports.updateBalada = (req, res) => { // Controlador para atualizar um cliente existente
  Balada.updateBalada(req.params.id, req.body, (err, result) => {
    if (err) {
    // retorna o erro com status HTTP 500 (erro interno do servidor).
      res.status(500).send(err);
    } else if (result.changes) {
      // Se não houve erro e o campo "changes" no resultado indica que
    // alguma linha foi realmente afetada
      res.status(200).json(result);
    } else {
    // Nesse caso, retorna status 404 (não encontrado) com a mensagem correspondente.
      res.status(404).send({ message: "Balada não encontrada" });
    }
  });
};

exports.deleteBalada = (req, res) => { // Controlador para deletar uma balada
  Balada.deleteBalada(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.changes) {
      res.status(200).json({ message: "Balada deletada com sucesso" });
    } else {
      res.status(404).send({ message: "Balada não encontrada" });
    }
  });
};
