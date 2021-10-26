'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Siniestros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      lugar: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL
      },
      longitude: {
        type: Sequelize.DECIMAL
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      fechaSiniestro: {
        type: Sequelize.DATE
      },
      fechaCierre: {
        type: Sequelize.DATE
      },
      clienteId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Clientes',
            key: 'id',
            as: 'cliente'
          }
      }, 
      polizaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Polizas',
            key: 'id',
            as: 'poliza'
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
    await queryInterface.dropTable('Siniestros');
  }
};