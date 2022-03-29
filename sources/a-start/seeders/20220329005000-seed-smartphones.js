"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const smartphones = require("../db/smartphone.json");

    smartphones.forEach((smartphone) => {
      smartphone.createdAt = new Date();
      smartphone.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Smartphones", smartphones, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Smartphones", null, {});
  },
};
