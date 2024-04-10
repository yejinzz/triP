import { InputBox } from "@/styles/Common";

const Input = ({
  type,
  label,
  placeholder,
  register,
  getOption,
  errors = {},
  ...arr
}) => {
  let validOption = {};
  if (getOption) {
    validOption = getOption(type) || {};
  }

  const errorMsg = errors[type]?.message;

  return (
    <InputBox>
      <label htmlFor={type}>{label}</label>
      <input
        id={type}
        type={type}
        placeholder={placeholder}
        required
        {...register(type, validOption?.validation)}
        aria-invalid={errors[type] ? "#ff0000" : "#dadada"}
        {...arr}
      />
      {errorMsg && <p className="err_msg">{errorMsg}</p>}
    </InputBox>
  );
};

export default Input;
