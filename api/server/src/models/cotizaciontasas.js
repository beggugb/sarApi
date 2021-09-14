'use strict';
module.exports = (sequelize, DataTypes) => {
  const CotizacionTasas = sequelize.define('CotizacionTasas', {
    primaCredito: DataTypes.DECIMAL,
    primaContado: DataTypes.DECIMAL,
    franquicia: DataTypes.DECIMAL,    
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
  
  CotizacionTasas.associate = function(models) {
    // associations can be defined here
    CotizacionTasas.belongsTo(models.Producto,{
      foreignKey: 'productoId',
      onDelete: 'CASCADE'
    });
    CotizacionTasas.belongsTo(models.Cliente,{
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });   
  };
  return CotizacionTasas;
};
