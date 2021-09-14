'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasa = sequelize.define('Tasa', {    
    tasaContado: DataTypes.DECIMAL,
    tasaCredito: DataTypes.DECIMAL,
    franquicia: DataTypes.DECIMAL, 
    desde: DataTypes.INTEGER,
    hasta: DataTypes.INTEGER,	  
    productocompaniaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductoCompania',
        key: 'id',
        as: 'productocompaniaId'
      }
    },
    tipoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tipo',
        key: 'id',
        as: 'tipoId'
      }
    }
  }, {});
  
  Tasa.associate = function(models) {
    // associations can be defined here
    Tasa.belongsTo(models.ProductoCompania,{
      foreignKey: 'productocompaniaId',
      onDelete: 'CASCADE'
    }); 
    Tasa.belongsTo(models.Tipo,{
      foreignKey: 'tipoId',
      onDelete: 'CASCADE'
    });
  };
  return Tasa;
};
