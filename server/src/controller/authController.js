import Joi from "joi";
import Account from "../models/accountModel.js";

// 로컬 회원가입
export const localSignup = async (req, res) => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .pattern(/^[a-zA-Z0-9가-힣]/)
      .min(2)
      .max(10)
      .required(),
    email: Joi.string()
      .pattern(/\S+@\S+\.\S+/)
      .required(),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .min(8)
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  /*  아이디,이메일 중복처리 */
  try {
    const existing = await Account.findByEmailOrUsername(req.body);

    if (existing) {
      // 중복되는 닉네임/이메일이 있을 경우
      res.status(409).json({
        key: existing.email === req.body.email ? "email" : "username",
      });
      return;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }

  /*  계정생성 */
  let account = null;
  try {
    account = await Account.createAccount(req.body);
    res.status(201).json({ success: true }); // .json(account.profile);
    return;
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }
};

// 로컬 로그인
export const localLogin = async (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { email, password } = req.body;
  const findUser = await Account.findOne({ email: email });

  let account = null;
  try {
    // 이메일로 계정 찾기
    account = await Account.findByEmail(email);
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }

  // if (!account || !account.validatePassword(password)) {
  //   // 유저가 존재하지 않거나 || 비밀번호가 일치하지 않으면
  //   res.sendStatus(403); // Forbidden
  //   return;
  // }
  if (!account) {
    // 계정이 없는 경우
    res.status(401).json({ error: "Account not found" }); // Not Found
    return;
  }

  if (!account.validatePassword(password)) {
    // 비밀번호가 일치하지 않는 경우
    res.status(401).json({ error: "Incorrect password" }); // Forbidden
    return;
  }
  // console.log(account);
  try {
    // await Account.generateToken();
    const token = await account.generateToken();

    const { accessToken, refreshToken } = token;

    const update = { $set: { refreshToken } };
    await Account.updateOne(findUser, update);

    res.cookie("refresh_token", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.status(200).send("ok");
    // return;
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }
  // ctx.body = account.profile;
};

// 로그아웃
export const logout = async (req, res) => {
  const cookies = req.cookies.refresh_token;

  try {
    Account.updateOne(
      { refreshToken: req.cookies.refresh_token },
      { $unset: { refreshToken: "" } }
    );
    // res.send = "logout";
    res.clearCookie("refresh_token", {
      httpOnly: true,
    });
    res.status(200).send("로그아웃 완료");
    return;
  } catch {
    res.status(500).send("로그아웃 실패");
    return;
  }
};
