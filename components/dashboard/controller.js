const validator = require('validator');
const bcrypt = require("bcrypt")
const TransactionModel = require('./../transactions/model');
const BusinessModel = require("../business/model");


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

exports.getPerBusinessSales = async (req, res) => {
    BusinessModel.find().then(async businesses => {
        let summary = [];
        for (const business of businesses) {
            await TransactionModel.aggregate([
                { $match: { businessName: business.businessName } },
                { $group: { _id: "$status", total: { $sum: "$amount" } } }
            ]).then(statuses => {
                let data = {};
                statuses.forEach(status => {
                    data[status._id] = status.total;
                })
                summary.push({ [business.businessName]: data });
            })
        }
        res.status(200).json(summary);
    }).catch(err => {
        console.log(err);
        res.status(404).json({ error: "No users found" });
    })


    // .then(summary => res.status(200).json(summary))
    // .catch(err => {
    //     console.log(err);
    //     res.status(404).json({ error: "No users found" });
    // })
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