module.exports = {
  async up(queryInterface) {
    const doctorSpecialties = [
      { specialty_id: 1, specialty: 'Cardiology' },
      { specialty_id: 2, specialty: 'Dermatology' },
      { specialty_id: 3, specialty: 'Endocrinology' },
      { specialty_id: 4, specialty: 'Gastroenterology' },
      { specialty_id: 5, specialty: 'Hematology' },
      { specialty_id: 6, specialty: 'Infectious Diseases' },
      { specialty_id: 7, specialty: 'Neurology' },
      { specialty_id: 8, specialty: 'Obstetrics and Gynecology' },
      { specialty_id: 9, specialty: 'Oncology' },
      { specialty_id: 10, specialty: 'Ophthalmology' },
      { specialty_id: 11, specialty: 'Orthopedics' },
      { specialty_id: 12, specialty: 'Otolaryngology (ENT)' },
      { specialty_id: 13, specialty: 'Pediatrics' },
      { specialty_id: 14, specialty: 'Psychiatry' },
      { specialty_id: 15, specialty: 'Radiology' },
      { specialty_id: 16, specialty: 'Surgery' },
      { specialty_id: 17, specialty: 'Urology' },
      { specialty_id: 18, specialty: 'Nephrology' },
      { specialty_id: 19, specialty: 'Rheumatology' },
      { specialty_id: 20, specialty: 'Allergy and Immunology' },
      { specialty_id: 21, specialty: 'Emergency Medicine' },
      { specialty_id: 22, specialty: 'Family Medicine' },
      { specialty_id: 23, specialty: 'Internal Medicine' },
      { specialty_id: 24, specialty: 'Physical Medicine and Rehabilitation' },
      { specialty_id: 25, specialty: 'Anesthesiology' },
      { specialty_id: 26, specialty: 'Pulmonology' },
    ];
    return await queryInterface.bulkInsert('Doctor_specialties', doctorSpecialties, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Doctor_specialties', null, {});
  },
};
