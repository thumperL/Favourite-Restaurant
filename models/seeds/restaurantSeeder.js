const mongoose = require('mongoose');
const restaurant = require('../restaurant');

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
  console.log('mongodb error!');
});
db.once('open', () => {
  console.log('mongodb connected!');
});

const restaurantCategory = ['中東料理', '日本料理', '義式餐廳', '美式餐廳', '酒吧', '咖啡'];
const restaurantImage = [
  'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg',
  'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5628/02.jpg',
  'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5629/03.jpg',
  'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5630/04.jpg',
  'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5631/05.jpg',
];

db.once('open', () => {
  console.log('mongodb connected!');
  for (let i = 0; i < 10; i += 1) {
    restaurant.create({
      name: `餐廳名稱 ${i}`,
      name_en: `Restaurant Name ${i}`,
      category: restaurantCategory[Math.floor(Math.random() * restaurantCategory.length)],
      image: restaurantImage[Math.floor(Math.random() * restaurantImage.length)],
      location: `地址 - ${i}`,
      phone: (String(i)).repeat(9),
      google_map: '',
      rating: Math.floor(Math.random() * 6), // randomise rating, out of 5 stars
      description: `desc ${i}`,
    });
  }
  console.log('done');
});
