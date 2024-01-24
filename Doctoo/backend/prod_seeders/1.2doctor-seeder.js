const faker = require('@faker-js/faker').faker;
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('Password123', 10);

    const demoDoctors = [
      {
        gender_cd: 'male',
        first_name: 'Dave',
        last_name: 'Hintz',
        email: 'doctor@doctoo.org',
        phone_number: faker.phone.number('+380 ### ## ## ##'),
        role_cd: 'doctor',
        is_confirmed: true,
        currentHashedRefreshToken: '',
        isRegisteredWithGoogle: false,
        password: hashedPassword,
      },
      {
        gender_cd: 'male',
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bob.smith@doctoo.org',
        phone_number: faker.phone.number('+380 ### ## ## ##'),
        role_cd: 'doctor',
        is_confirmed: true,
        currentHashedRefreshToken: '',
        isRegisteredWithGoogle: false,
        password: hashedPassword,
      },
    ];

    return await queryInterface.bulkInsert('Users', demoDoctors, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
