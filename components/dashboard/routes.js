let router = require('express').Router();
const verifyToken = require('../../middlewares/verifyToken');
const controller = require("./controller");

router.get('/sales', async (req, res) => {
    verifyToken(req, res, controller.getSales);
});
router.get('/sales/summary', async (req, res) => {
    verifyToken(req, res, controller.getPerBusinessSales);
});
router.get('/moneyOut', async (req, res) => {
    verifyToken(req, res, controller.getMoneyOut);
});
router.get('/debts', async (req, res) => {
    verifyToken(req, res, controller.getDebts);
});

router.get('/recent', async (req, res) => {
    verifyToken(req, res, controller.getRecent);
});

module.exports = router;