const faker = require('@faker-js/faker').faker;

module.exports = {
  async up(queryInterface) {
    const userIdsQuery = 'SELECT id FROM "Users" WHERE role_cd = :role';
    const [userIds] = await queryInterface.sequelize.query(userIdsQuery, {
      replacements: { role: 'doctor' },
    });
    const demoDoctors = userIds.map(user => {
      return {
        user_id: user.id,
        bio: 'It is important to have a doctor who is interested in your long-term health and happiness. ',
        schedule: '9:00-18:00',
        specialty_id: faker.helpers.rangeToNumber({ min: 1, max: 26 }),
        payrate: faker.commerce.price({ min: 25, max: 200, dec: 0 }),
        available: faker.helpers.arrayElement([true, false]),
        hospital_id: faker.helpers.rangeToNumber({ min: 1, max: 30 }),
      };
    });

    return await queryInterface.bulkInsert('Doctors', demoDoctors, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Doctors', null, {});
  },
};
