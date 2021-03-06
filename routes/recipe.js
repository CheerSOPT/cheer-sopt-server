var express = require('express');
var router = express.Router();
const recipeController = require('../controllers/recipeController');

// 레시피 전체 리스트 조회
router.get('/', recipeController.getRecipeList);

// 레시피 등록
router.post('/', recipeController.postRecipe);

// 랜덤 레시피 제조
router.post('/blender', recipeController.blendRecipe);

module.exports = router;
