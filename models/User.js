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
    email: {
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
        validate: 
            // // \d is short hand for digit...this validates that the password has Minimum eight characters, at least one letter, one number and one special character:
            // is: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        {
            validatePassword: function(password) {
                if(!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
                    throw new Error('Password must be at least 8 characters, contain at least 1 letter, 1 number, and 1 special character');
                }
            }
        }
    },
}, {
    hooks: {
       async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10)
            return newUserData;
        },
        async beforeUpdate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10)
            return newUserData;
        }
    },
    // adding our database connection to our model... this is ES6 shorthand for sequelize: sequelize 
    sequelize,
    freezeTableName: true,
    underscored: true,
});

module.exports = User;