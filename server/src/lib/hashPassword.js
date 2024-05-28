import crypto from "crypto";

const hashPassword = (pw) => {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(pw)
    .digest("hex");
};

export default hashPassword;
