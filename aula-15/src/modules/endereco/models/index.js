const axios = require('axios')
const { pool } = require('../../../config/database')


class EnderecoModel{
  
  static async criarEndereco(matricula, cep, numero, ponto_referencia){
    const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    // Desestruturação do objeto
    const {logradouro, complemento, bairro, localidade, uf} = resposta.data
    // const logradouro = resposta.data.logradouro
    // const complemento = resposta.data.complemento
    // const bairro = resposta.data.bairro
    // const localidade = resposta.data.localidade
    // const uf = resposta.data.uf

    const dados = [
      matricula, 
      cep, 
      logradouro, 
      numero, 
      complemento, 
      bairro, 
      localidade, 
      uf, 
      ponto_referencia
    ]

    const consulta = `INSERT INTO endereco(matricula, cep, logradouro, numero, complemento, bairro, localidade, uf, ponto_referencia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`

    const resultado = await pool.query(consulta, dados)
    return resultado.rows
  }

  static async editarEndereco(matricula, cep, numero, ponto_referencia){
    const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const { logradouro, complemento, bairro, localidade, uf } = resposta.data;
    const dados = [
      matricula, 
      cep, 
      logradouro, 
      numero, 
      complemento, 
      bairro, 
      localidade, 
      uf, 
      ponto_referencia
    ]

    const consulta = `UPDATE endereco 
                      SET cep = $2, logradouro = $3, numero = $4, complemento = $5, bairro = $6, localidade = $7, uf = $8, ponto_referencia = $9 
                      WHERE matricula = $1 RETURNING *`;
  
    
    const resultado = await pool.query(consulta, dados);
    return resultado.rows;

  }

  static async listarEnderecoCEP(cep){
    const dados = [cep]
    const consulta = `SELECT * FROM endereco WHERE cep = $1`
    const resultado = await pool.query(consulta, dados)
    return resultado.rows

  }

  static async listarEnderecoCidade(localidade){
    const dados = [`%${localidade}%`]
    const consulta = `SELECT * FROM endereco WHERE lower(localidade) like lower($1)`;
    const resultado = await pool.query(consulta, dados);
    return resultado.rows;
  }
  static async listarEnderecos(){
    const consulta = `SELECT * FROM endereco`;
    const resultado = await pool.query(consulta);
    return resultado.rows;
  }

  static async listarEndereco(matricula){
    const dados = [matricula]
    const consulta = 
    `SELECT aluno.*, endereco.* from aluno 
    JOIN endereco ON aluno.matricula = endereco.matricula
    WHERE aluno.matricula = $1`;
    const resultado = await pool.query(consulta, dados);
    return resultado.rows;
  }

}


module.exports = EnderecoModel;



