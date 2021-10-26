'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Siniestro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Siniestro.belongsTo(models.Cliente, {
        foreignKey: 'clienteId',
        as: 'cliente',
      });
      Siniestro.belongsTo(models.Poliza, {
        foreignKey: 'polizaId',
        as: 'poliza',
      });
    }
  };
  Siniestro.init({
    nro: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    lugar: DataTypes.STRING,
    tipo: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN,
    fechaSiniestro: DataTypes.DATE,
    fechaCierre: DataTypes.DATE,
    clienteId: DataTypes.INTEGER,
    polizaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Siniestro',
  });
  return Siniestro;
};