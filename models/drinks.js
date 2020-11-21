module.exports = (sequelize, DataTypes) => {
    return sequelize.define('DRINKS_TB', {
        drinks_name: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    }
    )
}