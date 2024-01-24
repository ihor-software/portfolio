module.exports = {
  async up(queryInterface) {
    const patient = [
      {
        user_id: 1,
        height: 158,
        weight: 43,
        bloodtype: 'AB',
        family_doctor_id: 3,
        declaration_number: 'sfer3',
        createdAt: '2023-08-28T20:45:00',
        updatedAt: '2023-08-28T20:45:00',
      },
    ];

    return await queryInterface.bulkInsert('Patients', patient, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Patients', null, {});
  },
};
