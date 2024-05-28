import Account from "../models/accountModel.js";

const userAuthentication = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    const findUser = await Account.findOne({ refreshToken }).exec();
    if (!findUser) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    req.user = findUser;
    next();
  } catch (err) {
    // 에러 발생 시 500 에러 반환
    console.error(err);
    res.status(500).json({ error: "서버 에러" });
  }
};
export default userAuthentication;
