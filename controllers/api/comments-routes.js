// modules 
const router = require('express').Router();
const { User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//! CREATE
// POST a new comment
router.post('/', withAuth, (req, res) => { // withAuth is a middleware function checking the session before proceeding
    //  access the Comments model and create a new comment if the user is logged in
    if (req.session) {
    Comments.create({ // create a new comment based on the user id, post id and the content.
        content: req.body.content,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    // send the response
    .then(dbCommentData => res.json(dbCommentData))
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    }
});

//! READ
// GET all user comments
router.get('/', (req, res) => {
    // access the Comments model and find all comments
    Comments.findAll({
        // the attributes are the columns we want to return for the comments
        attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at' ],
        //  the order is to order the comments by created_at in descending order
        order: [['created_at', 'DESC']],
        // include the user of the comment
        include: {
            // the model is the table we want to include
            model: User,
            // the attributes are the columns we want to return for the user of the comment
            attributes: ['username']
        }
    })
    // send the response
    .then(dbCommentData => res.json(dbCommentData))
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET one user comment
router.get('/:id', (req, res) => {
    //  access the Comments model and find one comment by id
    Comments.findOne({
        // the attributes are the columns we want to return for the comment 
        attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at' ],
        where: {
            // the id is the id of the comment we are looking for
            id: req.params.id
        },
        // include the user and post from the comment
        include: [
            {
                // the model is the table we want to include
                model: User,
                // the attributes are the columns we want to return for the user of the comment
                attributes: ['username']
            }
        ]
    })
    // send the response
    .then(dbCommentData => {
        // if the comment is not found we will send a 404
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        // if the comment is found we will send the comment
        res.json(dbCommentData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//! UPDATE
// PUT update a comment
router.put('/:id', withAuth, (req, res) => {
    // access the Comments model and update a comment by id
    Comments.update({
        // the content is the new content of the comment
        content: req.body.content
    }, {
        // the where is the id of the comment we want to update
        where: {
            // the id is the id of the comment we are looking for
            id: req.params.id
        }
    })
    // send the response
    .then(dbCommentData => {
        // if the comment is not found we will send a 404
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        // if the comment is found we will send the updated comment
        res.json(dbCommentData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//! DELETE
// DELETE delete a comment by id
router.delete('/:id', withAuth, (req, res) => {
    //  access the Comments model and delete a comment by id
    Comments.destroy({
        // the where is the id of the comment we want to delete
        where: {
            // the id is the id of the comment we are looking for
            id: req.params.id
        }
    })
    // send the response
    .then(dbCommentData => {
        // if the comment is not found we will send a 404
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        // if the comment is found we will send the deleted comment
        res.json(dbCommentData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;