//Importar o express
const express = require("express");
const app = express();
const port = 3000;
const pool = require("./config/db");
const usuarioRoutes = require('./routes/usuarioRoutes');

// Middleware para receber JSON
app.use(express.json());


pool.connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

app.use('/usuarios', usuarioRoutes);

// app.get("/", async (req, res) => {
//   try {
//     res.status(200).json('Olá mundo');
//     console.log("Olá mundo ");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });



app.listen(port, () => {
  console.log(`Express escutando na porta ${port}`)
});
