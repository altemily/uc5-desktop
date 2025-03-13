const AlunoModel = require('../models/index');


class AlunoController{

    static async criar(requisicao, resposta){
        try {
            const { matricula, nome, email, senha } = requisicao.body
            if(!matricula || !nome || !email || !senha ){
             return resposta.status(400).json({mensagem: "Todos os campos devem ser preenchidos."})
            }
            const novoAluno = await AlunoModel.criar (matricula, nome, email, senha)
            resposta.status(201).json({mensagem: "Aluno criado com sucesso", aluno: novoAluno})
        } catch (error) {
            resposta.status(500).json({mensagem:"Erro ao criar o aluno!", erro: error.mensage})
        }
    }

    static async editar(requisicao, resposta){

    }

    static async listar(requisicao, resposta){
            try {
              const alunos = await AlunoModel.listar()
              if (alunos.length === 0){
               return resposta.status(400).json({mensagem: "Não existem alunos cadastrados."});
              }
              resposta.status(200).json(alunos);
            } catch (error) {
              resposta.status(500).json({ mensagem: "Erro ao listar alunos.", erro: error.message });
            }

    }

    static async listarPorID(requisicao, resposta){
        try {
            const matricula = requisicao.params.id
            const aluno = await AlunoModel.listarPorID(matricula)
            if(!aluno){
                return resposta.status(400).json({mensagem: "Aluno não encontrado."})
            }
            resposta.status(200).json(aluno);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao buscar aluno.", erro: error.message });
        }
    }

    static async excluirPorID(requisicao, resposta){

    }

    static async excluirTodos(requisicao, resposta){

    }
}


module.exports = AlunoController