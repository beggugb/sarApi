'use strict';
module.exports = (sequelize, DataTypes) => {
  const PCoberturas = sequelize.define('PCoberturas', {
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
    coberturaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cobertura',
        key: 'id',
        as: 'coberturaId'
      }
    },	  
  }, {});
  
  PCoberturas.associate = function(models) {
    // associations can be defined here
    PCoberturas.belongsTo(models.Poliza,{
      foreignKey: 'polizaId',
      onDelete: 'CASCADE'
    });    
     PCoberturas.belongsTo(models.Cobertura,{
      foreignKey: 'coberturaId',
      onDelete: 'CASCADE'
    });	  
  };
  return PCoberturas;
};
