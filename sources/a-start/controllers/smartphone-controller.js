const { Smartphone } = require("../models/index.js");

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class SmartphoneController {
	static async getRootSmartphoneHandler(req, res) {
		try {
			const smartphones = await Smartphone.findAll({
				attributes: ["id", "name"],
			});

			res.status(200).json({
				statusCode: 200,
				data: smartphones,
			});
		} catch (err) {
			res.status(500).json({
				statusCode: 500,
				error: err.message,
			});
		}
	}

	static async postRootSmartphoneHandler(req, res) {
		try {
			const { name, price, qty, UserId } = req.body;

			const smartphone = await Smartphone.create({
				name,
				price,
				qty,
				UserId,
			});

			res.status(201).json({
				statusCode: 201,
				data: smartphone,
			});
		} catch (err) {
			res.status(500).json({
				statusCode: 500,
				error: err.message,
			});
		}
	}

	static async getSmartphoneDetailHandler(req, res) {
		try {
			const { smartphoneId } = req.params;

			const smartphone = await Smartphone.findOne({
				where: { id: smartphoneId },
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});

			res.status(200).json({
				statusCode: 200,
				data: smartphone,
			});
		} catch (err) {
			res.status(500).json({
				statusCode: 500,
				error: err.message,
			});
		}
	}
}

module.exports = SmartphoneController;
