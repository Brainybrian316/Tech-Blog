const { User } = require('../models/user');

const userData = [
    {
        username: 'john_doe',
        email: 'johndoe@tmail.com',
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

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;