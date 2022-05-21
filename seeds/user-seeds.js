const { User } = require('../models/user');

const userData = [

]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;