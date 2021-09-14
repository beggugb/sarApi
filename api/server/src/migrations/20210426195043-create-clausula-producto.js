'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ClausulaProductos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.DECIMAL
      },
      productoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'ProductoCompania',
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
    await queryInterface.dropTable('ClausulaProductos');
  }
};