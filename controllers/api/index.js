// Modules
const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentsRoutes = require('./comments-routes');

// use the routes specified in the user-routes.js file
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentsRoutes);

modules.exports = router;