// 引用 Express 與 Express 路由器
const express = require('express');

const router = express.Router();
// 引用 Todo model
const restaurant = require('../../models/restaurant');

// 定義 search 路由
router.get('/', (req, res) => {
  const { keyword } = req.query;
  const restaurantSort = (req.query.restaurantSort === undefined) ? 'asc' : req.query.restaurantSort;
  const sort = [];
  switch (restaurantSort) {
    case 'byType':
      sort.push({ category: 'asc' });
      break;
    case 'byArea':
      sort.push({ location: 'asc' });
      break;
    default:
      sort.push({ _id: restaurantSort });
      break;
  }

  const regex = new RegExp(keyword, 'i'); // Have to use RegExp builder to build the if contains string filtering
  // search based on name, name_en, category, and location
  restaurant.find({
    $or: [
      { name: { $regex: regex } },
      { name_en: { $regex: regex } },
      { category: { $regex: regex } },
      { location: { $regex: regex } },
    ],
  })
    .lean()
    .sort(...sort)
    .then((restaurants) => {
      res.render('index', { restaurants, keyword });
    })
    .catch((error) => console.error(error));
});

// 匯出路由模組
module.exports = router;
