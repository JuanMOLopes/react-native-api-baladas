// Este arquivo cuida do acesso ao banco de dados das baladas

// Importa o sqlite3 para usar o banco de dados
const sqlite3 = require("sqlite3").verbose();
// Caminho do arquivo do banco de dados
const dbPath = "./infra/database.db";

// Abre a conexão com o banco de dados
function openDbConnection() {
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Erro ao abrir o banco de dados:", err.message);
    }
  });
  return db;
}

// Busca todas as baladas cadastradas
function getAllBaladas(callback) {
  const db = openDbConnection();
  db.all("SELECT * FROM Baladas", [], (err, rows) => {
    db.close();
    callback(err, rows);
  });
}

// Busca baladas pelo nome da cidade
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

// Busca baladas pela data
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

// Cria uma nova balada no banco de dados
function createBalada(balada, callback) {
  const { cidade, data, tipoDeBalada, nome } = balada;
  const db = openDbConnection();
  db.run(
    "INSERT INTO Baladas (cidade, data, tipoDeBalada, nome) VALUES (?, ?, ?, ?)",
    [cidade, data, tipoDeBalada, nome],
    function (err) {
      db.close();
      callback(err, { id: this.lastID }); // Retorna o id da nova balada
    }
  );
}

// Atualiza uma balada já existente
function updateBalada(id, balada, callback) {
  const { cidade, data, tipoDeBalada, nome } = balada;
  const db = openDbConnection();
  db.run(
    "UPDATE Baladas SET cidade = ?, data = ?, tipoDeBalada = ?, nome = ? WHERE id = ?",
    [cidade, data, tipoDeBalada, nome, id],
    function (err) {
      db.close();
      callback(err, { changes: this.changes }); // Retorna quantas linhas foram alteradas
    }
  );
}

// Deleta uma balada pelo id
function deleteBalada(id, callback) {
  const db = openDbConnection();
  db.run("DELETE FROM Baladas WHERE id = ?", [id], function (err) {
    db.close();
    callback(err, { changes: this.changes }); // Retorna quantas linhas foram apagadas
  });
}

// Exporta as funções para serem usadas em outros arquivos
module.exports = {
  getAllBaladas,
  getBaladaByCidade,
  getBaladaByData,
  createBalada,
  updateBalada,
  deleteBalada,
};
