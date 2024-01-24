const faker = require('@faker-js/faker').faker;
const bcrypt = require('bcryptjs');
const fs = require('fs/promises');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('Password123', 10);
    let maleCounter = 0;
    let femaleCounter = 0;
    const maleTextData = (
      await fs.readFile('dist/seeders/data_source/avatars-male.json')
    ).toString();
    const femaleTextData = (
      await fs.readFile('dist/seeders/data_source/avatars-female.json')
    ).toString();
    const men = JSON.parse(maleTextData);
    const women = JSON.parse(femaleTextData);

    const demoDoctors = [...Array(120)].map(() => {
      const gender = faker.person.sex();
      const firstName = faker.person.firstName(gender);
      const lastName = faker.person.lastName(gender);

      return {
        gender_cd: gender,
        first_name: firstName,
        last_name: lastName,
        email: faker.internet.email({ firstName, lastName }),
        phone_number: faker.phone.number('+380 ### ## ## ##'),
        role_cd: 'doctor',
        avatar: gender === 'male' ? men[maleCounter++ % 27].url : women[femaleCounter++ % 27].url,
        is_confirmed: true,
        currentHashedRefreshToken: '',
        isRegisteredWithGoogle: false,
        password: hashedPassword,
      };
    });

    return await queryInterface.bulkInsert('Users', demoDoctors, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
