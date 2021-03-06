'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compania extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Compania.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    filename: DataTypes.STRING,
    label: DataTypes.STRING,
    mtk: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Compania',
  });
  return Compania;
};
