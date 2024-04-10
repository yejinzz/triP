const Account = require("../models/accountModel");

exports.userAuthentication = async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;
  const findUser = await Account.findOne({ refreshToken }).exec();
  if (!findUser) {
    return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
  }
  req.token = refreshToken;
  req.user = findUser;
  next();
};
