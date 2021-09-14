'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tareas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start: {
        type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
      },
      title: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      classNames: {
        type: Sequelize.STRING
      },
      editable: {
        type: Sequelize.BOOLEAN
      },
      backgroundColor: {
        type: Sequelize.STRING
      },
      selectable: {
        type: Sequelize.BOOLEAN
      },
      usuarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id',
            as: 'usuarioId'
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
    await queryInterface.dropTable('Tareas');
  }
};