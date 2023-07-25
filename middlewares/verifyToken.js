const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  if (!req.session) {
    return res.status(403).send({
      message: "No authorization token provided!",
    });
  }
  req.session.userId ? next(req, res) :
    res.status(401).send({ message: "Unauthorized!" });
};
module.exports = verifyToken;