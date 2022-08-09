require('dotenv').config();
const express = require('express');

const app = express();
const {PORT} = process.env;

/*
app.get()
app.post()
app.put()
app.delete()
*/

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
})

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
})

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});