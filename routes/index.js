var express = require('express');
var router = express.Router();
const drinkController = require('../controllers/drinksController');

router.post('/drinks/push', drinkController.postdrinks);
router.get('/drinks', drinkController.getDrinks);
router.post('/recipe/blender', drinkController.blendRecipe);

router.use('/recipe', require('./recipe'));

module.exports = router;
