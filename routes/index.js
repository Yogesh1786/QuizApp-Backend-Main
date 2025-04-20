// routes/index.js
const express = require('express');
const userRoutes = require('./user');
const quizRoutes = require('./quiz');
const scoreRoute = require('./score');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/quiz', quizRoutes);
router.use('/score', scoreRoute);

module.exports = router;