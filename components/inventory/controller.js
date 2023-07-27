const InventoryModel = require('./model');
const BusinessModel = require("../business/model");

exports.getAll = async (req, res) => {
  InventoryModel
    .find({ addedBy: req.session.userId })
    .populate("businessName", "businessName", BusinessModel)
    .then(inventory => res.status(200).json(inventory))
    .catch(err => {
      console.error(err);
      res.status(404).json([]);
    });
};

exports.getById = async (req, res) => {
  InventoryModel
    .findById(req.params.id)
    .then(inventory => res.status(200).json(inventory))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};

exports.createInventory = async (req, res) => {
  let inventory = req.body;
  if (inventory.businessName) {
    const business = await BusinessModel.findOne({ businessName: inventory.businessName }).exec();
    inventory.businessName = business;
  }
  let inventoryModel = new InventoryModel(inventory);
  inventoryModel.dateAdded = new Date();
  inventoryModel.dateEdited = new Date();
  inventoryModel.addedBy = req.session.userId;
  inventoryModel.save()
    .then((newInventory) => {
      res.status(201).json(newInventory);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.deleteInventory = async (req, res) => {
  InventoryModel
    .findByIdAndDelete(req.params.id)
    .then(inventory => res.status(200).json(inventory))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};

exports.updateInventory = async (req, res) => {
  let inventory = req.body;
  if (inventory.businessName) {
    const business = await BusinessModel.findOne({ businessName: inventory.businessName }).exec();
    inventory.businessName = business;
  }
  inventory.dateEdited=new Date();
  InventoryModel.findByIdAndUpdate(req.params.id, inventory, { new: true })
    .then(updatedInventory => res.status(200).json(updatedInventory))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};