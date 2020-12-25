const mongoose = require('mongoose');

// DB Connection
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('DB Connection FAIL');
});
db.once('open', () => {
  console.log('DB Connection SUCCESS');
});

module.exports = db;
