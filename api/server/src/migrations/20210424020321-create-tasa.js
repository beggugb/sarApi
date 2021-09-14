'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tasaContado: {
        type: Sequelize.DECIMAL
      },
      tasaCredito: {
        type: Sequelize.DECIMAL
      },
      franquicia: {
        type: Sequelize.DECIMAL
      },
      tipoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Tipos',
            key: 'id',
            as: 'tipoId'
          }
        },
      productoId: {
          type: Sequelize.INTEGER,
            references: {
              model: 'Productos',
              key: 'id',
              as: 'productoId'
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
    await queryInterface.dropTable('Tasas');
  }
};