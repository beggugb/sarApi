'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      vigencia: {
        type: Sequelize.DATE
      },
      companiaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Compania',
            key: 'id',
            as: 'companiaId'
          }
        },
      ramoId: {
          type: Sequelize.INTEGER,
            references: {
              model: 'Ramos',
              key: 'id',
              as: 'ramoId'
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
    await queryInterface.dropTable('Productos');
  }
};