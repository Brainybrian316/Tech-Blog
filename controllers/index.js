// Modules
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');

//  The path we want to use the apiRoutes, homeRoutes, and dashboardRoutes example: www.example.com/api/dashboard 
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;