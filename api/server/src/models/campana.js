'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campana extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Campana.init({
    nombre: DataTypes.STRING,
    detalle: DataTypes.STRING,
    filename: DataTypes.STRING,
    inicio: DataTypes.DATE,
    fin: DataTypes.DATE,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Campana',
  });
  return Campana;
};