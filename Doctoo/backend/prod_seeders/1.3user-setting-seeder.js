module.exports = {
  async up(queryInterface) {
    const userSettings = [
      {
        user_id: 1,
      },
      {
        user_id: 2,
      },
    ];

    return await queryInterface.bulkInsert('UserSettings', userSettings, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('UserSettings', null, {});
  },
};
