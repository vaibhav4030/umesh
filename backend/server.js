var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');

var user = require('./routes/user');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/auth', user);
module.exports = app;

app.listen(1000, function() {
  console.log('Hosted on port 1000.')
});