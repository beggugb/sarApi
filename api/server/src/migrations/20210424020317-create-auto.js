'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Autos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.DECIMAL
      },
      placa: {
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
      },
      cotizacionId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Cotizacions',
            key: 'id',
            as: 'cotizacionId'
          }
        },
      tipoId: {
          type: Sequelize.INTEGER,
            references: {
              model: 'Tipos',
              key: 'id',
              as: 'tipoId'
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
    await queryInterface.dropTable('Autos');
  }
};