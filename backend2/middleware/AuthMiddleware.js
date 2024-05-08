const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  console.log("Headers .......... ",req.headers.authorization);
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
