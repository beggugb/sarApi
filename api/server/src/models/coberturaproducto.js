'use strict';
module.exports = (sequelize, DataTypes) => {
  const CoberturaProducto = sequelize.define('CoberturaProducto', {    
    label: DataTypes.STRING,
    productocoberturaId: DataTypes.INTEGER,
    key: DataTypes.INTEGER,	  
    productocompaniaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductoCompania',
        key: 'id',
        as: 'productocompaniaId'
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
   productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Producto',
        key: 'id',
        as: 'productoId'
      }
    } 	  
  }, {});
  
  CoberturaProducto.associate = function(models) {
    // associations can be defined here
    CoberturaProducto.belongsTo(models.Producto,{
      foreignKey: 'productoId',
      onDelete: 'CASCADE'
    });   
    CoberturaProducto.belongsTo(models.ProductoCompania,{
      foreignKey: 'productocompaniaId',
      onDelete: 'CASCADE'
    });	  
    CoberturaProducto.belongsTo(models.Cobertura,{
      foreignKey: 'coberturaId',
      onDelete: 'CASCADE'
    });  
  };
  return CoberturaProducto;
};
