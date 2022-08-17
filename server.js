// const { response } = require('express');
const express = require('express');
// const { request } = require('http');
const path = require('path');
const fs = require('fs');
const util = require('util');

const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

const notes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

function addNote(body, notesArray) {
    const note = body;
    notesArray.push (note)
    return(note)
}

// app.get('/api/notes', (req, res) => {
//     res.json(notes);
//     // res.send(notes);
// })

app.post('/api/notes', (req, res) => {
    console.log(request.body);
    const notes = addNote(req.body, notes)
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})