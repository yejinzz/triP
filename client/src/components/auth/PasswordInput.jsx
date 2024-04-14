import { getPasswordByType } from "@/utils/getPasswordByType";
import { InputBox } from "@/styles/Common";

const PasswordInput = ({
  type,
  label,
  placeholder,
  register,
  errors = {},
  watch,
}) => {
  // const path = location.pathname;

  const validPwdOption = getPasswordByType(type, watch);

  const errorMsg = errors[type]?.message;
  return (
    <InputBox>
      <label htmlFor={type}>{label}</label>
      <input
        id={type}
        type="password"
        placeholder={placeholder}
        required
        {...register(type, validPwdOption?.validation)}
        aria-invalid={errors[type] ? "#ff0000" : "#dadada"}
        // disabled="false"
      />
      {errorMsg && <p className="err_msg">{errorMsg}</p>}
    </InputBox>
  );
};

export default PasswordInput;
