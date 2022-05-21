//  modules that we require
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

//  the class that grabs the sequelize model methods
class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // // \d is short hand for digit...this validates that the password has Minimum eight characters, at least one letter, one number and one special character:
            // is: ["^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"]
            is: ["^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"]
        }
    }
},
    {
        // adding our database connection to our model... this is ES6 shorthand for sequelize: sequelize 
        sequelize,
        freezeTableName: true,
        underscored: true,
        hooks: {
            beforeCreate: async (userData) => {
                userData.password = await bcrypt.hash(userData.password, 10)
                return userData;
            },
            beforeUpdate: async (userData) => {
                userData.password = await bcrypt.hash(userData.password, 10)
                return userData;
            }
        }
    }
)

module.exports = User;