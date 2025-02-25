// Importando os módulos necessários para a aplicação
const express = require('express'); // Framework para criação de servidores no Node.js
const dotenv = require('dotenv'); // Biblioteca para gerenciar variáveis de ambiente
const { pool } = require('./src/config/database'); // Importa a conexão com o banco de dados PostgreSQL

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const port = process.env.PORTA; // Define a porta do servidor a partir da variável de ambiente
const app = express(); // Inicializa a aplicação Express

app.use(express.json()); // Middleware para permitir o uso de JSON no corpo das requisições

// Rotas  //

// Rota para buscar todos os produtos
app.get('/produtos', async (requisicao, resposta) => {
  try {
    const consulta = `SELECT * FROM produto`; // Comando SQL para selecionar todos os produtos
    const produtos = await pool.query(consulta); // Executa a consulta no banco de dados

    if (produtos.rows.length === 0) { // Verifica se a consulta retornou algum dado
      return resposta.status(200).json({ msg: "Sem dados no momento" });
    }

    resposta.status(200).json(produtos.rows); // Retorna a lista de produtos encontrados
  } catch (error) {
    resposta.status(500).json({ msg: "Erro ao buscar banco de dados" }); // Tratamento de erro interno
  }
});

// Rota para buscar um produto pelo ID
app.get('/produtos/:id', async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id; // Obtém o ID do produto a partir dos parâmetros da requisição
    const consulta = `SELECT * FROM produto WHERE id = $1`; // Consulta SQL para buscar um produto específico
    const produto = await pool.query(consulta, [id]); // Executa a consulta passando o ID como parâmetro

    if (produto.rows.length === 0) { // Verifica se o produto existe
      return resposta.status(404).json({ msg: "Produto não encontrado" });
    }

    resposta.status(200).json(produto.rows[0]); // Retorna os detalhes do produto encontrado
  } catch (error) {
    resposta.status(500).json({ msg: "Erro ao buscar banco de dados" }); // Tratamento de erro interno
  }
});

// Rota para criar um novo produto
app.post('/produtos', async (requisicao, resposta) => {
  try {
    const { nome, preco, quantidade } = requisicao.body; // Obtém os dados do corpo da requisição

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!nome || !preco || !quantidade) {
      return resposta.status(400).json({ msg: "Todos os dados devem ser preenchidos" });
    }

    // Comando SQL para inserir um novo produto no banco
    const consulta = `INSERT INTO produto (nome, preco, quantidade) VALUES ($1, $2, $3) RETURNING *`;
    const novoProduto = await pool.query(consulta, [nome, preco, quantidade]); // Executa a inserção no banco

    // Retorna mensagem de sucesso e os detalhes do produto criado
    resposta.status(201).json({ mensagem: "Produto criado com sucesso", produto: novoProduto.rows[0] });
  } catch (error) {
    resposta.status(500).json({ msg: "Erro ao registrar produto" }); // Tratamento de erro interno
  }
});

// Rota para atualizar um produto
app.put('/produtos/:id', async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id; // Obtém o ID do produto da URL
    const { nome, preco, quantidade } = requisicao.body; // Obtém os dados atualizados do corpo da requisição

    // Consulta SQL para verificar se o produto existe
    const consulta = `SELECT * FROM produto WHERE id = $1`;
    const resultado = await pool.query(consulta, [id]);

    if (resultado.rows.length === 0) { // Caso o produto não seja encontrado
      return resposta.status(404).json({ msg: "Produto não encontrado" });
    }

    // Comando SQL para atualizar o produto com os novos valores
    const update = `UPDATE produto SET nome = $2, preco = $3, quantidade = $4 WHERE id = $1 RETURNING *`;
    const produtoAtualizado = await pool.query(update, [id, nome, preco, quantidade]);

    // Retorna mensagem de sucesso e os detalhes do produto atualizado
    resposta.status(200).json({ msg: 'Produto atualizado com sucesso', produto: produtoAtualizado.rows[0] });
  } catch (error) {
    resposta.status(500).json({ msg: "Erro ao atualizar produto" }); // Tratamento de erro interno
  }
});

// Rota para deletar um produto pelo ID
app.delete('/produtos/:id', async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id; // Obtém o ID do produto da URL
    
    // Comando SQL para deletar o produto do banco
    const consulta = `DELETE FROM produto WHERE id = $1 RETURNING *`;
    const resultado = await pool.query(consulta, [id]);

    if (resultado.rows.length === 0) { // Caso o produto não seja encontrado
      return resposta.status(404).json({ msg: "Produto não encontrado" });
    }

    resposta.status(200).json({ msg: "Produto deletado com sucesso" }); // Mensagem de sucesso
  } catch (error) {
    resposta.status(500).json({ msg: "Erro ao deletar produto" }); // Tratamento de erro interno
  }
});

// Rota para deletar todos os produtos
app.delete('/produtos', async (requisicao, resposta) => {
  try {
    const consulta = `DELETE FROM produto`; // Comando SQL para deletar todos os produtos
    await pool.query(consulta); // Executa a operação no banco de dados

    resposta.status(200).json({ msg: "Todos os produtos foram deletados" }); // Mensagem de sucesso
  } catch (error) {
    resposta.status(500).json({ msg: "Erro ao deletar produtos" }); // Tratamento de erro interno
  }
});



// Inicia o servidor Express na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
