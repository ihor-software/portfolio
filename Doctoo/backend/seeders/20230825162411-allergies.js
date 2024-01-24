'use strict';
const fs = require('fs/promises');

module.exports = {
  async up(queryInterface, Sequelize) {
    const seedData = (await fs.readFile('seeders/data_source/allergies.txt', { encoding: 'utf8' }))
      .split('\n')
      .map(cond => ({
        name: cond,
      }));
    await queryInterface.bulkInsert('Allergies', seedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Allergies', null, {});
  },
};
