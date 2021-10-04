'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mensaje = sequelize.define('Mensaje', {
    mensaje: DataTypes.STRING,
    tipo: DataTypes.STRING,
    icon: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,	       
    usuarioId: DataTypes.STRING,	  
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
      }
    }
  }, {});
  
  Mensaje.associate = function(models) {
    // associations can be defined here
    Mensaje.belongsTo(models.Cliente,{
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });    
  };
  return Mensaje;
};
