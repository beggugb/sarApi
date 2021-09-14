'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductoCobertura = sequelize.define('ProductoCobertura', {    
    label: DataTypes.STRING, 	   
    productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Producto',
        key: 'id',
        as: 'productoId'
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
  
  ProductoCobertura.associate = function(models) {
    // associations can be defined here
    ProductoCobertura.belongsTo(models.Producto,{
      foreignKey: 'productoId',
      onDelete: 'CASCADE'
    });
    ProductoCobertura.belongsTo(models.Cobertura,{
      foreignKey: 'coberturaId',
      onDelete: 'CASCADE'
    });    
    ProductoCobertura.belongsToMany(models.CoberturaProducto,{
      through: 'CoberturaProducto',
      foreignKey: 'productocoberturaId',
      otherKey:    'id'
    });	  
  };
  return ProductoCobertura;
};
