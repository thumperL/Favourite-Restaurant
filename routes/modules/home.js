// 引用 Express 與 Express 路由器
const express = require('express');

const router = express.Router();
// 引用 Todo model
const restaurant = require('../../models/restaurant');

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id;
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

  restaurant.find({ userId })
    .lean()
    .sort(...sort)
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error));
});

// 匯出路由模組
module.exports = router;
