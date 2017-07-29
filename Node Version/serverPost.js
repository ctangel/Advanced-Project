const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))

// Allows for static files (css, js, json) to be served
app.use(express.static(__dirname + '/'));

app.listen(3000, function () {
  console.log('listening...');
})

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
})

app.get('/map', function (request, response) {
  response.sendFile(__dirname + '/map.html');
})

app.get('/table', function (request, response) {
  response.sendFile(__dirname + '/table.html');
})

// Grabs json file and send it to the client
app.get('/refineries', function (request, response) {
  var json = require(__dirname + '/data/refineries.json');
  response.json(json);
})
