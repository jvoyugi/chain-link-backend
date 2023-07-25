let router = require('express').Router();
const verifyToken = require('../../middlewares/verifyToken');
const controller = require("./controller");

router.get('/sales', async (req, res) => {
    verifyToken(req, res, controller.getSales);
});
router.get('/moneyOut', async (req, res) => {
    verifyToken(req, res, controller.getMoneyOut);
});
router.get('/debts', async (req, res) => {
    verifyToken(req, res, controller.getDebts);
});

module.exports = router;