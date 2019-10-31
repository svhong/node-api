const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/testing', (req, res) => {
    res.send([1, 2, 3, 4, 5]);
});

app.get('/api/testing/:id', (req, res) => {
    res.send(req.params.id);
})

//PORT
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Listening on port ${port}`) });