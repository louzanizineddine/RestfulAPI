/* 
    Primary file for the api
*/

// Dependencies
const http = require('http');

// the server  should respond to all requests with a string

const server = http.createServer(function(req, res ) {
    res.end('hello world\n')
});

// start the server  , and have it listen on port 300

server.listen(3000 , function() {
    console.log('the server is listening on port ' , )
})