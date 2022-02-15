/* 
    Primary file for the api
*/

// Dependencies
const http = require('http');
const { StringDecoder } = require('string_decoder');
const url = require('url');
const stringDecoder = require('string_decoder').stringDecoder;

// the server  should respond to all requests with a string

const server = http.createServer(function(req, res ) {
    // Get the url and parse it 
    const parsedUrl = url.parse(req.url , true );
    // Get the path 
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");
    
    // Get The query String as an object

    var queryStringObject = parsedUrl.query;

    // Get the HTTP Method 
    const method = req.method.toLocaleLowerCase(); 

    // get the header as an object 

    const headers = req.headers;

    // get the payLoad as an object

    const decoder  = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data' , function(data){
        buffer += decoder.write('data');

    });

    req.on('end' , function() {
        buffer += decoder.end();
        // Choose the handeler where the requset should go to 

        var chosenHandler = typeof(router[trimmedPath]) !== 'undefinded'  ? router[trimmedPath] : handlers.notFound;

        // construct the datat to send to the handler

        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers': headers,
            'payload': buffer,
        };

        // Route the requste to the handler specified in the router

        chosenHandler(data , function(data , payload){
            // Use the status code called backed by the handeler or default to 200
            statusCode = typeof(statusCode) == 'number' ?  statusCode : 200;
            // use the payload called back by the handlers or default to the empty object
            payload = typeof(payload) == 'object' ? payload : {};
            // convert the payload into a string 

            const payloadString = JSON.stringify(payload);

            // return the response 
            res.setHeader('Content-type', 'application/json')
            res.writeHead(statusCode);
            res.end(payloadString);
             // log the request path 
            console.log(`returning this respnse` , statusCode , payloadString);

        });       
    });
});


// start the server  , and have it listen on port 300

server.listen(3000 , function() {
    console.log('the server is listening on port ' , )
})

// define handelers 

let handlers = {};

handlers.sample = function(data , callback){
    // callback http status code and payload object
    callback(406 , {'name': 'sample handler'});

}

// not found handeler 

handlers.notFound = function(data , callback) {
    callback(404)
}

// define a router 

let router = {
    'sample' : handlers.sample
}