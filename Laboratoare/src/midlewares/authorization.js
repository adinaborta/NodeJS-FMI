const jwt = require("jsonwebtoken");
const MY_SECRET_KEY = require("./../config/jwt.js");
const authorizationMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    try {
      const isValid = jwt.verify(
        authorization.replace("Bearer ", ""),
        MY_SECRET_KEY
      );
      next();
    } catch (err) {
      res.send(err);
    }
  }
};

module.exports = authorizationMiddleware;
