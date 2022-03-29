const express = require("express");
const router = express.Router();
const smartphoneController = require("../controllers/smartphone-controller.js");

// GET /smartphones/
router.get("/", smartphoneController.getRootSmartphoneHandler);

// POST /smartphones/
router.post("/", smartphoneController.postRootSmartphoneHandler);

// GET /smarphones/:smartphoneId
router.get("/:smartphoneId", smartphoneController.getSmartphoneDetailHandler);

module.exports = router;
