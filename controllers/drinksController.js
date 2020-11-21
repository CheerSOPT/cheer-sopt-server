const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { getDrinks, getOneDrink } = require('../services/drinksService');
const { DRINKS_TB } = require('../models');
const drinks = require('../models/drinks');


module.exports = {
    getDrinks: async (req, res) => {
        try {
            const drinks = await getDrinks();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_DRINK_SUCCESS, drinks));

        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    },
    postdrinks: async (req, res) => {
        try {
            const { drinks_name, drinks_level } = req.body;
            const drink = await DRINKS_TB.create({ drinks_name, drinks_alcohol_level: drinks_level });
            res.send(drink);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    },
    blendRecipe: async (req, res) => {
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
                const two_ratio1 = ratio_two[0].toString();
                const two_ratio2 = ratio_two[1].toString();

                const blended_count_2 = 2;
                const two_recipe_stack = drink_1_stack.concat(drink_2_stack);
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.BLEND_DRNIK_SUCCESS, { drink_1_name, two_ratio1, drink_2_name, two_ratio2, two_recipe_stack, recipeLevel_2, blended_count_2 }));
            }
            const drink_3 = await getOneDrink(drinks_idx_3);
            const drink_3_name = drink_3.drinks_name;
            const drink_3_level = drink_3.drinks_alcohol_level;
            const ratio_three = getRandom(0, 5, 3, 5);
            const drink_1_stack = drinks_idx_1.toString().repeat(ratio_three[0]).split('');
            const drink_2_stack = drinks_idx_2.toString().repeat(ratio_three[1]).split('');
            const drink_3_stack = drinks_idx_3.toString().repeat(ratio_three[2]).split('');
            const three_recipe_stack = drink_1_stack.concat(drink_2_stack, drink_3_stack);
            const three_ratio1 = ratio_three[0].toString();
            const three_ratio2 = ratio_three[1].toString();
            const three_ratio3 = ratio_three[2].toString();
            const level_sum_3 = drink_1_level * ratio_three[0] + drink_2_level * ratio_three[1] + drink_3_level * ratio_three[2];
            const recipeLevel_3 = confirmLevel(level_sum_3);
            const blended_count_3 = 3;
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.BLEND_DRNIK_SUCCESS, { drink_1_name, three_ratio1, drink_2_name, three_ratio2, drink_3_name, three_ratio3, three_recipe_stack, recipeLevel_3, blended_count_3 }));
        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }
}