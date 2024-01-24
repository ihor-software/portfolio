'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PatientsMedicalConds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      medical_condition_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'MedicalConditions',
          key: 'id',
        },
      },
      patient_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients',
          key: 'user_id',
        },
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PatientsMedicalConds');
  },
};
