const express = require('express');

let router = express.Router()

router.use('/users',require("../components/users/routes"));
router.use('/auth',require("../components/auth/routes"));
router.use('/dashboard',require("../components/dashboard/routes"));
router.use('/business',require("../components/business/routes"));
router.use('/transactions',require("../components/transactions/routes"));

module.exports = router;