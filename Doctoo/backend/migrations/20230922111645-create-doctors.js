'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Doctors', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      specialty_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Doctor_specialties',
          key: 'specialty_id',
        },
      },
      payrate: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      available: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      hospital_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Hospitals',
          key: 'hospital_id',
        },
      },
      bio: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      schedule: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Doctors');
  },
};
