// biome-ignore lint/suspicious/noRedundantUseStrict: <explanation>
"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Smartphones", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			price: {
				type: Sequelize.INTEGER,
			},
			qty: {
				type: Sequelize.INTEGER,
			},
			UserId: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Smartphones");
	},
};
