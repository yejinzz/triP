export const SIGN_VAILDATION = {
  username: {
    minLength: "닉네임은 2자 이상이어야 합니다.",
    maxLength: "닉네임은 10자 이하이어야 합니다.",
    pattern: "영문자, 숫자만 입력가능합니다.",
  },
  email: {
    pattern: "올바른 이메일 형식이 아닙니다.",
  },
  password: {
    pattern:
      "비밀번호는 8자 이상으로 하나 이상의 숫자와 문자,특수문자를 포함해주세요.",
  },
  passwordCheck: {
    validate: "입력한 패스워드와 다릅니다.",
  },
};
