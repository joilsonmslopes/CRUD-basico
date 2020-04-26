const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const produto = [
  {
    "id": "1",
    "genero": "Masculino",
    "tipo": "Tenis",
    "tamanho": 41,
    "marca": "Olympikus"
  },
  {
    "id": "2",
    "genero": "Feminino",
    "tipo": "Tenis",
    "tamanho": 37,
    "marca": "Adidas"
  },
  {
    "id": "3",
    "genero": "Feminino",
    "tipo": "Tenis",
    "tamanho": 35,
    "marca": "Nike"
  }
];

app.get("/produtos", (request, response) => {
  return response.json(produto);
});

app.post("/produtos", (request, response) => {
  const { genero, tipo, tamanho, marca } = request.body;

  const calcado = {
    id: uuid(),
    genero,
    tipo,
    tamanho,
    marca
  };

  produto.push(calcado);

  return response.json(produto);
});

app.put("/produtos/:id", (request, response) => {
  const id = request.params.id;

  const calcadoAlt = produto.find(calcadoAlt => calcadoAlt.id === id);

  if (calcadoAlt == undefined) {
    return response.json({ error: "Produto não encontrado"})
  }

  calcadoAlt.genero = request.body.genero;
  calcadoAlt.tipo = request.body.tipo;
  calcadoAlt.tamanho = request.body.tamanho;
  calcadoAlt.marca = request.body.marca;

  return response.json(calcadoAlt)
})

module.exports = app;