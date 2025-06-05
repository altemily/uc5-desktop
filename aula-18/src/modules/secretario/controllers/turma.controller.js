const TurmaModel = require('../../turma/models/turma.model')

class TurmaController{
  static async criarTurma(req, res){
      try {
          const {cod_turma, cod_curso, turno} = req.body
          if(!cod_turma || !cod_curso || !turno){
              return res.status(400).json({msg: 'Todos os campos devem ser preenchidos!'})
          }
          const turma = await TurmaModel.create({cod_turma, cod_curso, turno})
          res.status(201).json({msg: 'Turma criada com sucesso!', turma: turma})
      } catch (error) {
          
      }
  }
  static async listarTodasTurmas(req, res){

  }
  static async listarTurmaPorCodigo(req, res){

  }
  static async editarTurmaPorCodigo(req, res){

  }
  static async deletarTodasTurmas(req, res){

  }
  static async deletarTurmaPorCodigo(req, res){

  }

}