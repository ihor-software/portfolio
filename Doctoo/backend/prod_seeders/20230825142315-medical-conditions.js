'use strict';
const fs = require('fs/promises');

module.exports = {
  async up(queryInterface, Sequelize) {
    const seedData = (
      await fs.readFile('dist/seeders/data_source/medical_conditions.txt', { encoding: 'utf8' })
    )
      .split('\n')
      .map(cond => ({
        name: cond,
      }));
    await queryInterface.bulkInsert('MedicalConditions', seedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MedicalConditions', null, {});
  },
};
