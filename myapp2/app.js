const express = require('express');
const app = express();

app.use(express.json());

const logger = (req, res, next) => {
  let url = req.url;
  console.log("Logger", url);
  let time = new Date();
  console.log('Received request for ' + url + ' at ' + time);
  next();

}

app.get('/user', (req, res)=>{
  res.send("User app");
})

app.post('/user', logger, (req, res)=>{
  console.log(req.body);
  let user = req.body;
  let name = user.name;
  let surname = user.surname;

  console.log("Post variables", name, surname);
  res.send('Name ' + name + ' Surname '+ surname);
})

app.listen(3000, () => {
  console.log("Server is up");
})