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
    attributes: {  exclude: ['password'] },
    // order the users by created_at (newest first)
    order: [['created_at', 'DESC']],
    // include the posts from the user
    include: [{
        model: Post,
        attributes: ['title', 'post_content', 'created_at'],
        // include the user from the post
        
    },
    {
        model: Comments,
        attributes: [ 'content', 'created_at' ],
        // include the user from the comment
    }
]
})
// send the response
.then(dbUserData => res.json(dbUserData))
// catch any errors
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

// GET one user
router.get('/:id', (req, res) => {
    // access the User model and find one user by id
    User.findOne({
        // exclude the password from the response
        attributes: { exclude: ['password'] },
        // find the user by id
        where: {
            id: req.params.id
        },
        // include the posts and comments from the user
        include: [
            {
                model: Post,
                attributes: [ 'title', 'post_content', 'created_at'],
            },
            {
                model: Comments,
                attributes: [ 'content', 'created_at'],
            }
        ]
    })
    // send the response
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
        })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//! READ

//! UPDATE

//! DELETE

module.exports = router;