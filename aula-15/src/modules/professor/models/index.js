const {DataTypes} = require('sequelize');
const sequelize = require('../../../config/configDB')

const Professor = sequelize.define('Professor', {
    matricula: {
        type: DataTypes.CHAR(8),
        primaryKey: true,
        validate:{
            is: {
                args: /^[A-Za-z][0-9]{7}$/,
                msg: 'A matrícula deve começar com uma letra e ter mais sete números.'
            }
        }
    },

    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [100]
            }
        }
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Forneça um email válido!'
            }
        }
    },

    senha: {
        type: DataTypes.CHAR(10),
        allowNull: false,  
        validate: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{10}$/,
            msg: 'A senha deve conter exatamente 10 caracteres e incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'                                   
        }
    }


})

module.exports = Professor