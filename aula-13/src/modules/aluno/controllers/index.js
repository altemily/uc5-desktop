const AlunoModel = require('../models/index');

class AlunoController {
    static async criar(requisicao, resposta) {
        try {
            const { matricula, nome, email, senha } = requisicao.body;
            if (!matricula || !nome || !email || !senha) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos." });
            }
            const novoAluno = await AlunoModel.criar(matricula, nome, email, senha);
            resposta.status(201).json({ mensagem: "Aluno criado com sucesso", aluno: novoAluno });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar o aluno!", erro: error.message });
        }
    }

    static async editar(requisicao, resposta) {
        try {
            const matricula = requisicao.params.matricula;
            const { nome, email, senha } = requisicao.body;
            if (!nome || !email ||!senha) {
                return resposta.status(400).json({ mensagem: "Pelo menos um campo deve ser atualizado." });
            }
            const alunoAtualizado = await AlunoModel.editar(matricula, nome, email, senha);
            if (alunoAtualizado.length === 0) {
                return resposta.status(400).json({ mensagem: "Aluno não encontrado." });
            }
            resposta.status(200).json({ mensagem: "Aluno atualizado com sucesso", aluno: alunoAtualizado });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao editar aluno.", erro: error.message });
        }
    }

    static async listar(requisicao, resposta) {
        try {
            const alunos = await AlunoModel.listar();
            if (alunos.length === 0) {
                return resposta.status(400).json({ mensagem: "Não existem alunos cadastrados." });
            }
            resposta.status(200).json(alunos);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar alunos.", erro: error.message });
        }
    }

    static async listarPorMatricula(requisicao, resposta) {
        try {
            const matricula = requisicao.params.matricula;
            const aluno = await AlunoModel.listarPorMatricula(matricula);
            if (aluno.length === 0) {
                return resposta.status(400).json({ mensagem: "Aluno não encontrado." });
            }
            resposta.status(200).json(aluno);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao buscar aluno.", erro: error.message });
        }
    }

    static async excluirPorMatricula(requisicao, resposta) {
        try {
            const matricula = requisicao.params.matricula;
            const alunoExcluido = await AlunoModel.listarPorMatricula(matricula);
            if (!alunoExcluido) {
                return resposta.status(400).json({ mensagem: "Aluno não encontrado." });
            }
            await AlunoModel.excluirPorMatricula(matricula)
            resposta.status(200).json({ mensagem: "Aluno excluído com sucesso." });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir aluno.", erro: error.message });
        }
    }

    static async excluirTodos(requisicao, resposta) {
        try {
            await AlunoModel.excluirTodos();
            resposta.status(200).json({ mensagem: "Todos os alunos foram excluídos com sucesso." });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir todos os alunos.", erro: error.message });
        }
    }
}

module.exports = AlunoController;
