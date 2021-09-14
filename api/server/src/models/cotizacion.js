'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cotizacion = sequelize.define('Cotizacion', {
    ivigencia: DataTypes.DATE,
    fvigencia: DataTypes.DATE,
    valor: DataTypes.DECIMAL,
    cliente: DataTypes.STRING,	 
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,	 
    contratado: DataTypes.BOOLEAN,	   
    productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Producto',
        key: 'id',
        as: 'productoId'
      }
    },
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
      }
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'usuarioId'
      }
    },
  }, {});
  
  Cotizacion.associate = function(models) {
    // associations can be defined here
    Cotizacion.belongsTo(models.Cliente,{
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });
    Cotizacion.belongsTo(models.Producto,{
      foreignKey: 'productoId',
      onDelete: 'CASCADE'
    });
    Cotizacion.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });
  };
  return Cotizacion;
};
