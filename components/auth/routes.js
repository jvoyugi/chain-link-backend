let router = require('express').Router();

router.post('/login', function(req, res) {
  res.json({ message: "Login" });
});

router.post('/logout', function(req, res) {
  res.json({ message: "Logout" });
});

module.exports = router;