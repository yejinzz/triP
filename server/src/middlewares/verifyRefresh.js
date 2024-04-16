const jwt = require("jsonwebtoken");
const Account = require("../models/accountModel");

exports.verifyAccessToken = (req, res, next) => {
  // auth에서 access token을 획득합니다.
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer 제거

  // access token 검증
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // access token이 만료된 경우 재생성하기;
    if (err) {
      req.expired = true; // 다음 미들웨어에 expired 프로퍼티에 true를 담아 보낸다.
      console.error(err.name, ":", err.message);
    }
    req.user = user;
    next();
  });
};

exports.replaceAccessToken = async (req, res, next) => {
  if (req.expired) {
    try {
      const cookies = req.cookies;
      // 쿠키가 없는 경우
      // console.log(cookies);
      if (!cookies?.refresh_token)
        return res
          .status(403)
          .send({ msg: "엑세스 토큰 재발급을 위한 쿠키 없음" });

      // 쿠키가 있으면
      const refreshToken = cookies.refresh_token;
      // DB에 저장된 쿠키가 있는지 확인
      const user = await Account.findOne({ refreshToken });
      if (!user)
        return res
          .status(403)
          .send({ msg: "해당 쿠키에는 등록된 리프레시 토큰이 없음" });
      // 쿠키 검증
      jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, user) => {
        // refresh token이 만료된 경우 재로그인 안내
        if (err) {
          return res
            .status(403)
            .send({ msg: "리프레시 토큰이 만료됨 (재 로그인 필요)" });
        }
        const decoded = jwt.decode(refreshToken);

        const accessToken = jwt.sign(
          {
            _id: decoded._id,
            email: decoded.email,
            username: decoded.username,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1m" }
        );
        req.user = user;

        res.header("Authorization", `Bearer ${accessToken}`);
      });
      next();
    } catch (err) {
      console.error(err.name, ":", err.message);
      return res.status(500).send({ msg: `${err.message}` });
    }
  } else {
    next();
  }
};
