const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { getDrinks } = require('../services/drinksService');
const { DRINKS_TB } = require('../models');


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
    }
}