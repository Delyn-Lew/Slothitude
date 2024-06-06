const { getUser } = require("./checkToken");
// to check if user is authenticated
module.exports = function (req, res, next) {
  // Status code of 401 is Unauthorized
  const user = getUser(req, res);
  if (!user) return res.status(401).json("Unauthorized");
  // A okay
  next();
};
