var http = require('http');
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('Hello World from Satyam Sahay \n');
}).listen(8080, '127.0.0.1');

console.log("Server Running at http://127.0.0.1:8080/");