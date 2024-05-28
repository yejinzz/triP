// const Account = require("../models/accountModel");
import Account from "../models/accountModel.js";
import hashPassword from "../lib/hashPassword.js";
// const { hashPassword } = require("../lib/hashPassword");
// 계정 조회
export const patchUserInfo = async (req, res) => {
  const updateData = { ...req.body };

  const userId = req.params.id;
  console.log(req.user);
  // 닉네임이 있을 경우 중복 확인
  if (req.body.username && req.body.username !== req.user.username) {
    const existing = await Account.findByUsername(req.body.username);
    if (existing) {
      res.status(409).send("중복된 닉네임입니다");
      return;
    }
  }

  // 패스워드 변경 요청시 해당 계정의 비밀번호 일치 여부 확인
  if (req.body.curruntPwd) {
    let account;
    try {
      account = await Account.findOne({ _id: userId });
    } catch (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!account.validatePassword(req.body.curruntPwd)) {
      res.status(401).send("현재 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 일치하면 새 비밀번호 해쉬화
    delete updateData.curruntPwd;
    const hashedPassword = hashPassword(updateData.username);
    updateData.password = hashedPassword;
  }

  await Account.updateOne({ _id: userId }, { $set: updateData });

  return res.status(200).send("변경 완료");
};

export const getUserInfo = async (req, res) => {
  try {
    if (req.user)
      res.status(200).json({
        userid: req.user._id,
        username: req.user.username,
        thumbnail: req.user.thumbnail,
        email: req.user.email,
        createdAt: req.user.createdAt,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Account.deleteOne({ _id: req.user._id });
    res.status(200).send("계정 삭제 완료");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
