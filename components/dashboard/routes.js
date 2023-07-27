let router = require('express').Router();
const verifyToken = require('../../middlewares/verifyToken');
const controller = require("./controller");

router.get('/sales', async (req, res) => {
    verifyToken(req, res, controller.getSales);
});
router.get('/sales/summary', async (req, res) => {
    verifyToken(req, res, controller.getPerBusinessSales);
});
module.exports = router;