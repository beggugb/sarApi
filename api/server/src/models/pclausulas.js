'use strict';
module.exports = (sequelize, DataTypes) => {
  const PClausulas = sequelize.define('PClausulas', {
    label: DataTypes.STRING,
    monto: DataTypes.STRING,            
    key: DataTypes.INTEGER,	  
    polizaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Poliza',
        key: 'id',
        as: 'polizaId'
      }
    },
    clausulaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clausula',
        key: 'id',
        as: 'clausulaId'
      }
    },	  
  }, {});
  
  PClausulas.associate = function(models) {
    // associations can be defined here
    PClausulas.belongsTo(models.Poliza,{
      foreignKey: 'polizaId',
      onDelete: 'CASCADE'
    });    
   PClausulas.belongsTo(models.Clausula,{
      foreignKey: 'clausulaId',
      onDelete: 'CASCADE'
    });	  
  };
  return PClausulas;
};
