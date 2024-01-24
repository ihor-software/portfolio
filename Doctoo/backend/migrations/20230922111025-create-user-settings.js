'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserSettings', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      isEmailNotification: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isTwoFactor: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isRequiredBillApproval: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserSettings');
  },
};
