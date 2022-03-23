var express = require("express");
var router = express.Router();
const { registerUser } = require("./users/registration");

router.get("/register", async (req, res) => {
  registerUser(req, res);
});

module.exports = router;
