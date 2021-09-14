'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cliente.init({
    nombres: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    ci: DataTypes.STRING,	  
    celular: DataTypes.STRING,
    filename: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    ciudad: DataTypes.STRING,
    pais: DataTypes.STRING,
    tipo: DataTypes.STRING,
    isCliente: DataTypes.BOOLEAN,
    facebookId: DataTypes.STRING,
    token: DataTypes.STRING	  
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};
