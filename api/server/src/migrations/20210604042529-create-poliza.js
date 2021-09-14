'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Polizas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro: {
        type: Sequelize.INTEGER
      },
      contado: {
        type: Sequelize.BOOLEAN
      },
      primaTotal: {
        type: Sequelize.DECIMAL
      },
      comision: {
        type: Sequelize.DECIMAL
      },
      observaciones: {
        type: Sequelize.STRING
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
      estado: {
        type: Sequelize.BOOLEAN
      },      
      companiaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Compania',
            key: 'id',
            as: 'companiaId'
          }
      },      
      clienteId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Clientes',
            key: 'id',
            as: 'clienteId'
          }
      },
      usuarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id',
            as: 'usuarioId'
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
      productoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Productos',
            key: 'id',
            as: 'productoId'
          }
      },
      cotizacionId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Cotizacions',
            key: 'id',
            as: 'cotizacionId'
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
    await queryInterface.dropTable('Polizas');
  }
};