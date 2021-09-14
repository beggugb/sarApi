'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClausulaProducto = sequelize.define('ClausulaProducto', {    
    label: DataTypes.STRING,    
    productoclausulaId: DataTypes.INTEGER,
    key: DataTypes.INTEGER,	  
    productocompaniaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductoCompania',
        key: 'id',
        as: 'productocompaniaId'
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
    productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Producto',
        key: 'id',
        as: 'productoId'
      }
    },	  
  }, {});
  
  ClausulaProducto.associate = function(models) {
    // associations can be defined here
    ClausulaProducto.belongsTo(models.Producto,{
      foreignKey: 'productoId',
      onDelete: 'CASCADE'
    });
    ClausulaProducto.belongsTo(models.ProductoCompania,{
      foreignKey: 'productocompaniaId',
      onDelete: 'CASCADE'
    });	  
    ClausulaProducto.belongsTo(models.Clausula,{
      foreignKey: 'clausulaId',
      onDelete: 'CASCADE'
    }); 


  };
  return ClausulaProducto;
};
