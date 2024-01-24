'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patient_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      doctor_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.addConstraint('Chats', {
      type: 'unique',
      fields: ['patient_id', 'doctor_id'],
      name: 'unique_patient_doctor_chat',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Chats', 'unique_patient_doctor_chat');
    await queryInterface.dropTable('Chats');
  },
};
