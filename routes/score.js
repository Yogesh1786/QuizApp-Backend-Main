const express = require('express');
const {
    getAllScore,
    postScore,
    getResponseById,
    deleteScore,
    deleteAll
} = require('../controllers/score');
const router = express.Router();

router.get('/all', getAllScore);
router.post('/create', postScore);
router.get('/response/:uuid', getResponseById);
router.delete('/delete/:uuid', deleteScore);
router.delete('/delete/all', deleteAll);

module.exports = router;