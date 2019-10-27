const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.write('This is the homepage requested');
        res.end();
    }
    
    if (req.url === '/api/testing'){
        res.write(JSON.stringify(['apples','oranges','bananas', 'strawberries']));
        res.end();
    }
})

// Server listening
server.listen(3000);
console.log('Lisenting on port 3000');