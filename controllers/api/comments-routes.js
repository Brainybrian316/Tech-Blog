// modules 
const router = require('express').Router();
const express = require('express');
const { User, Post, Comments } = require('../../models');
// const withAuth = require('../../utils/auth');

//! CREATE
// GET all user comments
router.get('/', (req, res) => {
    // access the Comments model and find all comments
    Comments.findAll({
        attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at' ],
        order: [['created_at', 'DESC']],
        // include the user of the comment
        include: {
            model: User,
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
        attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at' ],
        where: {
            id: req.params.id
        },
        // include the user and post from the comment
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    // send the response
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
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