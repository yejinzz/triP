import styled from "styled-components";
import SignupForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";

const AuthPage = () => {
  const path = location.pathname;
  console.log(path);
  return (
    <FormContainer>
      {path === "/login" && <LoginForm />}
      {path === "/signup" && <SignupForm />}
    </FormContainer>
  );
};

export default AuthPage;

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1.75rem;
    width: 500px;
    .sign_link {
      margin-top: 2rem;
      & > a {
        font-weight: 600;
        margin-left: 0.25rem;
        color: var(--color-primary);
      }
    }
  }
`;
