'use strict';
module.exports = (sequelize, DataTypes) => {
  const CotizacionClausulas = sequelize.define('CotizacionClausulas', {
    label: DataTypes.STRING,        
    clausulaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clausula',
        key: 'id',
        as: 'clausulaId'
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
  
  CotizacionClausulas.associate = function(models) {
    // associations can be defined here
    CotizacionClausulas.belongsTo(models.Clausula,{
      foreignKey: 'clausulaId',
      onDelete: 'CASCADE'
    });
    CotizacionClausulas.belongsTo(models.Cotizacion,{
      foreignKey: 'cotizacionId',
      onDelete: 'CASCADE'
    });
    CotizacionClausulas.belongsTo(models.CotizacionCompanias,{
      foreignKey: 'cotizacioncompaniaId',
      onDelete: 'CASCADE'
    });    
  };
  return CotizacionClausulas;
};
