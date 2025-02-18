const express = require('express');

// Inicializando o servidor Express
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Carregando variáveis de ambiente a partir do arquivo .env
const dotenv = require('dotenv');
dotenv.config();

// Definição da porta do servidor
const port = process.env.PORTA;

// Array para armazenar os produtos 
const produtos = [];

// Rota para listar todos os produtos
app.get('/', (requisicao, resposta) => {
  try {
    if(produtos.length === 0){
      return resposta.status(200).json({mensagem: "Não há produtos cadastrados"});
    }
    resposta.status(200).json(produtos);
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao buscar produtos"});
  }  
});

// Rota para cadastrar um novo produto
app.post('/', (requisicao, resposta) => {
  try {
    const { id, nome, preco, quantidade } = requisicao.body;
    const novoProduto = { id, nome, preco, quantidade };
    
    produtos.push(novoProduto);
    resposta.status(201).json({mensagem: "Produto cadastrado com sucesso"});
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao cadastrar produto."});
  }
});

// Rota para atualizar produto 
app.put('/:id', (requisicao, resposta) => {
  try {
    const {id} = requisicao.params;
    const produto = produtos.find(produto => produto.id === id);
    
    if(!produto){
      return resposta.status(404).json({mensagem: "Produto não encontrado"});
    }
    const {novoNome, novoPreco, novaQuantidade} = requisicao.body;
    
    produto.nome = novoNome;
    produto.preco = novoPreco;
    produto.quantidade = novaQuantidade;

    resposta.status(200).json(produto);

  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao atualizar produto."});
  }
});

// Inicializa o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
});
