const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDB');

const AlunoModel = sequelize.define('AlunoModel', {
  matricula: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    primaryKey: true,
    validate: {
      is: {
        args: /^[A-Za-z]\d{7}$/,
        msg: 'A matrícula deve começar com uma letra seguida de 7 números!'
      }
    }
  
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email:{
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
        validate:{
            is:{
                args: /^[A-Za-z0-9._%+-]+@edum\.rn\.senac\.br$/,
                msg: 'Forneça um email válido!'
            },
            len:{
                args:[10,60],
                msg: 'O email deve ter no mínimo 10 caracteres e no máximo 60!'
            }
        }
    },
    senha: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate:{
            len:{
                args:[10],
                msg: 'A senha deve ter 10 caracteres!'
            }
        }
    },
    turma_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'turma',
            key: 'turma_cod'
        }
    },
  },

  {
    tableName: 'aluno',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  },
);


module.exports = AlunoModel;
