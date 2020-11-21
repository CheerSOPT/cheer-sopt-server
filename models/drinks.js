module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'DRINKS_TB',
    {
      drinks_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      drinks_name: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
