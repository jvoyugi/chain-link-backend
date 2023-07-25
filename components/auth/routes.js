let router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
let UserModel = require('../users/model');

router.post('/login', async (req, res) => {
  UserModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      bcrypt.compare(req?.body?.password, user.password, (err, data) => {
        if (err) throw err
        if (data) {
          const token = jwt.sign({ userId: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) },
            process.env.PRIVATE_KEY);

          req.session.userId = user.id;
          req.session.token = token;
          res.status(200).json({ message: "Login success" })
        } else {
          res.status(401).json({ msg: "Invalid credentials" })
        }

      })
    });
});

router.post('/logout', async (req, res) => {
  req.session = null;
  res.json({ message: "Logout success" });
});

module.exports = router;