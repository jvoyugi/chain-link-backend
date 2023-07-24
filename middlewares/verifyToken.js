const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.session.token;
  let userId = req.session.userId;
  if (!token) {
    return res.status(403).send({
      message: "No authorization token provided!",
    });
  }
  jwt.verify(token,
    process.env.PRIVATE_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      userId === decoded.id ? next(req, res) :
        res.status(401).send({ message: "Unauthorized!" });
    });
};
module.exports = verifyToken;