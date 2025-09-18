
// Importa o express, que ajuda a criar o servidor
const express = require("express");
// Importa o cors, que permite o acesso do front-end
const cors = require('cors')

// Cria o aplicativo do servidor
const app = express();
// Define a porta onde o servidor vai rodar
const port = 3000;

// Permite que o servidor entenda dados em formato JSON
app.use(express.json());

// Permite que o front-end acesse o servidor sem bloqueios
app.use(cors())

// Importa as rotas das baladas
const clienteRoutes = require("./routes/baladaRoutes");
// Usa as rotas das baladas, começando com /baladas
app.use("/baladas", clienteRoutes);

// Inicia o servidor e mostra uma mensagem no console
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
