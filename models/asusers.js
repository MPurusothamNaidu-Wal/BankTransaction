'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AsUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AsUsers.hasMany(models.Balance, {
        foreignKey: 'userId',
        as: 'balance',
      },
        AsUsers.hasMany(models.Transaction, {
          foreignKey: 'userId',
          as: 'transaction',
        }))
    }
  }
  AsUsers.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AsUsers',
  });
  return AsUsers;
};