
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var db;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

require('./app/routes/note.routes.js')(app);
// define a simple route
app.get('/', (req, res) => {
  db.collection('notes').find().toArray((err, result) => {
    if (err) return console.log(err)

    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})


app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});






