const { pool } = require('../../../config/database');

class professorModel {
    static async criar(matricula, nome, email, senha) {
        const dados = [matricula, nome, email, senha];
        const consulta = `INSERT INTO professor(matricula, nome, email, senha) VALUES ($1, $2, $3, $4) RETURNING *`;
        const novoProfessor = await pool.query(consulta, dados);
        return novoProfessor.rows;
    }

    static async editar(matricula, nome, email, senha) {
        const dados = [matricula, nome, email, senha];
        const consulta = `UPDATE professor SET nome = $2, email = $3, senha = $4 WHERE matricula = $1 RETURNING *`;
        const professorAtualizado = await pool.query(consulta, dados);
        return professorAtualizado.rows;
    }

    static async listar() {
        const consulta = `SELECT * FROM professor`;
        const professores = await pool.query(consulta);
        return professores.rows;
    }

    static async listarPorID(matricula) {
        const dados = [matricula];
        const consulta = `SELECT * FROM professor WHERE matricula = $1`;
        const professor = await pool.query(consulta, dados);
        return professor.rows;
    }

    static async excluirPorID(matricula) {
        const dados = [matricula];
        const consulta = `DELETE FROM professor WHERE matricula = $1 RETURNING *`;
        const professorExcluido = await pool.query(consulta, dados);
        return professorExcluido.rows;
    }

    static async excluirTodos() {
        const consulta = `DELETE FROM professor`;
        await pool.query(consulta);
    }
}

module.exports = professorModel;
