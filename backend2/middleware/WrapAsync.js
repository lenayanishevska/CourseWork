const ApiError = require("../error/ApiError");

module.exports = function (method) {
  return function (req, res, next) {
    method(req, res, next).then(data => {
      res.json({ success: true, data });
    }).catch(error => {
      if (error instanceof ApiError) {
        res.status(error.status);
        res.json({ success: false, message: error.message });
        return false;
      }
      res.json({ success: false, message: error.message });
    })
  };
};
