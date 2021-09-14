'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cotizacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orden: {
        type: Sequelize.STRING
      },
      cliente: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },	    
      nro: {
        type: Sequelize.STRING
      },
      ivigencia: {
        type: Sequelize.DATE
      },
      fvigencia: {
        type: Sequelize.DATE
      },
      primaContado: {
        type: Sequelize.DECIMAL
      },
      primaCredito: {
        type: Sequelize.DECIMAL
      },
      renovacion: {
        type: Sequelize.BOOLEAN
      },
      productoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Productos',
            key: 'id',
            as: 'productoId'
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
    await queryInterface.dropTable('Cotizacions');
  }
};
