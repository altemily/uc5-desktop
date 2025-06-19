const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configBD');

const Aluno = sequelize.define(
  'Aluno',
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        is:{
          args: /^[A-Za-z]\d{8}$/,
          msg: 'A matrícula deve iniciar com uma letra e ter 8 números.',
        }
      }
    },
    email: {
      type: DataTypes. STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email inválido."}
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          msg: 'Sua senha deve ter ao menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.'
        }
      }

    },
  },
    {
      modelName: 'aluno',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
    }

) 


module.exports = Aluno;