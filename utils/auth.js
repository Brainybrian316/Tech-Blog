//  this will check if the user is logged in before running the "next" arrow function of the route
const withAuth = (req, res, next) => {
    // if the user is logged in
    if (!req.session.user_id) { // if the user is not logged in we redirect to the login page
        res.redirect('/login');
        return;
    } else {
        // if the user is logged in we run the next arrow function for the route
        next();
    }
};

module.exports = withAuth;