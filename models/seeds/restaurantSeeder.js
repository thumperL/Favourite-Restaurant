const bcrypt = require('bcryptjs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const restaurant = require('../restaurant');
const User = require('../user');
const db = require('../../config/mongoose');

// Dummy Data
const seedUsers = [
  {
    name: 'Sample User 1',
    email: 'user1@example.com',
    password: '12345678',
  },
  {
    name: 'Sample User 2',
    email: 'user2@example.com',
    password: '12345678',
  },
];
const restaurantList = require('./restaurantSeeds.json');

db.once('open', () => {
  seedUsers.forEach((eaSeedUser, index) => {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(eaSeedUser.password, salt))
      .then((hash) => User.create({
        name: eaSeedUser.name,
        email: eaSeedUser.email,
        password: hash,
      }))
      .then((user) => {
        const userId = user._id;
        return Promise.all(
          Array.from({ length: 3 }, (_, i) => restaurant.create({
            name: `${restaurantList.results[(i + (index * 3))].name}`,
            name_en: `${restaurantList.results[(i + (index * 3))].name_en}`,
            category: `${restaurantList.results[(i + (index * 3))].category}`,
            image: `${restaurantList.results[(i + (index * 3))].image}`,
            location: `${restaurantList.results[(i + (index * 3))].location}`,
            phone: `${restaurantList.results[(i + (index * 3))].phone}`,
            google_map: `${restaurantList.results[(i + (index * 3))].google_map}`,
            rating: `${restaurantList.results[(i + (index * 3))].rating}`,
            description: `${restaurantList.results[(i + (index * 3))].description}`,
            userId,
          })),
        );
      })
      .then(() => {
        console.log('Seeder Import Completed.');
        process.exit();
      });
  });
});
