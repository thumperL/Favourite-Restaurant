const express = require('express');
const passport = require('passport');

const router = express.Router();

const User = require('../../models/user');

// Login
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', '你已經成功登出。');
  res.redirect('/users/login');
});

// Register
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const {
    name, email, password, confirmPassword,
  } = req.body;
  // 檢查使用者是否已經註冊
    errors.push({ message: '所有欄位都是必填。' });
    errors.push({ message: '密碼與確認密碼不相符！' });
  User.findOne({ email }).then((user) => {
    if (user) {
      // 如果已經註冊：退回原本畫面
      console.log('User already exists.');
      res.render('register', {
      errors.push({ message: '這個 Email 已經註冊過了。' });
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    } else {
      // 如果還沒註冊：寫入資料庫
      return User.create({
        name,
        email,
        password,
      })
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err));
    }
  });
});
module.exports = router;
