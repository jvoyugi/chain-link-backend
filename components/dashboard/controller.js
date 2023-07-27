const validator = require('validator');
const bcrypt = require("bcrypt")
const TransactionModel = require('./../transactions/model');


exports.getSales = async (req, res) => {
    TransactionModel.aggregate([
        {
            $group: {
                _id: "$description", // Use _id instead of description as the grouping key
                total: { $sum: "$amount" }
            }
        }
    ])
        .then(users => res.status(200).json(users))
        .catch(err => {
            res.status(404).json({ error: "No users found" });
        });
};



exports.getMoneyOut = async (req, res) => {
    TransactionModel
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            res.status(404).json({ error: "No users found" });
        });
};
exports.getDebts = async (req, res) => {
    TransactionModel
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            res.status(404).json({ error: "No users found" });
        });
};

exports.getRecent = async (req, res) => {
    BusinessModel
        .find()
        .then(businesses => res.status(200).json(businesses))
        .catch(err => {
            res.status(404).json([]);
        });
};