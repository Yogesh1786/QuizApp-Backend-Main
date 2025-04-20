const express = require('express');
const { createUser, userLogin, getUserDetail } = require('../controllers/user');
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
router.get('/detail/:uuid', getUserDetail);

module.exports = router;