const Account = require("../models/accountModel");
const { hashPassword } = require("../lib/hashPassword");
// 계정 조회

// exports.getUserInfo = async (req, res) => {
//   // const refreshToken = req.cookies.refresh_token;
//   //   console.log(refreshToken);
//   try {
//     const findUser = await Account.findOne({
//       refreshToken: req.token,
//     }).exec();
//     if (!findUser) {
//       return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
//     }
//     // console.log(req.user);
//     res.status(200).json({
//       userid: findUser._id,
//       username: findUser.username,
//       thumbnail: findUser.thumbnail,
//       email: findUser.email,
//       createdAt: findUser.createdAt,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.patchUserInfo = async (req, res) => {
  const updateData = { ...req.body };

  const userId = req.params.id;

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
    const hashedPassword = hashPassword(updateData.password);
    updateData.password = hashedPassword;
  }

  await Account.updateOne({ _id: userId }, { $set: updateData });

  return res.status(200).send("변경 완료");
};

exports.getUserInfo = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
  console.log(req.user._id);
  try {
    await Account.deleteOne({ _id: req.user._id });
    res.status(200).send("계정 삭제 완료");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
