var http = require('http');
var fs = require('fs');
var base = './http';
var port = '9001';

var server = http.createServer();

server.on('request', function (request, response) {
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  var path = (request.url === '/') ? base + '/index.html' : base + request.url;
  fs.readFile(path, function (err, data) {
    if (request.method !== 'GET' || err) {
      response.statusCode = 404;
      fs.readFile(base + '/error.html', function (err, data) {
        response.write((err) ? '<h1 style="text-align: center;">Error: 404</h1>' : data);
        response.end();
      });
    } else {
      response.write(data);
      response.end();
    }
  });
});

server.listen(port);
