//Import necessary libs
var express = require('express');
var morgan =require('morgan')
var bodyParser = require('body-parser')
var app = express();

var config = require('./config/conf.js')

//Routes
var uploadRouter = require('./routes/upload.js');

//Configure Logging
//app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))

//Enable routing
app.use('/upload',uploadRouter)

//Welcome route
app.get('/', function (req, res) {
  res.send('Hello from SWIS-FS!');
});

//Start server
app.listen(config.PORT,config.HOST, function () {
  console.log('App serving on port '+ config.PORT);
});