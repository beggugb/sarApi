'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlanPago = sequelize.define('PlanPago', {
    ncuota: DataTypes.INTEGER,
    pmonto: DataTypes.DECIMAL,
    pcomision: DataTypes.DECIMAL,
    monto: DataTypes.DECIMAL,
    comision: DataTypes.DECIMAL,
    estado: DataTypes.STRING,
    fechaPago: DataTypes.DATE,            
    notaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NotaCobranza',
        key: 'id',
        as: 'notaId'
      }
    },
  }, {});
  
  PlanPago.associate = function(models) {
    // associations can be defined here
    PlanPago.belongsTo(models.NotaCobranza,{
      foreignKey: 'notaId',
      onDelete: 'CASCADE'
    });    
  };
  return PlanPago;
};