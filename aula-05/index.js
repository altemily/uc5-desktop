// Importando os módulos necessários para a aplicação
const express = require('express'); // Framework para criação de servidores no Node.js
const dotenv = require('dotenv'); // Biblioteca para gerenciar variáveis de ambiente
const { Pool } = require('./src/config/database'); // Importa a conexão com o banco de dados PostgreSQL

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const port = process.env.PORTA; // Define a porta do servidor a partir da variável de ambiente
const app = express(); // Inicializa a aplicação Express
app.use(express.json()); // Middleware para permitir o uso de JSON no corpo das requisições


// Rotas  //

// Rota para buscar todos os produtos
app.get("/produtos", async (requisicao, resposta) => {
  try {
    const consulta = `SELECT * FROM produto`
    const produtos = await pool.query(consulta)
    if (produtos.rows.length === 0) {
      return resposta.status(200).json({mensagem: "Banco de dados vazio"});
    }
    resposta.status(200).json(produtos.rows);
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao buscar produtos",
      erro: error.message
    });
  }
});


// Rota para criar um novo produto
app.post("/produtos", async (requisicao, resposta) => {
  try {
    const { nome, preco, quantidade } = requisicao.body;
    if (!nome || !preco || !quantidade) {
      return resposta.status(200).json({
        mensagem: "Todos os dados devem ser preenchidos!",
      });
    }
    const novoProduto = [nome, preco, quantidade];
    const consulta = `INSERT INTO produto(nome, preco, quantidade) 
                        VALUES ($1, $2, $3) RETURNING *`
    await pool.query(consulta, novoProduto)
    resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao cadastrar produto",
      erro: error.message,
    });
  }
});


// Rota para atualizar um produto
app.put("/produtos/:id", async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const { novoNome, novoPreco , novaQuantidade } = requisicao.body;
    if (!id) {
      return resposta.status(404).json({ mensagem: "Informe um paramentro!" });
    }
    const dados1 = [id]
    const consulta1 = `SELECT * FROM produto WHERE id = $1`
    const resultado1 = await pool.query(consulta1, dados1)
    if (resultado1.rows.length === 0) {
      return resposta.status(404).json({ mensagem: "Produto não encontrado!" });
    }
    const dados2 = [id, novoNome, novoPreco , novaQuantidade]
    const consulta2 = `UPDATE produto SET nome = $2, preco = $3, 
                    quantidade = $4 WHERE id = $1 RETURNING *`
    await pool.query(consulta2, dados2)
    resposta.status(200).json({ mensagem: "Produto atualizado com sucesso!" });
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao editar produto",
      erro: error.message
    });
  }
});


// Rota para deletar um produto
app.delete("/produtos/:id", async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const parametro = [id]
    const consulta1 = `SELECT * FROM produto WHERE id = $1`
    const resultado1 = await pool.query(consulta1, parametro)
    if (resultado1.rows.length === 0) {
      return resposta.status(404).json({ mensagem: "Produto não encontrado" });
    }
    
    
    resposta.status(200).json({ mensagem: "Produto deletado com sucesso" });
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao excluir produto",
      erro: error.message
    });
  }
});


// Rota para buscar um produto específico
app.get("/produtos/:id", (requisicao, resposta) => {
  try {
    // o id do paramentro é sempre string
    const id = requisicao.params.id;
    const produto = bancoDados.find(elemento => elemento.id === id);
    if(!produto){
      return resposta.status(404).json({mensagem:"Produto não encontrado"})
    }
    resposta.status(200).json(produto)
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao buscar produto",
      erro: error.message
    });
  }
})


// Rota para excluir todos os produtos
app.delete("/produtos", (requisicao, resposta) => {
  try {
    bancoDados.length = 0;
    resposta.status(200).json({mensagem: "Todos os produtos foram excluidos!"})
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao deletar produtos",
      erro: error.message
    });
  }
})


// Inicializa o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});