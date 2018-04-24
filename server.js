const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 3000;
const opn = require('opn');

app.use(bodyParser.urlencoded({ extended: true }));
//https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', 'http://microservice-mongo:'+port);
  res.setHeader('Access-Control-Allow-Origin', "*");

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
MongoClient.connect(db.url, (err, database) => {

  var db = database.db('Microservice_Notizen');

  if (err) return console.log(err)
  require('./app/routes')(app, db);

  app.listen(port, () => {
    console.log('We are live on ' + port);
    //opn('./html/index.html');
  });
})