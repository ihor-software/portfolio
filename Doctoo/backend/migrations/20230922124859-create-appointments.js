'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      rating: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      doctor_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Doctors',
          key: 'user_id',
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
      status_cd: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      is_visited: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_paid: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_notified_time: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_notified_pay: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Appointments');
  },
};
