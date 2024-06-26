import { useForm } from "react-hook-form";
import Button from "@/components/atom/button/Button";
import Input from "@/components/atom/Input";
import Confirm from "@/components/common/dialog/Confirm";
import { useState } from "react";
import useOpenDialog from "@/hooks/useOpenDialog";
import { postLogin } from "@/api/api";
import { instance } from "../../api/instance";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isOpenDialog, openDialog, closeDialog] = useOpenDialog();
  const navigate = useNavigate();
  const [dialogContent, setDialogContent] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    postLogin({
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        console.log(res);
        const authHeader = res.headers["authorization"]; // 대소문자 모두 고려하여 접근
        instance.defaults.headers.common["authorization"] = `${authHeader}`;
        localStorage.setItem("isLogin", true);
        return navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error === "Account not found") {
          setDialogContent("이메일을 확인해주세요.");
        } else if (err.response.data.error === "Incorrect password") {
          setDialogContent("비밀번호를 확인해주세요.");
        }
        return openDialog();
      });
  };

  return (
    <>
      {isOpenDialog && (
        <Confirm
          title="로그인"
          content={dialogContent}
          primaryLabel="확인"
          onClickPrimaryButton={() => closeDialog()}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>로그인</h2>
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요."
          // getOption={getValidOptionByType}
          register={register}
        ></Input>
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          // getOption={getValidOptionByType}
          register={register}
        ></Input>

        <Button variant="primary" type="submit" disabled={!isDirty}>
          로그인
        </Button>
        <p className="sign_link">
          아직 회원이 아니신가요? <a href="/signup">회원가입하기</a>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
