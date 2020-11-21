const recipeService = require('../services/recipeService');
const responseMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const { getOneDrink } = require('../services/drinksService');


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

exports.blendRecipe = async (req, res) => {
  try {
    const { drinks_idx_1, drinks_idx_2, drinks_idx_3 } = req.body;
    const getRandom = require('../modules/getRandomnum');
    const confirmLevel = require('../modules/confirmLevel');
    if (!drinks_idx_1 || !drinks_idx_2) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.NULL_VALUE));
    }
    const drink_1 = await getOneDrink(drinks_idx_1);
    const drink_1_name = drink_1.drinks_name;
    const drink_1_level = drink_1.drinks_alcohol_level;
    const drink_2 = await getOneDrink(drinks_idx_2);
    const drink_2_name = drink_2.drinks_name;
    const drink_2_level = drink_2.drinks_alcohol_level;
    if (!drinks_idx_3) {
      const ratio_two = getRandom(0, 5, 2, 5);
      const level_sum_2 = drink_1_level * ratio_two[0] + drink_2_level * ratio_two[1];
      const recipeLevel_2 = confirmLevel(level_sum_2);
      const drink_1_stack = drinks_idx_1.toString().repeat(ratio_two[0]).split('');
      const drink_2_stack = drinks_idx_2.toString().repeat(ratio_two[1]).split('');
      const ratios = [{ drinksIdx: drinks_idx_1, ratioPercent: ratio_two[0] }, { drinksIdx: drinks_idx_2, ratioPercent: ratio_two[1] }];
      const two_recipe_stack = drink_1_stack.concat(drink_2_stack);
      // "ratios" : [
      //     {"drinksIdx": 3, "ratioPercent":3}, 
      //     {"drinksIdx": 2, "ratioPercent":2}
      // ]
      const blended_count_2 = 2;
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.BLEND_DRNIK_SUCCESS, { ratios, recipeLevel_2, two_recipe_stack, blended_count_2, }));
    }
    const drink_3 = await getOneDrink(drinks_idx_3);
    const drink_3_name = drink_3.drinks_name;
    const drink_3_level = drink_3.drinks_alcohol_level;
    const ratio_three = getRandom(0, 5, 3, 5);
    const drink_1_stack = drinks_idx_1.toString().repeat(ratio_three[0]).split('');
    const drink_2_stack = drinks_idx_2.toString().repeat(ratio_three[1]).split('');
    const drink_3_stack = drinks_idx_3.toString().repeat(ratio_three[2]).split('');
    const three_recipe_stack = drink_1_stack.concat(drink_2_stack, drink_3_stack);
    const recipeLevel_3 = confirmLevel(level_sum_3);
    const level_sum_3 = drink_1_level * ratio_three[0] + drink_2_level * ratio_three[1] + drink_3_level * ratio_three[2];
    const blended_count_3 = 3;
    const ratios = [{ drinksIdx: drinks_idx_1, ratioPercent: ratio_three[0] }, { drinksIdx: drinks_idx_2, ratioPercent: ratio_three[1] }, { drinksIdx: drinks_idx_3, ratioPercent: ratio_three[2] }];
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.BLEND_DRNIK_SUCCESS, { ratios, recipeLevel_3, three_recipe_stack, blended_count_3 }));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  }
};