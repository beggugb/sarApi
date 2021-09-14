'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductoCompania', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Productos',
            key: 'id',
            as: 'productoId'
          }
      },
      companiaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Compania',
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
    await queryInterface.dropTable('ProductoCompania');
  }
};