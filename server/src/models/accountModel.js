const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../lib/hashPassword");

const accountSchema = new Schema({
  username: String,
  thumbnail: {
    type: String,
    default: "/profiles/profile_1.png", // 기본값으로 설정할 썸네일 URL
  },
  email: String,
  refreshToken: String,

  social: {
    google: {
      id: String,
      accessToken: String,
    },
  },
  password: String,
  createdAt: { type: Date, default: Date.now },
});

accountSchema.statics.findByUsername = function (username) {
  return this.findOne({ username }).exec();
};

accountSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email }).exec();
};

accountSchema.statics.findByEmailOrUsername = function ({ username, email }) {
  return this.findOne({
    $or: [{ username }, { email }],
  }).exec();
};

accountSchema.methods.validatePassword = function (password) {
  const hashed = hashPassword(password);
  return this.password === hashed;
};

accountSchema.statics.createAccount = function ({ username, email, password }) {
  const account = new this({
    username,
    email,
    password: hashPassword(password),
  });

  return account.save();
};

accountSchema.methods.generateToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    thumbnail: this.thumbnail,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h", // 1시간 동안 유효함
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d", // 7일 동안 유효함
  });

  return { accessToken, refreshToken };
};

module.exports = mongoose.model("Account", accountSchema);
