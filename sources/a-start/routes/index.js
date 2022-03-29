const express = require("express");
const router = express.Router();

const smartphoneRoutes = require("./smartphones.js");

router.use("/smartphones", smartphoneRoutes);

module.exports = router;
