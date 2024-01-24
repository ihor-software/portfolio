'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chat_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Chats',
          key: 'id',
        },
      },
      message_text: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      file: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  },
};
