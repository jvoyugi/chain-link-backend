const validator = require('validator');
const bcrypt = require("bcrypt")
const UserModel = require('./model');

exports.getSales = async (req, res) => {
    UserModel
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            res.status(404).json({ error: "No users found" });
        });
};
exports.getMoneyOut = async (req, res) => {
    UserModel
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            res.status(404).json({ error: "No users found" });
        });
};
exports.getDebts = async (req, res) => {
    UserModel
        .find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            res.status(404).json({ error: "No users found" });
        });
};