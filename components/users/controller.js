const validator = require('validator');
const bcrypt = require("bcrypt")
const UserModel = require('./model');

exports.getAll = async (req, res) => {
  UserModel
    .find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      res.status(404).json({ error: "No users found" });
    });
};

exports.getById = async (req, res) => {
  UserModel
    .findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};

exports.createUser = async (req, res) => {
  let user = req.body;
  if (validator.isStrongPassword(user?.password)) {
    bcrypt.hash(user.password, 10)
      .then(hash => {
        user.password = hash;
        let userModel = new UserModel(user);
        userModel.save()
          .then((doc) => {
            res.status(201).json(doc);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
};

exports.deleteUser = async (req, res) => {
  UserModel
    .findByIdAndDelete(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};

exports.updateUser = async (req, res) => {
  let user = req.body;
  UserModel.findByIdAndUpdate(req.params.id, user, { new: true })
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};