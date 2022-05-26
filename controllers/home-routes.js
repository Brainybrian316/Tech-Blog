// modules required for routing
const router = require('express').Router();
const { Post, User, Comments } = require('../models');
const sequelize = require('../config/connection');


// GET signup page
router.get('/signup', (req, res) => {   // we are checking if the user is logged in
    if (req.session.loggedIn) { 
    // if the user is logged in redirect them to the dashboard
      res.redirect('/');
      return;
    }
    // render the signup.handlebars file if the user is not logged in
    res.render('signup');
  });

// GET login page
router.get('/login', (req, res) => {  // we are checking if the user is logged in
    if (req.session.loggedIn) {
    // if the user is logged in redirect them to the dashboard
      res.redirect('/');
      return;
    }
    // render the login.handlebars file if the user is not logged in
    res.render('login');
  });

// GET /api/home - get all posts for logged in user
router.get('/', (req, res) => { 
    Post.findAll({
        //  loads all posts for the user logged in with the attributes being the columns we want to return
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        include: [
            {
                // the model is the table we want to include
                model: User,
                // the attributes are the columns we want to return for the user in the post
                attributes: [ 'username' ]
            },
            {
                // the model is the table we want to include
                model: Comments,
                // the attributes are the columns we want to return for the comments in the post
                attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at'],
                include: {
                    // the model is the table we want to include
                    model: User,
                    // the attributes are the columns we want to return for the user who created the comment
                    attributes: [ 'username' ]
        }
            },
        ]
    })
    .then(dbPostData => { // dbPostData is an array of objects
        //  serialize data for front-end
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // we are going to render the home.handlebars file and pass in the posts variable
        res.render('homepage', { posts, loggedIn: req.session.loggedIn
          });
    })
    .catch(err => { // if there is an error
        console.log(err);
        res.status(500).json(err);
    });
});

//  GET single post for logged in user to edit or post new post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        // find one post by id
        where: {
            id: req.params.id
        },
        // the attributes are the columns we want to return for the post we are looking for based on the user id
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        include: [
            {
                // the model is the table we want to include 
                model: User,
                // the attributes are the columns we want to return for the user who created the post
                attributes: [ 'username' ]
            },
            {
                // the model is the table we want to include
                model: Comments,
                // the attributes are the columns we want to return for the comments in the post
                attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at'],
                include: {
                    // the model is the table we want to include
                    model: User,
                    // the attributes are the columns we want to return for the user who created the comment
                    attributes: [ 'username' ]
                }
        }
        ]
    })
    .then(dbPostData => { // dbPostData is an object
        if (!dbPostData) { // if there is no post with that id we display an error
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // serialize data for front-end if there is a post with that id
        const post = dbPostData.get({ plain: true });
        // we are going to render the post.handlebars file and pass in the post variable
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => { // if there is an error
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
