module.exports = function(app) {
    app.set('views', 'app/views');;
    app.set('view engine', 'ejs');
    var notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.get('/', (req, res) => {
    // renders index.ejs
    res.render('index.ejs')
  })

    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}