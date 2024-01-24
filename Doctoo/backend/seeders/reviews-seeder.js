const faker = require('@faker-js/faker').faker;
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const reviews = [...Array(530)].map(() => {
      return {
        rating: Math.floor(Math.random() * 3) + 3,
        review_text: 'Good doctor!',
        doctor_id: faker.helpers.rangeToNumber({ min: 2, max: 121 }),
        createdAt: '2023-08-28T20:45:00',
        updatedAt: '2023-08-28T20:45:00',
      };
    });

    return await queryInterface.bulkInsert('Reviews', reviews, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Reviews', null, {});
  },
};
