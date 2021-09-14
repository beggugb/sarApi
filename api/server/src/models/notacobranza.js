'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotaCobranza = sequelize.define('NotaCobranza', {
    nro: DataTypes.INTEGER,
    num: DataTypes.INTEGER,
    primaTotal: DataTypes.DECIMAL,
    primaSaldo: DataTypes.DECIMAL,
    primaPagada: DataTypes.DECIMAL,
    comisionTotal: DataTypes.DECIMAL,
    comisionSaldo: DataTypes.DECIMAL,
    comisionPagada: DataTypes.DECIMAL,
    ivigencia: DataTypes.DATE,
    fvigencia: DataTypes.DATE,            
    polizaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Poliza',
        key: 'id',
        as: 'polizaId'
      }
    },
  }, {});
  
  NotaCobranza.associate = function(models) {
    // associations can be defined here
    NotaCobranza.belongsTo(models.Poliza,{
      foreignKey: 'polizaId',
      onDelete: 'CASCADE'
    });    
  };
  return NotaCobranza;
};
