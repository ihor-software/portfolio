module.exports = {
  async up(queryInterface) {
    const mockAppointments = [
      {
        date_time: '2023-08-28T20:45:00',
        doctor_id: 6,
        patient_id: 1,
        status_cd: 'Planned',
        is_visited: false,
        is_paid: false,
        is_notified_time: false,
        is_notified_pay: false,
        createdAt: '2023-08-28T20:45:00',
        updatedAt: '2023-08-28T20:45:00',
      },
      {
        date_time: '2023-08-30T20:45:00',
        doctor_id: 7,
        patient_id: 1,
        status_cd: 'Planned',
        is_visited: false,
        is_paid: false,
        is_notified_time: false,
        is_notified_pay: false,
        createdAt: '2023-08-28T20:45:00',
        updatedAt: '2023-08-28T20:45:00',
      },
      {
        date_time: '2023-08-30T21:45:00',
        doctor_id: 6,
        patient_id: 1,
        status_cd: 'Planned',
        is_visited: false,
        is_paid: false,
        is_notified_time: false,
        is_notified_pay: false,
        createdAt: '2023-08-28T20:45:00',
        updatedAt: '2023-08-28T20:45:00',
      },
      {
        date_time: '2023-08-31T18:00:00',
        doctor_id: 6,
        patient_id: 1,
        status_cd: 'Completed',
        is_visited: true,
        is_paid: false,
        is_notified_time: true,
        is_notified_pay: false,
        createdAt: '2023-08-28T20:45:00',
        updatedAt: '2023-08-28T20:45:00',
      },
      {
        date_time: '2023-08-31T21:00:00',
        doctor_id: 10,
        patient_id: 1,
        status_cd: 'Planned',
        is_visited: false,
        is_paid: false,
        is_notified_time: false,
        is_notified_pay: false,
        createdAt: '2023-08-28T20:45:00',
        updatedAt: '2023-08-28T20:45:00',
      },
      {
        date_time: '2023-08-31T00:00:00',
        doctor_id: 10,
        patient_id: 1,
        status_cd: 'Planned',
        is_visited: true,
        is_paid: false,
        is_notified_time: true,
        is_notified_pay: false,
        createdAt: '2023-08-28T20:45:00',
        updatedAt: '2023-08-28T20:45:00',
      },
      {
        date_time: '2023-09-30T00:00:00',
        doctor_id: 16,
        patient_id: 1,
        status_cd: 'Planned',
        is_visited: false,
        is_paid: false,
        is_notified_time: false,
        is_notified_pay: false,
        createdAt: '2023-09-28T20:45:00',
        updatedAt: '2023-09-28T20:45:00',
      },
      {
        date_time: '2023-09-04T00:00:00',
        doctor_id: 10,
        patient_id: 1,
        status_cd: 'Planned',
        is_visited: false,
        is_paid: false,
        is_notified_time: false,
        is_notified_pay: false,
        createdAt: '2023-08-28T20:45:00',
        updatedAt: '2023-08-28T20:45:00',
      },
      {
        date_time: '2023-08-31T09:00:00',
        doctor_id: 10,
        patient_id: 1,
        status_cd: 'Planned',
        is_visited: true,
        is_paid: false,
        is_notified_time: true,
        is_notified_pay: false,
        createdAt: '2023-08-28T20:45:00',
        updatedAt: '2023-08-28T20:45:00',
      },
      {
        date_time: '2023-09-15T18:00:00',
        doctor_id: 2,
        patient_id: 1,
        status_cd: 'Planned',
        is_visited: false,
        is_paid: false,
        is_notified_time: false,
        is_notified_pay: false,
        createdAt: '2023-09-11T00:00:00',
        updatedAt: '2023-09-11T00:00:00',
      },
    ];

    return await queryInterface.bulkInsert('Appointments', mockAppointments, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Appointments', null, {});
  },
};