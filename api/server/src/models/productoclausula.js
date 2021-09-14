'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductoClausula = sequelize.define('ProductoClausula', {          
    label: DataTypes.STRING,
    productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Producto',
        key: 'id',
        as: 'productoId'
      }
    },
    clausulaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clausula',
        key: 'id',
        as: 'clausulaId'
      }
    },    
  }, {});
  
  ProductoClausula.associate = function(models) {
    // associations can be defined here
    ProductoClausula.belongsTo(models.Producto,{
      foreignKey: 'productoId',
      onDelete: 'CASCADE'
    });
    ProductoClausula.belongsTo(models.Clausula,{
      foreignKey: 'clausulaId',
      onDelete: 'CASCADE'
    });    
    ProductoClausula.belongsToMany(models.ClausulaProducto,{
      through: 'ClausulaProducto', 
      foreignKey: 'productoclausulaId',
      otherKey:    'id'
    });    
  };
  return ProductoClausula;
};
