// require packages used in the project
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const usePassport = require('./config/passport');
const restaurant = require('./models/restaurant');
const validator = require('./middleware');
const routes = require('./routes'); // 引用路由器
require('./config/mongoose');

const app = express();
const port = process.env.PORT;

// serving static files
app.use(express.static('public'));
// Init template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Setup sessions, POSTs body parser, use methodOverride to RESTify requests, then add ROUTER
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));
usePassport(app);
app.use(flash()); // 掛載套件
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg'); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg'); // 設定 warning_msg 訊息
  next();
});
app.use(methodOverride('_method'));
app.use(routes);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
