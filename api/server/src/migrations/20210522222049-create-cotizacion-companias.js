'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CotizacionCompanias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },      
      cotizacionId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Cotizaciones',
            key: 'id',
            as: 'cotizacionId'
          }
        },
      companiaId: {
          type: Sequelize.INTEGER,
            references: {
              model: 'Companias',
              key: 'id',
              as: 'companiaId'
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
    await queryInterface.dropTable('CotizacionCompanias');
  }
};