const TransactionModel = require('./model');

exports.getAll = async (req, res) => {
  TransactionSchema
    .find()
    .then(transactions => res.status(200).json(transactions))
    .catch(err => {
      res.status(404).json({ error: "No transactions found" });
    });
};

exports.getById = async (req, res) => {
  UserModel
    .findById(req.params.id)
    .then(transaction => res.status(200).json(transaction))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};

exports.createTransaction = async (req, res) => {
  let transaction = req.body;
  let transactionModel = new UserModel(transaction);
  transactionModel.save()
    .then((transaction) => {
      res.status(201).json(transaction);
    })
    .catch((err) => {
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
  UserModel.findByIdAndUpdate(req.params.id, transaction, { new: true })
    .then(updatedTransaction => res.status(200).json(updatedTransaction))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};