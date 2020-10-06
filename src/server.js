const http = require('http');
console.log({ Hello: 'Hello world from preload file (src/server.js)' });
const { server } = require('hardocs-graphql-api');

//create a server object:
server();