const Joi = require('joi');
const express = require('express');
const app = express();

// JSON middleware
app.use(express.json());

const fighters = [
    { id:1, name: 'Darren Till'},
    { id:2, name: 'Henry Cejudo'},
    { id:3, name: 'Fabricio Werdum'}
]

app.get('/', (req, res) => {
    res.send('Welcome to Sean\'s fighter api');
});

app.get('/api/fighters', (req, res) => {
    res.send(fighters);
});

app.get('/api/fighters/:id', (req, res) => {
    const fighter = fighters.find(f => f.id === parseInt(req.params.id))
    if(!fighter){
        res.status(404).send('The fighter with the given ID was not found');
    }
    res.send(fighter);
});

// POST method
app.post('/api/fighters', (req, res) => {
    // set schema
    const schema = {
        name: Joi.string().min(3).required()
    };

    // use joi to validate the reqeust body object and compare to the schema we set up
    const result = Joi.validate(req.body, schema);
    console.log(result);

    //input validation 
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        //kick out of the post
        return;
    }

    const fighter = {
        id: fighters.length + 1, //increase the id value by 1. usually taken care of by database
        name: req.body.name  // use the name in the request body to assign
    };
    fighters.push(fighter); // push the fighter into the array of data
    res.send(fighter); // send the fighter data back to the user
});

//PORT
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Listening on port ${port}`) });