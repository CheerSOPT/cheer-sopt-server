const { DRINKS_TB } = require('../models');
module.exports = {
    getDrinks: async () => {
        try {
            const drinks = await DRINKS_TB.findAll({
                attributes: ['drinks_idx', 'drinks_name']
            });

            return drinks;
        } catch (err) {
            throw err;
        }
    },
    getOneDrink: async (drinks_idx) => {
        try {
            const drink = await DRINKS_TB.findOne({
                where: {
                    drinks_idx
                },
            })
            return drink;
        } catch (err) {
            throw err;
        }
    }
}