const Aluno = require('../models/AlunoModel');

class AlunoController {
  static async criar(req, res) {
    try {
      const { matricula, nome, email, senha, turma_id } = req.body;

      if (!matricula || !nome || !email || !senha || !turma_id) {
        return res.status(400).json({ mensagem: "Todos os campos devem ser preenchidos." });
      }

      const novoAluno = await Aluno.create({ matricula, nome, email, senha, turma_id });
      res.status(201).json({ mensagem: "Aluno criado com sucesso", aluno: novoAluno });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao criar o aluno!", erro: error.message });
    }
  }

  static async editar(req, res) {
    try {
      const { matricula } = req.params;
      const { nome, email, senha, turma_id } = req.body;

      if (!nome && !email && !senha && !turma_id) {
        return res.status(400).json({ mensagem: "Pelo menos um campo deve ser atualizado." });
      }

      const [linhasAfetadas] = await Aluno.update(
        { nome, email, senha, turma_id },
        { where: { matricula } }
      );

      if (linhasAfetadas === 0) {
        return res.status(404).json({ mensagem: "Aluno não encontrado." });
      }

      const alunoAtualizado = await Aluno.findOne({ where: { matricula } });
      res.status(200).json({ mensagem: "Aluno atualizado com sucesso", aluno: alunoAtualizado });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao editar aluno.", erro: error.message });
    }
  }

  static async listar(req, res) {
    try {
      const alunos = await Aluno.findAll();
      if (alunos.length === 0) {
        return res.status(404).json({ mensagem: "Não existem alunos cadastrados." });
      }
      res.status(200).json(alunos);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao listar alunos.", erro: error.message });
    }
  }

  static async listarPorMatricula(req, res) {
    try {
      const { matricula } = req.params;
      const aluno = await Aluno.findOne({ where: { matricula } });

      if (!aluno) {
        return res.status(404).json({ mensagem: "Aluno não encontrado." });
      }

      res.status(200).json(aluno);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar aluno.", erro: error.message });
    }
  }

  static async excluirPorMatricula(req, res) {
    try {
      const { matricula } = req.params;
      const deletado = await Aluno.destroy({ where: { matricula } });

      if (deletado === 0) {
        return res.status(404).json({ mensagem: "Aluno não encontrado." });
      }

      res.status(200).json({ mensagem: "Aluno excluído com sucesso." });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao excluir aluno.", erro: error.message });
    }
  }

  static async excluirTodos(req, res) {
    try {
      await Aluno.destroy({ where: {}, truncate: true });
      res.status(200).json({ mensagem: "Todos os alunos foram excluídos com sucesso." });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao excluir todos os alunos.", erro: error.message });
    }
  }
}

module.exports = AlunoController;
