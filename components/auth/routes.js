let router = require('express').Router();

router.post('/login', function(req, res) {
  res.json({ message: "Post" });
});

router.post('/logout', function(req, res) {
  res.json({ message: "Delete" });
});

module.exports = router;