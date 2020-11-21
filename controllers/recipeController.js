const recipeService = require('../services/recipeService');
const responseMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');

// 레시피 전체 리스트 조회
exports.getRecipeList = async (req, res) => {
  try {
    const recipes = await recipeService.getRecipeList();
    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.READ_RECIPE_SUCCESS,
          recipes
        )
      );
  } catch (error) {
    console.error(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.READ_RECIPE_FAIL
        )
      );
  }
};

// 레시피 등록
exports.postRecipe = async (req, res) => {
  const { recipeName, recipeLevel, ratios } = req.body;
  try {
    const recipeId = await recipeService.insertRecipe(recipeName, recipeLevel);
    ratios.map(async (value) => {
      console.log(value);
      const ratioId = await recipeService.insertRatio(
        recipeId,
        value.drinksIdx,
        value.ratioPercent
      );
    });
    return res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.POST_RECIPE_SUCCESS));
  } catch (err) {
    console.log(err);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.POST_RECIPE_FAIL
        )
      );
  }
};
