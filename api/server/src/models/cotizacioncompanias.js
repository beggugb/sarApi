'use strict';
module.exports = (sequelize, DataTypes) => {
  const CotizacionCompanias = sequelize.define('CotizacionCompanias', {        
    cotizacionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cotizacion',
        key: 'id',
        as: 'cotizacionId'
      }
    },
    companiaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Compania',
        key: 'id',
        as: 'companiaId'
      }
    },    
  }, {});
  
  CotizacionCompanias.associate = function(models) {
    // associations can be defined here
    CotizacionCompanias.belongsTo(models.Cotizacion,{
      foreignKey: 'cotizacionId',
      onDelete: 'CASCADE'
    });
    CotizacionCompanias.belongsTo(models.Compania,{
      foreignKey: 'companiaId',
      onDelete: 'CASCADE'
    });   
  };
  return CotizacionCompanias;
};
