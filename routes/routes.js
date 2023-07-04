const express = require('express');

let router = express.Router()

router.use('/users',require("../components/users/routes"));
router.use('/auth',require("../components/auth/routes"));

module.exports = router;