const sequelize = require ('../../../config/configDB');
const { DataTypes } = require('sequelize');


const SecretarioModel = sequelize.define('SecretarioModel',{
      matricula: {
        type: DataTypes.CHAR(5),
        primaryKey: true,
        validate:{
          is:{
              args: /^[A-Za-z]\d{4}$/,
              msg: 'A matrícula deve começar com uma letra (A-Z ou a-z) seguida de exatamente 4 números.'
          }
        }
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
          isAlpha: {
            msg: 'É permitido apenas letras!' 
          }
          
        }
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            args: /^[A-Za-z0-9._%+-]+@rn\.senac\.br$/,
            msg: 'Email inválido! O email deve pertencer ao domínio @rn.senac.br' 
          }
        }
     },
      senha: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            len: {
              args: [8, 12],
              msg: 'A senha deve ter no mínimo 8 caracteres e no máximo 12 caracteres.'
            },
            is: {
              args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              msg: 'Senha inválida. Ela deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial (como @, $, !, % ou &).'
            }
        }
    }

  },
  {
    tableName: 'secretario',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  }
);


module.exports = SecretarioModel;