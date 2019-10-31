const express = require('express');
const app = express();

const fighters = [
    { id:1, name: 'Darren Till'},
    { id:2, name: 'Henry Cejudo'},
    { id:3, name: 'Fabricio Werdum'}
]

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/fighters', (req, res) => {
    res.send(fighters);
});

app.get('/api/fighters/:id', (req, res) => {
    const fighter = fighters.find(f => f.id === parseInt(req.params.id))
    if(!fighter){
        res.status(404).send('The fighter with the given ID was not found');
    }
    res.send(fighter)
});

//PORT
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Listening on port ${port}`) });