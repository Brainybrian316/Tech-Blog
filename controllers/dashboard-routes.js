// Modules
const router = require('express').Router();
const { Post, User, Comments } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// GET /api/dashboard - get all posts for logged in user
router.get('/', withAuth, (req, res) => {
    // get all posts for logged in user
    Post.findAll({
        // we are using the user id to find all posts for that user
        where: {
            user_id: req.session.user_id
        },
        // the attributes are the columns we want to return
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        // the include is to include the comments for each post and the user who created the post
        include: [
            {
                // the model is the table we want to include
                model: User,
                // the attributes are the columns we want to return for the user
                attributes: [ 'username' ]
            },
            {
                // the model is the table we want to include
                model: Comments,
                // the attributes are the columns we want to return for the comments
                attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at'],
                // the include is to include the user who created the comment
                include: {
                    // the model is the table we want to include to display the username of the user who created the comment
                    model: User,
                    // the attributes are the columns we want to return for the user
                    attributes: [ 'username' ]
                }
            }
        ]
    }) 
    .then(dbPostData => { // dbPostData is an array of objects
        //  serialize data for front-end
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // we are going to render the dashboard.handlebars file and pass in the posts variable
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => { // if there is an error
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/dashboard/:id - get one post for logged in user to edit
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({ // find one post by id
        where: {
            id: req.params.id
        },
        // the attributes are the columns we want to return for the post we are looking for based on the user id
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        include: [
            {
                // the model is the table we want to include to display the username of the user who created the post
                model: User,
                // the attributes are the columns we want to return for the user
                attributes: [ 'username' ]
            },
            {
                // the model is the table we want to include
                model: Comments,
                // the attributes are the columns we want to return for the comments
                attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at'],
                include: {
                    // the model is the table we want to include to display the username of the user who created the comment
                    model: User,
                    // the attributes are the columns we want to return for the user
                    attributes: [ 'username' ]
        }
            },
        ]
    })
    .then(dbPostData => { // dbPostData is an object
        if (!dbPostData) { // if there is no post with that id we will send a 404
            res.status(404).json({ message: 'No post found with this id' });
            // this will stop the code from running and return the message
            return;
        }
        // serialize data for front-end
        const post = dbPostData.get({ plain: true });
        // we are going to render the edit.handlebars file and pass in the post variable
        res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => { // if there is an error
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/create/ - create a new post
router.get('/create', (req, res) => { // this is the route to create a new post
    Post.findAll({ // find all posts for logged in user
        where: { 
            // we are using the user id to find all posts for that user the session is the current user logged in
            user_id: req.session.user_id
        },
        // the attributes are the columns we want to return for the post we are looking for based on the user id
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        include: [
            {
                // the model is the table we want to include to display the username of the user who created the post
                model: User,
                // the attributes are the columns we want to return for the user in this case the username
                attributes: [ 'username' ]
            },
            {
                // the model is the table we want to include
                model: Comments,
                // the attributes are the columns we want to return for the comments
                attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at'],
                include: {
                    // the model is the table we want to include 
                    model: User,
                    // the attributes are the columns we want to return for the user in this case the username of the user who created the comment
                    attributes: [ 'username' ]
                }
            }
        ]
    })
    .then(dbPostData => { // dbPostData is an array of objects
        //  serialize data for front-end 
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // we are going to render the create.handlebars file and pass in the posts variable
        res.render('create-post', { posts, loggedIn: true });
    })
    .catch(err => { // if there is an error
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

