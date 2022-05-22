// Modules
const router = require('express').Router();
const { User, Post, Comments } = require('../../models');
const sequelize = require('../../config/connection');
// const withAuth = require('../../utils/auth');

//! CREATE

//! READ
// GET all user posts
router.get('/', (req, res) => {
    // access the Post model and find all posts
    Post.findAll({
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        order: [['created_at', 'DESC']],
        // include the user and comments from the post
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comments,
                attributes: ['id', 'content', 'user_id', 'post_id', 'created_at' ],
                include: { 
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    // send the response
    .then(dbPostData => res.json(dbPostData))
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET one user post
router.get('/:id', (req, res) => {
    // access the Post model and find one post by id
    Post.findOne({
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        where: {
            id: req.params.id
        },
        // include the user and comments from the post
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comments,
                attributes: ['id', 'content', 'user_id', 'post_id', 'created_at' ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    // send the response
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
        })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//! UPDATE

//! DELETE

module. exports = router;