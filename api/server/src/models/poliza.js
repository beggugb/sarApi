'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poliza = sequelize.define('Poliza', {
    nro: DataTypes.INTEGER,
    contado: DataTypes.BOOLEAN,
    primaTotal: DataTypes.DECIMAL,
    comision: DataTypes.DECIMAL,
    observaciones: DataTypes.STRING,
    primaSaldo: DataTypes.DECIMAL,
    primaPagada: DataTypes.DECIMAL,
    ivigencia: DataTypes.DATE,
    fvigencia: DataTypes.DATE,
    estado: DataTypes.BOOLEAN,       
    transcripcion: DataTypes.BOOLEAN,	  
    companiaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Compania',
        key: 'id',
        as: 'companiaId'
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
    ramoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Ramo',
        key: 'id',
        as: 'ramoId'
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
    cotizacionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cotizacion',
        key: 'id',
        as: 'cotizacionId'
      }
    },
  }, {});
  
  Poliza.associate = function(models) {
    // associations can be defined here
    Poliza.belongsTo(models.Compania,{
      foreignKey: 'companiaId',
      onDelete: 'CASCADE'
    });
    Poliza.belongsTo(models.Cliente,{
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });
    Poliza.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });
    Poliza.belongsTo(models.Ramo,{
      foreignKey: 'ramoId',
      onDelete: 'CASCADE'
    });
    Poliza.belongsTo(models.Producto,{
      foreignKey: 'productoId',
      onDelete: 'CASCADE'
    });
    Poliza.belongsTo(models.Cotizacion,{
      foreignKey: 'cotizacionId',
      onDelete: 'CASCADE'
    });    
  };
  return Poliza;
};
