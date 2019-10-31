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
    // use joi to validate the reqeust body object and compare to the schema we set up
    const { error } = validateFighter(req.body);
    //input validation 
    if (error) {
        res.status(400).send(error.details[0].message);
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

//PUT method to update db resource
app.put('/api/fighters/:id', (req, res) => {
    //look up the fighter
    const fighter = fighters.find(f => f.id === parseInt(req.params.id))
    // if fighter doesn't exist, return 404
    if(!fighter){
        res.status(404).send('The fighter with the given ID was not found');
    }


    // validate
    const { error } = validateFighter(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // update fighter
    fighter.name = req.body.name;
    //return the updated fighter
    res.send(fighter);
})

// function to validate
function validateFighter(fighter){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(fighter, schema);
}


//PORT
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Listening on port ${port}`) });