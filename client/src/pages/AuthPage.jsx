import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

const AuthForm = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <FormContainer>
      {isLoginPage ? (
        <>
          <h1>LOG IN</h1>
          <LoginForm />
          <p>
            회원이 아니신가요? <a href="/signup">회원가입하기</a>
          </p>
        </>
      ) : (
        <>
          <h1>SIGN UP</h1>
          <SignupForm />
          <p>
            이미 회원이신가요? <a href="/login">로그인하기</a>
          </p>
        </>
      )}
    </FormContainer>
  );
};

export default AuthForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  color: #2f2f2f;
  & h1 {
    text-shadow: 1px 1px 1px #fff;
    margin-bottom: 1rem;
    /* letter-spacing: -4px; */
    &::first-letter {
      color: var(--color-primary);
    }
  }
  & form {
    display: grid;
    row-gap: 2rem;
    width: 500px;
  }
  & > p {
    margin-top: 2rem;
    > a {
      font-weight: 600;
      margin-left: 0.25rem;
    }
  }

  & .err_msg {
    margin-top: 0.5rem;
    color: #c62727;
  }
`;
