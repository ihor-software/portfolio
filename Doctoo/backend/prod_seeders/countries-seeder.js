'use strict';
const fs = require('fs/promises');

module.exports = {
  async up(queryInterface) {
    const textData = (await fs.readFile('dist/seeders/data_source/countries.json')).toString();
    const data = JSON.parse(textData);
    await queryInterface.bulkInsert('Countries', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Countries', null, {});
  },
};
