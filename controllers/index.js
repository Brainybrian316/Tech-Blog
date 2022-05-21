// Modules
const router = require('express').Router();
const apiRoutes = require('./api');

// use the routes specified in the user-routes.js file
router.use('/users', apiRoutes);

module.exports = router;