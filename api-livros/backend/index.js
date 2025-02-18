const express = require('express');
const dotenv = require('dotenv');
const app = express();
const livros = require('../backend/livros');

// Configurando o dotenv
dotenv.config();

// Definindo a porta do servidor
const port = process.env.PORTA;

// Middleware para interpretar JSON
app.use(express.json());

// Rota para a raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Livros!');
});

// Endpoint GET 
app.get('/livros', (req, res) => {
    res.json(livros);
});

// Endpoint POST
app.post('/livros', (req, res) => {
const { id, titulo, autor, anoPublicacao, genero, sinopse } = req.body;
    
// Verifica se os campos obrigatórios estão preenchidos
if (!id || !titulo || !autor || !anoPublicacao || !genero || !sinopse) {
 return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
}
    
// Adiciona o novo livro ao array
livros.push({ id, titulo, autor, anoPublicacao, genero, sinopse });
res.status(201).json({ mensagem: 'Livro cadastrado com sucesso!' });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
