// Importando com (ESM)
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());

const bancoDados = [];

app.get('/produtos', (requisicao, resposta) => {
  resposta.json(bancoDados);
});

app.post('/produtos', (requisicao, resposta) => {
  const { id, nome, preco } = requisicao.body;
  const novoProduto = { id, nome, preco };
  bancoDados.push(novoProduto);
  resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});