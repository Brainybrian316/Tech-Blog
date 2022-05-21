// Modules
const router = require('express').Router()
const { User, Post, Comments } = require('../../models');
//! middleware to set up later
// const withAuth = require('../../utils/auth');

//! CREATE
// GET all users
router.get('/', (req, res) => {
// access the User model and find all users
User.findAll({
    // exclude the password from the response
    attributes: {  exclude: ['password'] }
})
// send the response
.then(dbUserData => res.json(dbUserData))
// catch any errors
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

//! READ

//! UPDATE

//! DELETE

module.exports = router;