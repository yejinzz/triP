// import { SIGN_REQUIRE } from "@/constants/contents";
import { getValidOptionByType } from "@/utils/getValidOptionByType";
import { InputBox } from "@/styles/Common";

const SignInput = ({ type, label, placeholder, register, errors = "" }) => {
  const registerFormat = getValidOptionByType(type);

  const errorMsg = errors[type]?.message;
  //   console.log(type, registerFormat, errorMsg);
  return (
    <InputBox>
      <label htmlFor={type}>{label}</label>
      <input
        id={type}
        type={type}
        placeholder={placeholder}
        required
        {...register(type, registerFormat?.validation)}
        aria-invalid={errors[type] ? "#ff0000" : "#dadada"}
        // disabled="false"
      />
      {errorMsg && <p className="err_msg">{errorMsg}</p>}
    </InputBox>
  );
};

export default SignInput;

// const SignInputBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.25rem;
//   width: 100%;
//   & > input {
//     border: 1px solid var(--color-gray);
//     border-radius: 10px;
//     padding: 0.7rem 0.6rem;
//   }
// `;
