// app.js
// require packages used in the project
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const restaurant = require('./models/restaurant');

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
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('DB Connection FAIL');
});
db.once('open', () => {
  console.log('DB Connection SUCCESS');
});

// routes setting
app.get('/', (req, res) => {
  restaurant.find()
    .lean()
    .then((restaurants) => {
      console.log(restaurants);
      res.render('index', { restaurants });
    })
    .catch((error) => console.error(error));
});

// READ restaurant info
app.get('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  return restaurant.findById(restaurantId)
    .lean()
    .then((restaurants) => {
      res.render('showmore', { restaurants });
    })
    .catch((error) => console.log(error));
});

// UPDATE operation
app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params;
  return restaurant.findById(restaurantId)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch((error) => console.log(error));
});
app.post('/restaurants/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params;
  const { name } = req.body;
  const { name_en } = req.body;
  const { category } = req.body;
  const { image } = req.body;
  const { location } = req.body;
  const { phone } = req.body;
  const { google_map } = req.body;
  const { rating } = req.body;
  const { description } = req.body;
  return restaurant.findById(restaurantId)
    .then((restaurants) => {
      restaurants.name = name;
      restaurants.name_en = name_en;
      restaurants.category = category;
      restaurants.image = image;
      restaurants.location = location;
      restaurants.phone = phone;
      restaurants.google_map = google_map;
      restaurants.rating = rating;
      restaurants.description = description;
      return restaurants.save();
    })
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch((error) => console.log(error));
});

// SEARCH and LIST restaurants
app.get('/search/', (req, res) => {
  const { keyword } = req.query;
  // search based on name, name_en, category, and location
  restaurant.find({
    $or: [
      { name: { $regex: keyword } },
      { name_en: { $regex: keyword } },
      { category: { $regex: keyword } },
      { location: { $regex: keyword } },
    ],
  })
    .lean()
    .then((restaurants) => {
      res.render('index', { restaurants, keyword });
    })
    .catch((error) => console.error(error));
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
