const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/public/index.html');
});

app.get('/users', (req, res) => {
    res.send(`You're looking for users!`);
});

app.get("/download", (req, res) => {
    res.download(path.join(__dirname, "/test.txt"), "test.txt", err => {
        if (err) console.log(err);
    });
});

app.listen(port, () => {
    console.log(`My learning app is running on ${port}`);
});