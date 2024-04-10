import styled from "styled-components";
import TypingText from "@/components/common/TypingText";
import backgroundImage from "@/assets/images/bg2.jpg";
import Button from "../components/atom/button/Button";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin) {
      return location.replace("/plan");
    }
    if (!isLogin) {
      return navigate("/login");
    }
  };

  return (
    <MainSection>
      <BackGroundImg />
      <Content>
        <h2>MBTI, P의 여행.</h2>

        <TypingText fontSize={"1.3rem"}>
          파워 P의 여행 계획을 쉽고 알차게 !
        </TypingText>
        <Button variant="primary" onClick={() => handleNavigation()}>
          일정 생성하기
        </Button>
      </Content>
      {/* </BackGroundImg> */}
    </MainSection>
  );
};

export default MainPage;
const MainSection = styled.section`
  height: 100vh;
`;
const BackGroundImg = styled.div`
  /* position: relative; */
  top: 0;
  background-image: url(${backgroundImage});
  height: 100%;
  background-size: cover;
`;

const Content = styled.div`
  /* min-width: 1200px; */
  padding: 0 2rem;
  position: absolute;
  top: 50%;
  left: 10%;
  /* transform: translate(-50%, -50%); */
  z-index: 2;
  & h2 {
    font-size: 2.5rem;
    color: #fff;
  }
`;
