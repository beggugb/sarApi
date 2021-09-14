'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clausula = sequelize.define('Clausula', {    
    label: DataTypes.STRING,
    valor: DataTypes.DECIMAL            
  }, {});
  
  Clausula.associate = function(models) {
    // associations can be defined here
    
  };
  return Clausula;
};