const fs = require('fs');
const express = require('express');

const uuid = require('uuid');


const PORT = 5000;

const app = express();
app.use(express.json())
app.use(express.static("public"));

const readFile = function () {
    return JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
}

const writeFile = function (data, res) {
    fs.writeFileSync('./db/db.json', JSON.stringify(data), err => {
        if (err) return res.status(500).json({success: false});
    })
}

// Api routes
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.status(200).json(notes)
})

app.post('/api/notes', (req, res) => {
    const note = req.body;
    if (!note)
        return res.status(400).json({success: false})
    const notes = readFile();
    const previousNotes = [...notes]
    const id = uuid.v4();
    previousNotes.push({...note, id})
    writeFile(previousNotes, res);
    res.status(201).json(note);
})

app.get('/notes', (req, res) => {
    res.sendFile('./public/notes.html', {root: __dirname})
})

app.get('*', (req, res) => {
    res.sendFile('./public/index.html', {root: __dirname})
})

app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`)
});