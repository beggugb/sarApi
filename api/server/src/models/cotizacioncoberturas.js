'use strict';
module.exports = (sequelize, DataTypes) => {
  const CotizacionCoberturas = sequelize.define('CotizacionCoberturas', {
    label: DataTypes.STRING,        
    coberturaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cobertura',
        key: 'id',
        as: 'coberturaId'
      }
    },
    cotizacionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cotizacion',
        key: 'id',
        as: 'cotizacionId'
      }
    },
    cotizacioncompaniaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CotizacionCompanias',
        key: 'id',
        as: 'cotizacioncompaniaId'
      }
    },
  }, {});
  
  CotizacionCoberturas.associate = function(models) {
    // associations can be defined here
    CotizacionCoberturas.belongsTo(models.Cobertura,{
      foreignKey: 'coberturaId',
      onDelete: 'CASCADE'
    });
    CotizacionCoberturas.belongsTo(models.Cotizacion,{
      foreignKey: 'cotizacionId',
      onDelete: 'CASCADE'
    });
    CotizacionCoberturas.belongsTo(models.CotizacionCompanias,{
      foreignKey: 'cotizacioncompaniaId',
      onDelete: 'CASCADE'
    });    
  };
  return CotizacionCoberturas;
};
