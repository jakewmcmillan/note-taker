const { response } = require('express');
const express = require('express');
const { request } = require('http');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const notes = require('./db/db.json');

function addNote(body, notesArray) {
    const note = body;
    notesArray.push (note)
    return(note)
}

app.get('/api/notes', (req, res) => {
    res.json(notes);
    // res.send(notes);
})

app.post('/api/notes', (req, res) => {
    console.log(request.body);
    const notes = addNote(req.body, notes)
})

app.listen(PORT, () => {
    console.log(`Hello ${PORT}`);
})