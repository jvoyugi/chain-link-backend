let router = require('express').Router();
const bcrypt = require("bcrypt")
let UserModel = require('../users/model');

router.post('/login', function (req, res) {
  UserModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: "User not exist" });
      bcrypt.compare(req?.body?.password, user.password, (err, data) => {
        if (err) throw err
        if (data) {
          res.status(200).json({ msg: "Login success" })
        } else {
          res.status(401).json({ msg: "Invalid credentials" })
        }

      })
    });
});

router.post('/logout', function (req, res) {
  res.json({ message: "Logout" });
});

module.exports = router;