var express = require('express');
var router = express.Router();
const drinksController = require('../controllers/drinksController');

// 주종 전체 리스트 조회
router.get('/', drinksController.getDrinks);


module.exports = router;
