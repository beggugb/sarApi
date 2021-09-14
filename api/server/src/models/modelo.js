'use strict';
module.exports = (sequelize, DataTypes) => {
  const Modelo = sequelize.define('Modelo', {
    nombre: DataTypes.STRING,
    filename: DataTypes.STRING,       
    marcaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Marca',
        key: 'id',
        as: 'marcaId'
      }
    },    
    tipoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tipo',
        key: 'id',
        as: 'tipoId'
      }
    },    
  }, {});
  
  Modelo.associate = function(models) {
    // associations can be defined here
    Modelo.belongsTo(models.Marca,{
      foreignKey: 'marcaId',
      onDelete: 'CASCADE'
    });
    Modelo.belongsTo(models.Tipo,{
      foreignKey: 'tipoId',
      onDelete: 'CASCADE'
    });    
  };
  return Modelo;
};
