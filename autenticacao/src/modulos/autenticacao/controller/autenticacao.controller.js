const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config;
const Aluno = require('../../aluno/models/aluno.model');

const tempo_acess_token = process.env.TEMPO_ACESS_TOKEN;
const tempo_refresh_token = process.env.TEMPO_REFRESH_TOKEN;

class AutenticacaoController{

    static gerarTokenAcesso(dadosAluno){
        return jwt.sign(dadosAluno, process.env.SECRET_KEY, {
            expiresIn: tempo_acess_token
        });
    };
    static gerarRefressToken(dadosAluno){
        return jwt.sign(dadosAluno, process.env.SECRET_KEY, {
            expiresIn: tempo_refresh_token
        });
    };
    static async login(req, res){
      const { matricula, senha } = req.body
        return res.status(400).json({msg: 'É necessario informar e-mail e senha para login'})
    }
        // const usuario = await Aluno.findOne({
        //     where: {email}
        // });
  }
