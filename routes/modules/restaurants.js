// 引用 Express 與 Express 路由器
const express = require('express');

const router = express.Router();

// 引用 model 與 validator middleware
const restaurant = require('../../models/restaurant');
const validator = require('../../middleware');

// 定義 restaurants 路由
// CREATE Operation
router.get('/new', (req, res) => res.render('restaurantForm'));
router.post('/', validator.createRestaurant, (req, res) => {
  const userId = req.user._id;
  // The the posted name
  const { name } = req.body;
  const { name_en } = req.body;
  const { category } = req.body;
  const { image } = req.body;
  const { location } = req.body;
  const { phone } = req.body;
  const { google_map } = req.body;
  const { rating } = req.body;
  const { description } = req.body;

  // Created the instance
  const restaurants = new restaurant({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId,
  });

  return restaurants.save()
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error));
});

// READ restaurant info
router.get('/:_id', (req, res) => {
  const userId = req.user._id;
  const { _id } = req.params;

  return restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurants) => {
      res.render('showmore', { restaurants });
    })
    .catch((error) => console.log(error));
});

// UPDATE operation
router.get('/:_id/edit', (req, res) => {
  const userId = req.user._id;
  const { _id } = req.params;

  return restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurantData) => res.render('restaurantForm', { restaurantData }))
    .catch((error) => console.log(error));
});
router.put('/:_id', validator.createRestaurant, (req, res) => {
  const userId = req.user._id;
  const { _id } = req.params;
  const { name } = req.body;
  const { name_en } = req.body;
  const { category } = req.body;
  const { image } = req.body;
  const { location } = req.body;
  const { phone } = req.body;
  const { google_map } = req.body;
  const { rating } = req.body;
  const { description } = req.body;

  return restaurant.findOne({ _id, userId })
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
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => console.log(error));
});

// DELETE operation
router.delete('/:_id', (req, res) => {
  const userId = req.user._id;
  const { _id } = req.params;
  return restaurant.findOne({ _id, userId })
    .then((restaurants) => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

// 匯出路由模組
module.exports = router;
