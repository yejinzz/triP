import { SIGN_VAILDATION } from "@/datas/validation";

export const getValidOptionByType = (type) => {
  if (type === "username") {
    return {
      validation: {
        required: true,
        minLength: { value: 2, message: SIGN_VAILDATION[type].minLength },
        maxLength: {
          value: 10,
          message: SIGN_VAILDATION[type].maxLength,
        },
        pattern: {
          value: /^[a-zA-Z0-9가-힣]/,
          message: SIGN_VAILDATION[type].pattern,
        },
      },
    };
  }

  if (type === "email") {
    return {
      validation: {
        required: true,
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: SIGN_VAILDATION[type].pattern,
        },
      },
    };
  }

  return null;
};
