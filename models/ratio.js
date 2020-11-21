const { DRINKS_TB, RECIPE_TB } = require('../models');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'RATIO_TB',
    {
      ratio_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ratio_percent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
