require('dotenv').config();
const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const {PORT} = process.env;

const courses = [
    {id: 1, name: 'coarse1'},
    {id: 2, name: 'coarse1'},
    {id: 3, name: 'coarse1'},
];

const validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

/* 
    HTTP GET REQUESTS 
*/

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

//Using params: returns the id provided
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The coarse with the given Id was not found');

    res.send(course);
})

/*
    HTTP POST REQUESTS
*/

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body)
    
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);

})

/* 
    HTTP PUT REQUESTS 
*/

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) return res.status(404).send('The coarse with the given Id was not found');    

    //Validate
    //If invalid, return 400 - Bad request
    const {error} = validateCourse(req.body)
    
    if(error) return res.status(400).send(error.details[0].message);


    //Update course
    //Return the updated course obj
    course.name = req.body.name;
    res.send(course);
})

/*
    HTTP DELETE REQUESTS
*/

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found");

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

//Using query strings
//Example localhost:3001/api/posts/2/2?sortBy=name
/*
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
})
*/

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});