//Importar o express
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.status(200).json('Olá mundo');
    console.log("Olá mundo ");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () =>{
    console.log(`Express escutando na porta ${port}`)
});
