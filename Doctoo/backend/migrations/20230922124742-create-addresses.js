'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country_code: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Countries',
          key: 'code',
        },
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      zip_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      appartment: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients',
          key: 'user_id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Addresses');
  },
};
