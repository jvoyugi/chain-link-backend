const express = require('express');

let router = express.Router()

router.use('/users',require("../components/users/routes"))

module.exports = router;