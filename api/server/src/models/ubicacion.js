'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ubicacion.init({
    tipo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    filename: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Ubicacion',
  });
  return Ubicacion;
};