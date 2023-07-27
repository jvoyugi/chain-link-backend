const router = require('express').Router();
const verifyToken = require('../../middlewares/verifyToken');
const controller = require("./controller");

router.get('/', async (req, res) => {
  verifyToken(req, res, controller.getAll);
});

router.get('/:id', async (req, res) => {
  verifyToken(req, res, controller.getById);
});

router.post('/', async (req, res) => {
  verifyToken(req, res, controller.createInventory);
});

router.delete('/:id', async (req, res) => {
  verifyToken(req, res, controller.deleteInventory);
});

router.patch('/:id', async (req, res) => {
  verifyToken(req, res, controller.updateInventory);
});

module.exports = router;