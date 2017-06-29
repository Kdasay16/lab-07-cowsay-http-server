'use strict';

const bodyParser = require('./lib/parse.js');
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(request, response) {
  request.url = url.parse(request.url);
  request.url.query = queryString.parse(request.url.query);

  if(request.method === 'POST') {
    if(request.url.pathname === '/cowsay') {
      bodyParser(request, function(err) {
        if(err) throw err;
        let message = cowsay.say({text: request.body.text});
        console.log(request.body);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(message);
        response.end();
      });
    } else {
      let message = cowsay.say(
        {text: 'bad request\ntry localhost:3000/cowsay with a proper body'}
      );
      response.writeHead(400, {'Content-Type': 'text.plain'});
      response.write(message);
      response.end();
    }
  }

  if(request.method === 'GET') {
    if(request.url.pathname === '/cowsay') {
      let message = cowsay.say({text: request.url.query.text});
      response.wrireHead(200, {'Content-Type': 'text/plain'});
      response.write(message);
      response.end();
    } else {
      let message = cowsay.say(
        {text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}
      );
      response.writeHead(400, {'Content-Type': 'text.plain'});
      response.write(message);
      response.end();
    }
  }
});
server.listen(PORT, () => console.log(`Listening on port, ${PORT}`));
