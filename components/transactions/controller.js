const TransactionModel = require('./model');
const BusinessModel = require("../business/model");

exports.getAll = async (req, res) => {
  TransactionModel
    .find({ addedBy: req.session.userId })
    .populate("businessName", "businessName", BusinessModel)
    .then(transactions => { res.status(200).json(transactions) })
    .catch(err => {
      res.status(404).json({ error: "No transactions found" });
    });
};

exports.getById = async (req, res) => {
  TransactionModel
    .findById(req.params.id)
    .then(transaction => res.status(200).json(transaction))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};

exports.createTransaction = async (req, res) => {
  let transaction = req.body;
  if (transaction.businessName) {
    const business = await BusinessModel.findOne({ businessName: transaction.businessName }).exec();
    transaction.businessName = business;
  }
  let transactionModel = new TransactionModel(transaction);
  transactionModel.addedBy = req.session.userId;
  transactionModel.save()
    .then((transaction) => {
      res.status(201).json(transaction);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
};

exports.deleteTransaction = async (req, res) => {
  TransactionModel
    .findByIdAndDelete(req.params.id)
    .then(transaction => res.status(200).json(transaction))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};

exports.updateTransaction = async (req, res) => {
  let transaction = req.body;
  if (transaction.businessName) {
    const business = await BusinessModel.findOne({ businessName: transaction.businessName }).exec();
    transaction.businessName = business;
  }
  TransactionModel.findByIdAndUpdate(req.params.id, transaction, { new: true })
    .then(updatedTransaction => res.status(200).json(updatedTransaction))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};