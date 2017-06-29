'use strict';

const bodyParser = require('./lib/parse.js');
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(req, response) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if(req.method === 'POST') {
    if(req.url.pathname === '/cowsay') {
      bodyParser(req, function(err) {
        if(err) throw err;
        let message = cowsay.say({text: req.body.text});
        console.log(req.body);
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

  if(req.method === 'GET') {
    if(req.url.pathname === '/cowsay') {
      let message = cowsay.say({text: req.url.query.text});
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
