//  Modules are imported/exported
const express = require('express');
const routes = require('./controllers');
// const path = require('path');
// const session = require(express-session);
// const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

//  initial variables are declared for use in the server.js file
const app = express();
const PORT = process.env.PORT || 3001;

//  helper variables for handlebars
// const helpers = require('./utils/helpers');
// const hbs = exphbs.create({ helpers});

// Middleware
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

//  set up session with cookies and sequelize
// const sess = {
//     secret: 'Super secret secret',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// };

// // use session if deployed on Heroku or local and set up session with cookies and sequelize
// app.use(session(sess))
// use express.json to parse json
app.use(express.json());
// use express.urlencoded to parse urlencoded
app.use(express.urlencoded({ extended: true }));
// serve static files from public folder
// app.use(express.static(path.join(__dirname, 'public')));
// //  use handlebars
// app.engine('handlebars', hbs.engine);
// // set handlebars as the default engine
// app.set('view engine', 'handlebars');
// set up routes and controllers
app.use(routes);


// turn on  connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}/`));
})




