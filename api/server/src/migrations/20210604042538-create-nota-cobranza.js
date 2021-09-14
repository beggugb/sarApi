'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NotaCobranzas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro: {
        type: Sequelize.INTEGER
      },
      num: {
        type: Sequelize.INTEGER
      },
      primaTotal: {
        type: Sequelize.DECIMAL
      },
      primaSaldo: {
        type: Sequelize.DECIMAL
      },
      primaPagada: {
        type: Sequelize.DECIMAL
      },
      ivigencia: {
        type: Sequelize.DATE
      },
      fvigencia: {
        type: Sequelize.DATE
      },
      polizaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Polizas',
            key: 'id',
            as: 'polizaId'
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
    await queryInterface.dropTable('NotaCobranzas');
  }
};