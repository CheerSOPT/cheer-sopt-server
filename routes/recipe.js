var express = require('express');
var router = express.Router();
const recipeController = require('../controllers/recipeController');

// 레시피 전체 리스트 조회
router.get('/', recipeController.getRecipeList);

module.exports = router;
