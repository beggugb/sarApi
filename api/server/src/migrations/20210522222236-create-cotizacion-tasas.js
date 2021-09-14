'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CotizacionTasas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      primaContado: {
        type: Sequelize.DECIMAL
      },
      primaCredito: {
        type: Sequelize.DECIMAL
      },
      franquicia: {
        type: Sequelize.DECIMAL
      },      
      cotizacionId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Cotizacions',
            key: 'id',
            as: 'cotizacionId'
          }
      },
      cotizacioncompaniaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'CotizacionCompanias',
            key: 'id',
            as: 'cotizacioncompaniaId'
          }
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
    await queryInterface.dropTable('CotizacionTasas');
  }
};