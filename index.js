const express = require('express');
const path = require('path');
const { title } = require('process');
const app = express();
const port = 3000;

app.set('view engine', 'pug');

// stringifies object, found on the internet
// https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format/11616993#11616993
JSON.safeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(
        obj,
        (key, value) =>
        typeof value === "object" && value !== null ?
        cache.includes(value) ?
        undefined // Duplicate reference found, discard key
        :
        cache.push(value) && value // Store value in our collection
        :
        value,
        indent
    );
    cache = null;
    return retVal;
};

// sets absolute path to public directory for static file use
app.use('/public', express.static(path.join(__dirname, 'public')));

// get http request for homepage, redirects to index.html
app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});

// app.get('/', (req, res) => {
//     const request = JSON.safeStringify(req);
//     console.log(`Request in for homepage: ${request}`);
//     res.redirect('/public/index.html');
// });

// get http request for /users page
app.get('/users', (req, res) => {
    const request = JSON.safeStringify(req);
    console.log(`Request in for user: ${request}`);
    res.redirect('/public/users.html');
});

// get http request for /download
app.get("/download", (req, res) => {
    const request = JSON.safeStringify(req);
    console.log(`Request in for download: ${request}`);
    res.download(path.join(__dirname, "/test.txt"), "test.txt", err => {
        if (err) console.log(err);
    });
});

// starts the server, listens for port 3000 and logs when ready 
app.listen(port, () => {
    console.log(`My learning app is running on ${port}`);
});