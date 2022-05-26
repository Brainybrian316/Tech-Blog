// Modules
const router = require('express').Router()
const { User, Post, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//! CREATE
//  POST create a new user
router.post('/', (req, res) => {
    // access the User model and create a new user
    User.create({
        // the username is the username of the user
        username: req.body.username,
        // the email is the email of the user  (this is the email we will use to log in)
        email: req.body.email,
        // the password is the password of the user
        password: req.body.password
    })
    // send the response
    .then(dbUserData => {
        // save the session before sending the response
        req.session.save(() => {
            // set the session user_id to the user id of the user we just created
        req.session.user_id = dbUserData.id;
        // set the session username to the username of the user we just created
        req.session.username = dbUserData.username;
        // the purpose of session.loggedIn is to check if the user is logged in or not
        req.session.loggedIn = true;
        // send the response with the user data
        res.json(dbUserData);
        })
    })
        .catch(err => { // catch any errors
            console.log(err);
            res.status(500).json(err);
        });
});
       
    // ability to login
    router.post('/login', (req, res) => {
        // access the User model and find the user with the email we are trying to log in with
        User.findOne({
          where: {
            // the email is the email we are trying to log in with
            email: req.body.email
          }
        }).then(dbUserData => {
            // if the user is not found we send an error
          if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
          }
        // this variable is to check if the password is correct
          const validPassword = dbUserData.checkPassword(req.body.password);
        // if the password is incorrect we send an error
          if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
          }
            // set up session if the password is correct
            req.session.save(() => {
                // set the session user_id to the user id of the user who is logging in
                req.session.user_id = dbUserData.id;
                // set the session username to the username of the user who is logging in
                req.session.username = dbUserData.username;
                // the purpose of session.loggedIn is to check if the user is logged in or not
                req.session.loggedIn = true;
                // send the response with the user data
        res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

    // ability to logout 
    router.post('/logout', (req, res) => {
        // if the user is logged in they have the ability to logout
        if (req.session.loggedIn) {
            // destroy the session
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            // if the user is not logged in they cannot logout and will receive an error (the logout button will not show)
            res.status(404).end();
        }
    });

//! READ
// GET all users
router.get('/', (req, res) => {
    // access the User model and find all users
    User.findAll({
        // exclude the password from the response
        attributes: {  exclude: ['password'] },
        // include the posts from the user
        include: [{
            model: Post,
            //  attributes sre the attributes we want to include in the response from the post table
            attributes: ['title', 'post_content', 'created_at'],
        },
        {
            // include the comments from the user
            model: Comments,
            // attributes sre the attributes we want to include in the response from the comments table
            attributes: [ 'content', 'created_at' ],
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
                    // the model is the post table
                    model: Post,
                    // attributes are the attributes we want to include in the response from the post table
                    attributes: [ 'title', 'post_content', 'created_at'],
                },
                {
                    // the model is the comments table
                    model: Comments,
                    // attributes are the attributes we want to include in the response from the comments table
                    attributes: [ 'content', 'created_at'],
                }
            ]
        })
        // send the response
        .then(dbUserData => {
            // if the user is not found we send an error
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            // send the response with the user data if the user is found
            res.json(dbUserData);
            })
        // catch any errors
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    });

//! UPDATE
//  PUT update a user
router.put('/:id', (req, res) => {
    // access the User model and update a user
    User.update(req.body, {
        // the purpose of individualhooks is to check if the user is trying to update their own account
        individualHooks: true,
        where: {
            // the id is the id of the user we are trying to update
            id: req.params.id
        }
    })
    // send the response
    .then(dbUserData => {
        // if the user is not found we send an error
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        // send the response with the user data if the user is found
        res.json(dbUserData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//! DELETE
// DELETE delete a user by id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            // the id is the id of the user we are trying to delete
            id: req.params.id
        }
    })
    // send the response
    .then(dbUserData => {
        // if the user is not found we send an error
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        // send the response with the user data if the user is found and the user is deleted
        res.json(dbUserData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;