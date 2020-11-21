const { RECIPE_TB, DRINKS_TB, RATIO_TB } = require('../models');

// 레시피 전체 리스트 조회
exports.getRecipeList = async () => {
  try {
    const recipeList = await RECIPE_TB.findAll({
      attributes: ['recipe_name', 'recipe_level'],
      include: [
        {
          model: RATIO_TB,
          // required: true,
          attributes: ['drinks_idx', 'ratio_percent'],
          include: [
            {
              model: DRINKS_TB,
              attributes: ['drinks_name'],
            },
          ],
        },
      ],
    });
    return recipeList;
  } catch (err) {
    throw err;
  }
};

// 레시피 등록
exports.insertRecipe = async (recipeName, recipeLevel) => {
  try {
    const insertRecipeResult = await RECIPE_TB.create({
      recipe_name: recipeName,
      recipe_level: recipeLevel,
    });
    return insertRecipeResult.recipe_idx;
  } catch (err) {
    throw err;
  }
};

// 레시피 비율 등록
exports.insertRatio = async (recipeIdx, drinksIdx, ratioPercent) => {
  try {
    const insertRatioResult = await RATIO_TB.create({
      drinks_idx: drinksIdx,
      DRINKSTBDrinksIdx: drinksIdx,
      recipe_idx: recipeIdx,
      RECIPETBRecipeIdx: recipeIdx,
      ratio_percent: ratioPercent,
    });
    return insertRatioResult.ratio_idx;
  } catch (err) {
    throw err;
  }
};
