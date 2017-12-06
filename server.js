
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const session      = require('express-session');
var port     = process.env.PORT || 3000;
var db;

app.set('views', __dirname + "/app/views")
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url);

require('./config/passport')(passport); // pass passport for configuration


mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

app.use(session({ secret: 'charlie' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/routes.js')(app, passport);

app.listen(port);
    console.log("Server is listening to deez nuts on port" + port);






