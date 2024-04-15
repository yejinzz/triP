import { useForm } from "react-hook-form";
import Button from "@/components/atom/button/Button";
import PasswordInput from "../auth/PasswordInput";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { patchUserInfo } from "@/api/api";

const PasswordEditForm = ({ setOpenPwdForm }) => {
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    patchUserInfo(userInfo.userId, data)
      .then((res) => {
        if (res.status === 200) {
          setOpenPwdForm(false);
        }
      })
      .catch((err) => {
        if (err.response.data === "현재 비밀번호가 일치하지 않습니다.") {
          setError("curruntPwd", {
            type: "manual",
            message: "현재 비밀번호가 일치하지 않습니다.",
          });
        }
      });
  };

  return (
    <PwdEditForm onSubmit={handleSubmit(onSubmit)}>
      <h2>비밀번호 변경</h2>
      <fieldset>
        <PasswordInput
          label="현재 비밀번호"
          type="curruntPwd"
          placeholder="현재 비밀번호를 입력해주세요."
          register={register}
          errors={errors}
          watch={watch}
        ></PasswordInput>
        <PasswordInput
          label="새 비밀번호"
          type="password"
          placeholder="새 비밀번호를 입력해주세요."
          register={register}
          errors={errors}
          watch={watch}
        ></PasswordInput>
        <PasswordInput
          label="새 비밀번호 확인"
          type="passwordCheck"
          placeholder="새 비밀번호를 한번 더 입력하세요."
          register={register}
          errors={errors}
          watch={watch}
        ></PasswordInput>
        <Button variant="primary" type="submit" disabled={!isDirty || !isValid}>
          변경하기
        </Button>
      </fieldset>
    </PwdEditForm>
  );
};

export default PasswordEditForm;
const PwdEditForm = styled.form`
  width: 500px;

  fieldset {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin: 1rem;
  }
  .other__btn_wrap {
    display: flex;
    gap: 3rem;
  }
`;
