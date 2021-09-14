'use strict';
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {    
    nombre: DataTypes.STRING,
    vigencia: DataTypes.DATE,
    comision: DataTypes.DECIMAL,
    ramoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Ramo',
        key: 'id',
        as: 'ramoId'
      }
    },    
  }, {});
  
  Producto.associate = function(models) {
    // associations can be defined here
    Producto.belongsTo(models.Ramo,{
      foreignKey: 'ramoId',
      onDelete: 'CASCADE'
    });
   ;    
  };
  return Producto;
};
