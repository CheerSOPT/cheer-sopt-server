const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DRINKS_TB = require('./drinks')(sequelize, Sequelize);
db.RECIPE_TB = require('./recipe')(sequelize, Sequelize);
db.RATIO_TB = require('./ratio')(sequelize, Sequelize);

/** 1: N */
db.DRINKS_TB.hasMany(db.RATIO_TB, {
  onDelete: 'cascade',
  foreignKey: {
    name: 'drinks_idx',
  },
});
db.RATIO_TB.belongsTo(db.DRINKS_TB);

db.RECIPE_TB.hasMany(db.RATIO_TB, {
  onDelete: 'cascade',
  foreignKey: {
    name: 'recipe_idx',
  },
});
db.RATIO_TB.belongsTo(db.RECIPE_TB);

module.exports = db;
