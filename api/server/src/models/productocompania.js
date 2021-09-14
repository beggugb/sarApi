'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductoCompania = sequelize.define('ProductoCompania', {        
    orden: DataTypes.INTEGER,
    productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Producto',
        key: 'id',
        as: 'productoId'
      }
    },
    companiaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Compania',
        key: 'id',
        as: 'companiaId'
      }
    }    
  }, {});
  
  ProductoCompania.associate = function(models) {
    // associations can be defined here
    ProductoCompania.belongsTo(models.Producto,{
      foreignKey: 'productoId',
      onDelete: 'CASCADE'
    });   
    ProductoCompania.belongsTo(models.Compania,{
      foreignKey: 'companiaId',
      onDelete: 'CASCADE'
    });  
  };
  return ProductoCompania;
};