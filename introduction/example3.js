const http = require('http');
const fs = require('fs');
const os = require('os');

osType = os.type();

htmlContent = `
  <!DOCTYPE html>
  <html>
    <h3>Hello World, Your os is ${osType}</h3>
  </html>
`

const server = http.createServer((req, res) => {
  if(req.url==='/favicon.ico') {
    res.writeHead(204, {'Content-Type':'image/x-icon'});
    res.end();
    return;
  }

  console.log("Δημιουργούμε το αρχείο μας");
  fs.writeFile('./index.html', htmlContent , err => {
    if (err){
      console.log("Preblem in writing file");
    } else {
      console.log("Διαβάζουμε το αρχείο μας");
      fs.readFile('index.html', 'utf8', (err, content) => {
        if (err) {
          console.log(err);
        }
        res.setHeader('Content-Type', 'text/html');
        res.end(content)
      })
    }
  })
});

server.listen(3000, ()=> {
  console.log('Server is up');
});