// app.js
// require packages used in the project
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// serving static files
app.use(express.static('public'));

// Init template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// serving static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true,
}));

// DB Connection
mongoose.connect('mongodb://localhost/favourite-restaurant', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('DB Connection FAIL');
});
db.once('open', () => {
  console.log('DB Connection SUCCESS');
});

// routes setting
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  console.log('get form POST request');
  console.log('req.body', req.body);
  res.render('index');
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
