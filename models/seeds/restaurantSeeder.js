const restaurant = require('../restaurant');
const db = require('../../config/mongoose');

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
  for (let i = 0; i < 11; i += 1) {
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
  restaurant.create({
    name: '皇家披薩',
    name_en: 'Royal Pizza',
    category: '義式餐廳',
    image: 'https://i1.wp.com/img.vivawei.tw/20170528010430_91.jpg',
    location: '台北市德行東路192之1',
    phone: '+886 2 2833 1505',
    google_map: 'https://goo.gl/maps/FDP2QNqGMcQ3BBS4A',
    rating: 5,
    description: '皇家比薩位於天母洋食群聚之處還能佔有一席之地，憑藉的就是「我們不是大公司、但很實在」的理念，讓街坊鄰居吃過後都讚不絕口。',
  });
  console.log('Seeder Import Completed');
});
