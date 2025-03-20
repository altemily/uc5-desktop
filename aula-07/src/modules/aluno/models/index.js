const { pool } = require('../../../config/database');


class AlunoModel{

    static async criar(matricula, nome, email, senha){
        const dados = [matricula, nome, email, senha]
        const consulta = `INSERT INTO aluno(matricula, nome, email, senha) VALUES ($1, $2, $3, $4) RETURNING * `
        const novoAluno = await pool.query(consulta, dados)
        return novoAluno.rows
    }

    static async editar(matricula, nome, email, senha){
        const dados = [matricula, nome, email, senha]
        const consulta = `UPDATE aluno SET nome = $2, email = $3, senha = $4 WHERE matricula = $1 RETURNING *`
        const alunoAtualizado = await pool.query(consulta, dados)
        return alunoAtualizado.rows
    }

    static async listar(){
        const consulta = `SELECT * FROM aluno`
        const alunos = await pool.query(consulta)
        return alunos.rows
    }

    static async listarPorMatricula(matricula){
        const dados = [matricula]
        const consulta = `SELECT * FROM aluno WHERE matricula = $1`
        const aluno = await pool.query(consulta, dados) 
        return aluno.rows
    }

    static async excluirPorMatricula(matricula){
        const dados = [matricula]
        const consulta = `DELETE FROM aluno WHERE matricula = $1`
        await pool.query(consulta, dados)
   
    }

    static async excluirTodos(){
        const consulta = `DELETE from aluno`
        await pool.query(consulta)
    }
}


module.exports = AlunoModel