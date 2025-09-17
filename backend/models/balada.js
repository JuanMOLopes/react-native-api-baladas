//O models é responsável pela lógica de acesso ao banco de dados.

//O controller recebe as requisições HTTP da API,
//  chama as funções do models e retorna as respostas para o frontend.

const sqlite3 = require("sqlite3").verbose();
const dbPath = "./infra/database.db";
// abrir conexão com o banco de dados
function openDbConnection() {
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Erro ao abrir o banco de dados:", err.message);
    }
  });
  return db;
}
// buscar todas as baladas
function getAllBaladas(callback) {
  const db = openDbConnection();
  db.all("SELECT * FROM Baladas", [], (err, rows) => {
    db.close();
    callback(err, rows);
  });
}
//  buscar baladas pelo nome da cidade
function getBaladaByCidade(cidade, callback) {
  const db = openDbConnection();
  db.all(
    "SELECT * FROM Baladas WHERE cidade LIKE ?",
    [`%${cidade}%`],
    (err, rows) => {
      db.close();
      callback(err, rows);
    }
  );
}
//  buscar baladas pela data
function getBaladaByData(data, callback) {
  const db = openDbConnection();
  db.all(
    "SELECT * FROM Baladas WHERE data LIKE ?",
    [`%${data}%`],
    (err, rows) => {
      db.close();
      callback(err, rows);
    }
  );
}
//  criar uma nova balada
function createBalada(balada, callback) {
  const { cidade, data, tipoDeBalada, nome } = balada;
  const db = openDbConnection();
  db.run(
    "INSERT INTO Baladas (cidade, data, tipoDeBalada, nome) VALUES (?, ?, ?, ?)",
    [cidade, data, tipoDeBalada, nome],
    function (err) {
      db.close();
      callback(err, { id: this.lastID });
    }
  );
}
//  atualizar uma balada existente
function updateBalada(id, balada, callback) {
  const { cidade, data, tipoDeBalada, nome } = balada;
  const db = openDbConnection();
  db.run(
    "UPDATE Baladas SET cidade = ?, data = ?, tipoDeBalada = ?, nome = ? WHERE id = ?",
    [cidade, data, tipoDeBalada, nome, id],
    function (err) {
      db.close();
      callback(err, { changes: this.changes });
    }
  );
}
// deletar uma balada
function deleteBalada(id, callback) {
  const db = openDbConnection();
  db.run("DELETE FROM Baladas WHERE id = ?", [id], function (err) {
    db.close();
    callback(err, { changes: this.changes });
  });
}
module.exports = {
  getAllBaladas,
  getBaladaByCidade,
  getBaladaByData,
  createBalada,
  updateBalada,
  deleteBalada,
};
