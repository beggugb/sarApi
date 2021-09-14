'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comisions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },      
      usuarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id',
            as: 'usuarioId'
          }
      },
      polizaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Polizas',
            key: 'id',
            as: 'polizaId'
          }
      },
      monto: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comisions');
  }
};