'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Propaganda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Propaganda.init({
    image: DataTypes.STRING,
    desc: DataTypes.STRING,
    vigencia: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Propaganda',
  });
  return Propaganda;
};