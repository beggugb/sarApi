'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductoClausulas', {
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
        type: Sequelize.STRING
      },
      productoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Productos',
            key: 'id',
            as: 'productoId'
          }
        },
      clausulaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Clausulas',
            key: 'id',
            as: 'clausulaId'
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
    await queryInterface.dropTable('ProductoClausulas');
  }
};