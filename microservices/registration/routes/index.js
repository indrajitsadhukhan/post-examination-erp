var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ message: 'Registration api v0.1'});
});

module.exports = router;
