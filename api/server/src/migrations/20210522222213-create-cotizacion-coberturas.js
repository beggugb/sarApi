'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CotizacionCoberturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },
      coberturaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Coberturas',
            key: 'id',
            as: 'coberturaId'
          }
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
    await queryInterface.dropTable('CotizacionCoberturas');
  }
};