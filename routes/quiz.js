const express = require('express');
const { getAllQuiz, postQuiz, deleteAll, deleteQuiz, updateQuiz } = require('../controllers/quiz');
const router = express.Router();

router.get('/all', getAllQuiz);
router.post('/create', postQuiz);
router.put('/update/:uuid', updateQuiz);
router.delete('/delete/:uuid', deleteQuiz);
router.delete('/delete/all', deleteAll);

module.exports = router;