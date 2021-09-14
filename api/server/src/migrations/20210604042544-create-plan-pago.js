'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PlanPagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ncuota: {
        type: Sequelize.INTEGER
      },
      pmonto: {
        type: Sequelize.DECIMAL
      },
      pcomision: {
        type: Sequelize.DECIMAL
      },
      monto: {
        type: Sequelize.DECIMAL
      },
      comision: {
        type: Sequelize.DECIMAL
      },
      estado: {
        type: Sequelize.STRING
      },
      fechaPago: {
        type: Sequelize.DATE
      },
      notaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'NotaCobranzas',
            key: 'id',
            as: 'notaId'
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
    await queryInterface.dropTable('PlanPagos');
  }
};