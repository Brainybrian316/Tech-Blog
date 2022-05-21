//  Module
const { User } = require('../models/user');

// variable to hold all the users
const userData = [
    // expects key value pairs (username, password, email, first_name, last_name)
    {
        // username = the username of the user they create in the sign up form
        username: 'john_doe',
        // email = the email of the user they create in the sign up form
        email: 'johndoe@tmail.com',
        //  password = the password of the user they create in the sign up form
        password: 'password1'
    },
    {
        username: 'sally_smith',
        email: 'sallysmith@tmail.com',
        password: 'password2'
    },
    {
        username: 'spongebob',
        email: 'spongebob@tmail.com',
        password: 'password3'
    }
]

// function to seed the users table with the data in the userData array
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;