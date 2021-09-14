'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ramo = sequelize.define('Ramo', {    
    nombre: DataTypes.STRING,
    icono: DataTypes.STRING            
  }, {});
  
  Ramo.associate = function(models) {
    // associations can be defined here
    
  };
  return Ramo;
};
