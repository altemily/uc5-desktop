const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORTA;

const aplicativo = express();
aplicativo.use(express.json());

const banco_dados = [];

aplicativo.get('/produtos', (requisicao, resposta) => {
  resposta.json(banco_dados);
});

aplicativo.post('/produtos', (requisicao, resposta) => {
  const { id, nome, preco } = requisicao.body;
  const novoProduto = { id, nome, preco };
  banco_dados.push(novoProduto);
  resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
});

aplicativo.put('/produtos/:id', (requisicao, resposta) => {
  const { id } = requisicao.params;
  const { nome, preco } = requisicao.body;
  const produto = banco_dados.find(p => p.id == id);
  if (produto) {
      produto.nome = nome;
      produto.preco = preco;
      resposta.json({ mensagem: "Produto atualizado com sucesso" });
  } else {
      resposta.status(404).json({ mensagem: "Produto não encontrado" });
  }
});


aplicativo.delete('/produtos/:id', (requisicao, resposta) => {
  const { id } = requisicao.params;
  const index = banco_dados.findIndex(p => p.id == id);
  if (index !== -1) {
      banco_dados.splice(index, 1);
      resposta.json({ mensagem: "Produto deletado com sucesso" });
  } else {
      resposta.status(404).json({ mensagem: "Produto não encontrado" });
  }
});

aplicativo.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});