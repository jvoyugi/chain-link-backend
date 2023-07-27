const validator = require('validator');
const bcrypt = require("bcrypt")
const TransactionModel = require('./../transactions/model');


exports.getSales = async (req, res) => {
    TransactionModel.aggregate([
        {
            $group: {
                _id: "$status", // Use _id instead of description as the grouping key
                total: { $sum: "$amount" }
            }
        }
    ])
        .then(users => res.status(200).json(users))
        .catch(err => {
            res.status(404).json({ error: "No users found" });
        });
};
//
// exports.getPerBusinessSales = async (req, res) => {
//
//     const businesses = TransactionModel.aggregate([
//         // for()
//         {
//             $group: {
//                 _id: "$businessName", // Use _id instead of description as the grouping key
//             }
//         }
//     ])
//         .then(
//             TransactionModel.aggregate([
//                 {
//                     $group: {
//                         _id: "$status", // Use _id instead of description as the grouping key
//                         total: { $sum: "$amount" }
//                     }}
//
//
//             businesses =>{
//
//
//
//                 db.listingsAndReviews.aggregate([
//                     { $match : { property_type : "House" } },  { $limit: 2 },  { $project: {    "name": 1,    "bedrooms": 1,    "price": 1  }}])
//
//
//             }res.status(200).json(users)
//
//         )
//         .catch(err => {
//             res.status(404).json({ error: "No users found" });
//         });
// };



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