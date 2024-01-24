'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      review_text: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      patient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients',
          key: 'user_id',
        },
      },
      doctor_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Doctors',
          key: 'user_id',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  },
};
