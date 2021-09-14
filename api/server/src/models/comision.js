'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comision = sequelize.define('Comision', {
    label: DataTypes.STRING,
    monto: DataTypes.DECIMAL,
    primaTotal: DataTypes.DECIMAL,
    polizaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Poliza',
        key: 'id',
        as: 'polizaId'
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
  
  Comision.associate = function(models) {
    // associations can be defined here
    Comision.belongsTo(models.Poliza,{
      foreignKey: 'polizaId',
      onDelete: 'CASCADE'
    });
    Comision.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });    
  };
  return Comision;
};