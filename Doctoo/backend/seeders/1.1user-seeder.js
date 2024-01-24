const faker = require('@faker-js/faker').faker;
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('Password123', 10);

    const demoPatient = [...Array(1)].map(() => {
      const gender = faker.person.sex();
      const firstName = faker.person.firstName(gender);
      const lastName = faker.person.lastName(gender);
      return {
        gender_cd: 'male',
        first_name: firstName,
        last_name: lastName,
        email: 'gracetomlinson26@gmail.com',
        phone_number: faker.phone.number('+380 ### ## ## ##'),
        role_cd: 'patient',
        is_confirmed: true,
        currentHashedRefreshToken: '',
        isRegisteredWithGoogle: false,
        password: hashedPassword,
        stripeCustomerId: 'cus_OcevvnfFFpHDJl',
      };
    });

    return await queryInterface.bulkInsert('Users', demoPatient, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
