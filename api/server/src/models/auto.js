'use strict';
module.exports = (sequelize, DataTypes) => {
  const Auto = sequelize.define('Auto', {
    valor: DataTypes.DECIMAL,
    placa: DataTypes.STRING,
    label: DataTypes.STRING,    
    tipoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tipo',
        key: 'id',
        as: 'tipoId'
      }
    },
    marcaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Marca',
        key: 'id',
        as: 'marcaId'
      }
    },
    modeloId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Modelo',
        key: 'id',
        as: 'modeloId'
      }
    },	  
    cotizacionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cotizacion',
        key: 'id',
        as: 'cotizacionId'
      }
    }
  }, {});
  
  Auto.associate = function(models) {
    // associations can be defined here
    Auto.belongsTo(models.Tipo,{
      foreignKey: 'tipoId',
      onDelete: 'CASCADE'
    });
    Auto.belongsTo(models.Marca,{
      foreignKey: 'marcaId',
      onDelete: 'CASCADE'
    });
    Auto.belongsTo(models.Modelo,{
      foreignKey: 'modeloId',
      onDelete: 'CASCADE'
    });	  
    Auto.belongsTo(models.Cotizacion,{
      foreignKey: 'cotizacionId',
      onDelete: 'CASCADE'
    });
  };
  return Auto;
};
