let router = require('express').Router();
let validator = require('validator');
const bcrypt = require("bcrypt")
let UserModel = require('./model');


router.get('/', function (req, res) {
  UserModel
    .find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ error: "No users found" }));
});

router.get('/:id', function (req, res) {
  UserModel
    .findOne({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: "Not Found" }));
});

router.post('/', function (req, res) {
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
      })
  }
});

router.delete('/:id', function (req, res) {
  UserModel
    .findByIdAndDelete({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: "Not Found" }));
}
);

router.patch('/:id', function (req, res) {
  let user = req.body;
  UserModel.findByIdAndUpdate({ _id: req.params.id }, user, { new: true })
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(404).json({ error: "Not Found" }));
});
module.exports = router;