module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'RECIPE_TB',
    {
      recipe_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recipe_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      recipe_level: {
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
