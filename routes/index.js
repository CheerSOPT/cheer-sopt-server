var express = require('express');
var router = express.Router();
const drinkController = require('../controllers/drinksController');

// router.post('/drinks/push', drinkController.postdrinks);

router.use('/drinks', require('./drinks'));
router.use('/recipe', require('./recipe'));

module.exports = router;
