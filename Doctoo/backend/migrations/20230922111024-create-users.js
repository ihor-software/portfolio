'use strict';

const Role = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
};

const Gender = {
  MALE: 'male',
  FEMALE: 'female',
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(320),
      },
      phone_number: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(20),
      },
      role_cd: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gender_cd: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      is_confirmed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      currentHashedRefreshToken: {
        type: Sequelize.STRING,
      },
      isRegisteredWithGoogle: {
        type: Sequelize.BOOLEAN,
      },
      twoFactorAuthenticationSecret: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      avatar: {
        type: Sequelize.TEXT,
        defaultValue: process.env.USER_DEFAULT_AVATAR,
      },
      stripeCustomerId: {
        type: Sequelize.STRING,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.addConstraint('Users', {
      fields: ['role_cd'],
      type: 'check',
      name: 'role_cd_check',
      where: {
        role_cd: {
          [Sequelize.Op.in]: Object.values(Role),
        },
      },
    });

    await queryInterface.addConstraint('Users', {
      fields: ['gender_cd'],
      type: 'check',
      name: 'gender_cd_check',
      where: {
        gender_cd: {
          [Sequelize.Op.in]: Object.values(Gender),
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users', { cascade: true });
  },
};
