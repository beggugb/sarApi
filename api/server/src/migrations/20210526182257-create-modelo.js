'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Modelos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      marcaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Marcas',
            key: 'id',
            as: 'marcaId'
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
    await queryInterface.dropTable('Modelos');
  }
};