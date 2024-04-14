import { SIGN_VAILDATION } from "@/datas/validation";

export const getPasswordByType = (type, watch) => {
  if (type === "password") {
    return {
      validation: {
        required: true,
        pattern: {
          value:
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          message: SIGN_VAILDATION[type].pattern,
        },
      },
    };
  }

  if (type === "passwordCheck" && watch) {
    return {
      validation: {
        required: true,
        validate: (value) =>
          value === watch("password") || SIGN_VAILDATION[type].validate,
      },
    };
  }

  return null;
};
