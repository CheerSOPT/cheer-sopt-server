const recipeService = require('../services/recipeService');
const responseMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');

// 레시피 전체 리스트 조회
exports.getRecipeList = async (req, res) => {
  try {
    const recipes = await recipeService.getRecipeList();
    recipes[0].dataValues.RATIO_TBs.map((value, idx) => {
      console.log(value.dataValues.DRINKS_TB.dataValues.drinks_name);
    });
    // console.log(recipes[0].dataValues.RATIO_TBs[1]); //.dataValues.DRINKS_TB.dataValues.drinks_name);
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
