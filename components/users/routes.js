let router = require('express').Router();

router.get('/', function(req, res) {
  res.json({ data: [] });
});

router.get('/:id', function(req, res) {
  res.json({ message: "Get" });
});

router.post('/', function(req, res) {
  res.json({ message: "Post" });
});

router.delete('/:id', function(req, res) {
  res.json({ message: "Delete" });
});

router.patch('/:id', function(req, res) {
  res.json({ message: "Path" });
});
module.exports = router;