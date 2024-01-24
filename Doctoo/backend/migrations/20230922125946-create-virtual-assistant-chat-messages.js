'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VirtualAssistantChatMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      isVisible: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      containsDoctorsList: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VirtualAssistantChatMessages');
  },
};
