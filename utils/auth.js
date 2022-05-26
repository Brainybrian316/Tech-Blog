//  this will check if the user is logged in before running the "next" arrow function of the route
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
        return;
    } else {
        next();
    }
};

module.exports = withAuth;