// 引用 Express 與 Express 路由器
const express = require('express');

const router = express.Router();
// 引入路由模組
const home = require('./modules/home');
const search = require('./modules/search');
const users = require('./modules/users');
const auth = require('./modules/auth');
const { authenticator } = require('../middleware/auth');

// Request 導向各個模組
router.use('/search', authenticator, search);
router.use('/users', users);
router.use('/auth', auth);
router.use('/', authenticator, home);

// 匯出路由器
module.exports = router;
