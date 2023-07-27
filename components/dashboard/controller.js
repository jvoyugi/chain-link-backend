const validator = require('validator');
const bcrypt = require("bcrypt")
const TransactionModel = require('./../transactions/model');
const BusinessModel = require("../business/model");
const mongoose = require("mongoose");


exports.getSales = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.session.userId);
    TransactionModel.aggregate([
        {
            $match: { addedBy: userId }
        },
        {
            $group: {
                _id: "$status",
                total: { $sum: "$amount" }
            }
        }
    ])
        .then(statuses => {
            let data = {};
            statuses.forEach(status => {
                data[status._id] = status.total;
            })
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json({ error: "No data found" });
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

exports.getPerBusinessSales = async (req, res) => {
    BusinessModel.find({ addedBy: req.session.userId }).then(async businesses => {
        let summary = [];
        for (const business of businesses) {
            await TransactionModel.aggregate([
                { $match: { businessName: business._id } },
                { $group: { _id: "$status", total: { $sum: "$amount" } } }
            ]).then(statuses => {
                let data = {};
                statuses.forEach(status => {
                    data[status._id] = status.total;
                });
                summary.push({
                    name: business.businessName,
                    status: data
                });
            })
        }
        res.status(200).json(summary);
    }).catch(err => {
        console.log(err);
        res.status(404).json({ error: "No data found" });
    })
};
