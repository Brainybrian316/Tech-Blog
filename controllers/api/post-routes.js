// Modules
const router = require('express').Router();
const { User, Post, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//! CREATE
//  POST create a new post for a user
router.post('/', withAuth, (req, res) => {
    //  access the Post model and create a new post
    Post.create({
        // the title is the title of the post
        title: req.body.title,
        // the post_content is the content of the post
        post_content: req.body.post_content,
        // the user_id is the id of the user who created the post
        user_id: req.session.user_id
    })
    // send the response
    .then(dbPostData => res.json(dbPostData))
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//! READ
// GET all user posts
router.get('/', (req, res) => {
    // access the Post model and find all posts
    Post.findAll({
        // the attributes are the columns we want to return for the post
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        // the order is to order the posts by created_at in descending order
        order: [['created_at', 'DESC']],
        // include the user and comments from the post
        include: [
            {
                // the model is the table we want to include
                model: User,
                // the attributes are the columns we want to return for the user of the post
                attributes: ['username']
            },
            {
                // the model is the table we want to include
                model: Comments,
                // the attributes are the columns we want to return for the comments of the post
                attributes: ['id', 'content', 'user_id', 'post_id', 'created_at' ],
                include: { 
                    // the model is the table we want to include
                    model: User,
                    // the attributes are the columns we want to return for the user of the comment
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
        // the attributes are the columns we want to return for the post
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        where: {
            // the id is the id of the post we are looking for the user's id
            id: req.params.id
        },
        // include the user and comments from the post
        include: [
            {
                // the model is the table we want to include
                model: User,
                // the attributes are the columns we want to return for the user of the post
                attributes: ['username']
            },
            {
                // the model is the table we want to include
                model: Comments,
                // the attributes are the columns we want to return for the comments of the post
                attributes: ['id', 'content', 'user_id', 'post_id', 'created_at' ],
                include: {
                    // the model is the table we want to include
                    model: User,
                    // the attributes are the columns we want to return for the user of the comment
                    attributes: ['username']
                }
            }
        ]
    })
    // send the response
    .then(dbPostData => {
        // if the post is not found we will send a 404 status
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // if the post is found we will send the post
        res.json(dbPostData);
        })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//! UPDATE
// PUT update a post by id
router.put('/:id', withAuth, (req, res) => {
    //  access the Post model and update a post
    Post.update({
        // the title is the title of the post
        title: req.body.title,
        // the post_content is the content of the post
        post_content: req.body.post_content
    }, {
        // the where is the id of the post we are updating
        where: {
            // the id is the id of the post we are updating
            id: req.params.id
        }
    })
    // send the response
    .then(dbPostData => {
        // if the post is not found we will send a 404 status
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // if the post is found we will send the post
        res.json(dbPostData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//! DELETE
// delete a post by id
router.delete('/:id', withAuth, (req, res) => {
    // access the Post model and delete a post by id
    Post.destroy({
        // the where is the id of the post we are deleting
        where: {
            // the id is the id of the post we are deleting
            id: req.params.id
    }
    })
    // send the response
    .then(dbPostData => {
        // if the post is not found we will send a 404 status
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // if the post is found we will send the post to be deleted
        res.json(dbPostData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module. exports = router;