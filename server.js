const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const cadastro = [
  {
    "id": "1",
    "nome": "Joao",
    "email": "contato@joao.com",
    "likes": 0
  },
  {
    "id": "2",
    "nome": "Maria",
    "email": "contato@Maria.com",
    "likes": 0
  },
  {
    "id": "3",
    "nome": "Ana",
    "email": "contato@ana.com",
    "likes": 0
  },
  {
    "id": "4",
    "nome": "Carlos",
    "email": "contato@carlos.com",
    "likes": 0
  }
];

app.get("/cadastros", (request, response) => {
  return response.json(cadastro);
});

app.post("/cadastros", (request, response) => {
  const { nome, email, likes } = request.body;

  const usuario = {
    id: uuid(),
    nome,
    email,
    likes
  };

  cadastro.push(usuario);

  return response.json(usuario);
});

app.put("/cadastros/:id", (request, response) => {
  const id = request.params.id;

  const usuarioAlt = cadastro.find(usuario => usuario.id == id);

  if(usuarioAlt == undefined) {
    return response.json({ error: "Usuário não encontrado." })
  }

  usuarioAlt.nome = request.body.nome;
  usuarioAlt.email = request.body.email;
  
  return response.json(usuarioAlt);
});

app.delete("/cadastros/:id", (request, response) => {
  const id = request.params.id;

  const usuarioIndex = cadastro.findIndex(usuario => usuario.id == id);

  if (usuarioIndex < 0) {
    return response.json({ error: "Usuário não encontrado ou já deletado!"})
  }

  cadastro.splice(usuarioIndex, 1)

  return response.json({ message: "Usuário deletado com sucesso!"})
})

module.exports = app;