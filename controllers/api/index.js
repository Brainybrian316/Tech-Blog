//  Modules
const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentsRoutes = require('./comments-routes');

// The path is the route we are going to use EX: www.website.com/api/users - this is the route we are going to use for the user routes... etc...
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;