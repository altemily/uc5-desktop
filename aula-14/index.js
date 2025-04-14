const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./src/config/configDB')
//const alunoRoutes = require('./src/modules/aluno/routes/index')
//const enderecoRoutes = require('./src/modules/endereco/routes/index')
dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());

//app.use(alunoRoutes);
//app.use(enderecoRoutes);



app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem sucedida!');
  } catch (error) {
    console.error('A conexão com o banco falhou:', error);
  }
    console.log(`Servidor rodando em http://localhost:${port}`);
  });