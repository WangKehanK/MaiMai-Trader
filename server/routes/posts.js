var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post("/", function (request, response) {
  console.log(request.query);
  response.json(request.query);
});

module.exports = router;


