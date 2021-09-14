'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductoCoberturas', {
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
      coberturaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Coberturas',
            key: 'id',
            as: 'coberturaId'
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
    await queryInterface.dropTable('ProductoCoberturas');
  }
};