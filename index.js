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

const courses = [
    {id: 1, name: 'coarse1'},
    {id: 2, name: 'coarse1'},
    {id: 3, name: 'coarse1'},
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

//Using params: returns the id provided
app.get('/api/courses/:id', (req, res) => {
    const coarse = courses.find(c => c.id === parseInt(req.params.id));
    if(!coarse) {
        res.status(404).send('The coarse with the given Id was not found');
    }
    else res.send(coarse);
})

//Using query strings
//Example localhost:3001/api/posts/2/2?sortBy=name
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
})

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});