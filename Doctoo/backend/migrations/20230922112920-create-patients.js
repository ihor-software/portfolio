'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Patients', {
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
      height: {
        allowNull: true,
        type: Sequelize.FLOAT(1),
      },
      weight: {
        allowNull: true,
        type: Sequelize.FLOAT(1),
      },
      bloodtype: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      family_doctor_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Doctors',
          key: 'user_id',
        },
      },
      declaration_number: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Patients', { cascade: true });
  },
};
