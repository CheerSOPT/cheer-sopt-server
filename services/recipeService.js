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

// 레시피 전체 리스트 조회
// exports.getRecipeList = async () => {
//   try {
//     const recipeList = await RATIO_TB.findAll({
//       attributes: ['drinks_idx', 'ratio_percent'],
//       include: [
//         {
//           model: RECIPE_TB,
//           // required: true,
//           attributes: ['recipe_name', 'recipe_level'],
//         },
//         {
//           model: DRINKS_TB,
//           // required: true,
//           attributes: ['drinks_name'],
//         },
//       ],
//     });
//     return recipeList;
//   } catch (err) {
//     throw err;
//   }
// };
