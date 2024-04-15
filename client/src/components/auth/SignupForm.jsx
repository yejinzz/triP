import { useForm } from "react-hook-form";
import Button from "@/components/atom/button/Button";
import { getValidOptionByType } from "@/utils/getValidOptionByType";
import PasswordInput from "./PasswordInput";
import Confirm from "../common/dialog/Confirm";
// import { setCloseDialog, setOpenDialog } from "@/store/slice/modalSlice";
import { useNavigate } from "react-router-dom";
import Input from "../atom/Input";
import useOpenDialog from "../../hooks/useOpenDialog";
import { postSignup } from "../../api/api";

const SignupForm = () => {
  const navigate = useNavigate();
  const [isOpenDialog, openDialog, closeDialog] = useOpenDialog();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    postSignup({
      username: data.username,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        openDialog();
      })
      .catch((err) => {
        if (err.response.data.key === "username") {
          setError("username", {
            type: "manual",
            message: "중복된 닉네임입니다.",
          });
        }
        if (err.response.data.key === "email") {
          setError("email", {
            type: "manual",
            message: "중복된 이메일입니다.",
          });
        }
      });
  };
  const handleNavigation = () => {
    closeDialog();
    return navigate("/login");
  };

  const onError = (errors) => console.log(errors);

  return (
    <>
      {isOpenDialog && (
        <Confirm
          type="default"
          title="회원가입"
          content="회원가입 완료! 로그인 후 이용해주세요."
          primaryLabel="로그인 하러가기"
          onClickPrimaryButton={handleNavigation}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <h2>
          <span className="logo_style">triP</span>에 가입하여 <br />
          쉽게 여행을 계획해 보세요!
        </h2>
        <Input
          label="닉네임"
          type="username"
          placeholder="닉네임을 입력해주세요."
          register={register}
          getOption={getValidOptionByType}
          errors={errors}
        ></Input>

        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요."
          register={register}
          getOption={getValidOptionByType}
          errors={errors}
        ></Input>

        <PasswordInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          register={register}
          errors={errors}
          watch={watch}
        ></PasswordInput>
        <PasswordInput
          label="비밀번호 확인"
          type="passwordCheck"
          placeholder="비밀번호 한번 더 입력하세요."
          register={register}
          errors={errors}
          watch={watch}
        ></PasswordInput>

        <Button variant="primary" type="submit" disabled={!isDirty || !isValid}>
          회원가입
        </Button>
        <p className="sign_link">
          이미 회원이신가요? <a href="/login">로그인하기</a>
        </p>
      </form>
    </>
  );
};

export default SignupForm;
