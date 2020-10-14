// const http = require('http');
// console.log({ Hello: 'Hello world from preload file (src/server.js)' });
const { server } = require('hardocs-graphql-api');
server();
// create a server object:

// http
//   .createServer(function(req, res) {
//     res.write('Hello World!'); //write a response to the client
//     res.end(); //end the response
//   })
//   .listen(5001, () => console.log('Listening on 5001')); //the server object listens on port 8080
