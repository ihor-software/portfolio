module.exports = {
  async up(queryInterface) {
    const hospitals = [
      { hospital_id: 1, name: 'General Hospital' },
      { hospital_id: 2, name: 'City Medical Center' },
      { hospital_id: 3, name: 'Central Health Clinic' },
      { hospital_id: 4, name: 'Community Hospital' },
      { hospital_id: 5, name: 'Regional Medical Center' },
      { hospital_id: 6, name: 'University Hospital' },
      { hospital_id: 7, name: "Children's Medical Center" },
      { hospital_id: 8, name: 'Veterans Memorial Hospital' },
      { hospital_id: 9, name: "Saint Mary's Hospital" },
      { hospital_id: 10, name: 'Sunrise Medical Center' },
      { hospital_id: 11, name: 'Grace Healthcare Hospital' },
      { hospital_id: 12, name: 'Harborview Medical Center' },
      { hospital_id: 13, name: 'Green Valley Community Hospital' },
      { hospital_id: 14, name: 'Mercy Hospital' },
      { hospital_id: 15, name: 'Hillside Medical Center' },
      { hospital_id: 16, name: 'Hope General Hospital' },
      { hospital_id: 17, name: 'Pineview Hospital' },
      { hospital_id: 18, name: 'Maplewood Regional Clinic' },
      { hospital_id: 19, name: 'Oceanfront Health Center' },
      { hospital_id: 20, name: 'Sunnybrook Medical Facility' },
      { hospital_id: 21, name: 'Cedar Grove Hospital' },
      { hospital_id: 22, name: 'Blue Ridge Medical Center' },
      { hospital_id: 23, name: 'Valley View Clinic' },
      { hospital_id: 24, name: 'Golden State Medical Center' },
      { hospital_id: 25, name: 'Trinity Hospital' },
      { hospital_id: 26, name: 'Westside Wellness Clinic' },
      { hospital_id: 27, name: 'Northwind Health Services' },
      { hospital_id: 28, name: 'Riverside Community Hospital' },
      { hospital_id: 29, name: 'Meadowview Medical Center' },
      { hospital_id: 30, name: 'Oakwood General Hospital' },
    ];

    return await queryInterface.bulkInsert('Hospitals', hospitals, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Hospitals', null, {});
  },
};
