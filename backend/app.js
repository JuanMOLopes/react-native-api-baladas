const express = require("express");
const cors = require('cors')
const app = express();
const port = 3000;
// Middleware para analisar o corpo das requisições em JSON
app.use(express.json());

// usando o cors para conseguir requisições no front-end
app.use(cors())

// Importando as rotas do cliente
const clienteRoutes = require("./routes/baladaRoutes");
// Usando as rotas do cliente com o prefixo '/baladas'
app.use("/baladas", clienteRoutes);
// Iniciando o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
