#!/usr/bin/env node
'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var path = require('path');
const http = require('http');
const url = require('url');

//Compress all routes
var compression = require('compression');

app.use(compression()); 
var helmet = require('helmet')
app.use(helmet());

const axios = require('axios');

// connection to MongoDB, Never stop trying to reconnect, Reconnect every 500ms 
// Maintain up to 10 socket connections, if not connected
// return errors immediately rather than waiting for reconnection
const options = {
  useMongoClient: true,
  reconnectTries: Number.MAX_VALUE, 
  reconnectInterval: 500, 
  poolSize: 10, 
  bufferMaxEntries: 0
};

const uri= process.env.MONGODB_URI || 'mongodb://localhost/hahavideo';
mongoose.Promise = global.Promise;
mongoose.connect(uri); 
var dbtube = mongoose.connection;

//handle mongo error, check the connexion to dbtube
dbtube.on('error', console.error.bind(console, 'connection error:'));
dbtube.once('open', ()=>{
	console.log("Connexion réussie au serveur MongoDB!");
});

//use sessions for tracking logins
app.use(session({
  secret:'travailler fort',
  resave:true,
  unset:'destroy',
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: dbtube
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from here e.g. public forms
app.use(express.static(__dirname + '/public'));

// include routes to REST
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Non trouvé');
  err.status = 404;
  next(err);
});

// error handler + define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


// configurer l'écoute du serveur au port 3000
var port =3000;
var server = app.listen(port, () => {
	var host = server.address().address;
	console.log("Serveur web disponible à l'adresse: http://%s:%s", host, port);
});


