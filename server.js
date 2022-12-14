// const { response } = require('express');
const express = require('express');
// const { request } = require('http');
const path = require('path');
const fs = require('fs');
const util = require('util');

const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// const notes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.errorr(err);
        }else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} noted`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} noted`);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            note_id: uuid(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully!');
    } else {
        res.error('Note not added');
    }
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} noted`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        readAndAppend(newNote, './db/db.json');

        const response = {
            satus: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Note not added');
    }
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})

// function addNote(body, notesArray) {
//     const note = body;
//     notesArray.push (note)
//     return(note)
// }

// app.get('/api/notes', (req, res) => {
//     res.json(notes);
//     // res.send(notes);
// })

// app.post('/api/notes', (req, res) => {
//     console.log(request.body);
//     const notes = addNote(req.body, notes)
// })