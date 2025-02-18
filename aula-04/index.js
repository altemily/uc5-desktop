// Impotando com (CommonJS)
const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); // Inicializando o dotenv

const port = process.env.PORTA; // Criando uma variável de ambiente
const app = express(); // Inicializando o express

app.use(express.json()); // Habilitando o uso de JSON

const bancoDados = []; // Criando um banco de dados

// Listando produtos no banco de dados
app.get('/produtos', (requisicao, resposta) => {
// Tratamento de exeção
try {
  if(bancoDados.length === 0){
      return resposta.status(200).json({ mensagem: "Bando de dados vazio." }); // Retorna uma mensagem de erro
  }
  resposta.status(200).json(bancoDados); // Retorna o banco de dados
} catch (error) {
  resposta.status(500).json({ mensagem: "Erro ao buscar produtos.", erro: error.message }); // Retorna uma mensagem de erro
}
});

// Buscando um produto pelo ID
app.get('/produtos/:id', (requisicao, resposta) => {
  try {
    const id = requisicao.params.id; // Pegando o ID da requisição
    const produto = bancoDados.find(elemento => elemento.id === id); // Buscando o produto no banco de dados
    if(!produto) {
      return resposta.status(404).json({ mensagem: "Produto não encontrado." }); // Retorna uma mensagem de erro
    }
    resposta.status(200).json(produto); // Retorna o produto encontrado
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao buscar produto.", erro: error.message }); // Retorna uma mensagem de erro
  }
});

// Criando um novo produto
app.post('/produtos', (requisicao, resposta) => {
  try {
    const { id, nome, preco } = requisicao.body; // Desestruturando o corpo da requisição
    if(!id || !nome || !preco) {
      return resposta.status(200).json({ mensagem: "Todos os dados dever ser preenchidos." }); // Retorna uma mensagem de erro
    }
    const novoProduto = { id, nome, preco }; // Criando um novo produto
    bancoDados.push(novoProduto); // Adicionando o novo produto ao banco de dados
    resposta.status(201).json({ mensagem: "Produto criado com sucesso" }); // Retorna uma mensagem de sucesso

  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao cadastar produto.", erro: error.message }); // Retorna uma mensagem de erro
  }

});

// Atualizando um produto
app.put('/produtos/:id', (requisicao, resposta) => {
  try {
    const id = requisicao.params.id; // Pegando o ID da requisição
    const {novoNome, novoPreco} = requisicao.body; // Desestruturando o corpo da requisição
    if(!id) {
      return resposta.status(404).json({ mensagem: "ID não informado." }); // Retorna uma mensagem de erro
    }
    const produto = bancoDados.find(elemeno => elemeno.id === id); // Buscando o produto no banco de dados
    if(!produto) {
      return resposta.status(404).json({ mensagem: "Produto não encontrado." }); // Retorna uma mensagem de erro
    }
      produto.nome = novoNome || produto.nome // Atualizando o nome do produto
      produto.preco = novoPreco || produto.preco // Atualizando o preço do produto
      return resposta.status(200).json({ mensagem: "Produto atualizado com sucesso." }); // Retorna uma mensagem de sucesso

  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao atualizar produto.", erro: error.message }); // Retorna uma mensagem de erro
  }
});

// Deletando um produto
app.delete('/produtos/:id', (requisicao, resposta) => {
  try {
      const id = requisicao.params.id; // Pegando o ID da requisição
  const index = bancoDados.findIndex(elemento => elemento.id === id); // Buscando o produto no BD
  if(index === -1) {
    return resposta.status(404).json({ mensagem: "Produto não encontrado." }); // Retorna uma mensagem de erro
  }
  bancoDados.splice(index, 1); // Deletando o produto do banco de dados
  resposta.status(200).json({ mensagem: "Produto deletado com sucesso." }); // Retorna uma mensagem de sucesso
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao deletar produto.", erro: error.message }); // Retorna uma mensagem de erro
  }
});

// Deletando todos os produtos
app.delete('/produtos', (requisicao, resposta) => {
  try {
    bancoDados.length = 0
    resposta.status(200).json({mensagem: "Todos os produtos deletados com sucesso." }) // Retorna uma mensagem de sucesso.
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao deletar todos os produtos.", erro: error.message }); // Retorna uma mensagem de erro
  }
})


// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});