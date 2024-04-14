const crypto = require("crypto");

exports.hashPassword = (pw) => {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(pw)
    .digest("hex");
};
