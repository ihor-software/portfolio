'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('VirtualAssistantChatMessages', 'containsAppointmentsList', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('VirtualAssistantChatMessages', 'containsAppointmentsList');
  },
};
