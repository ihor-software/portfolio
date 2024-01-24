'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PatientsAllergies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      allergyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Allergies',
          key: 'id',
        },
      },
      patientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients',
          key: 'user_id',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PatientsAllergies');
  },
};
