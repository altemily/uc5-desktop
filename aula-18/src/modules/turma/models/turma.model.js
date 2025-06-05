const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDB');

const TurmaModel = sequelize.define('TurmaModel', {
  cod_turma: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    validate:{
        isNumeric:{
            msg: 'A matrícula deve começar com uma letra e ter quatro números em seguida.'
        },
        len:{
            args:[9],
            msg:'O código da turma deve ter 9 números'
        }
    }
  },
    cod_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
          isNumeric:{
              msg: 'O código do curso deve ser somente números!'
          },
          len:{
              args:[4],
              msg:'O código do curso deve ter 4 apenas números'
          },
      },
      references:{
          model: 'curso',
          key: 'cod_curso'
      }
  },
    turno:{
      type: DataTypes.STRING(100),
      allowNull: false, 
      validate:{
          isIn:{
              args:[['matutino', 'vespertino', 'noturno']],
              msg: 'Turno inválido!'
          }
      }
    },
}, 
{
  tableName: 'turma',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

module.exports = TurmaModel;

