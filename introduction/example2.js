const http = require('http');

const server = http.createServer((req, res) => {
  if (req) {
    console.log("My first request");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello World");
  }
});

server.listen(3000, '127.0.0.1', ()=>{
  console.log("Server is up");
});