'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cobertura = sequelize.define('Cobertura', {    
    label: DataTypes.STRING,
    valor: DataTypes.DECIMAL         
  }, {});
  
  Cobertura.associate = function(models) {
    // associations can be defined here
    
  };
  return Cobertura;
};