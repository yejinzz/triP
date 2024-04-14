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
      return navigate("/plan");
    }
    if (!isLogin) {
      return navigate("/login");
    }
  };

  return (
    <MainSection>
      <BackGroundImg />
      <Content>
        <h2>
          국내 여행 플래너 <span className="logo_style">triP</span>
        </h2>

        <TypingText fontSize={"1.3rem"}>
          여행을 쉽고 빠르게 계획해 보세요!
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
  /* min-width: 310px; */
  padding: 0 2rem;
  position: absolute;
  top: 50%;
  left: 10%;
  /* transform: translate(-50%, -50%); */
  z-index: 2;
  & h2 {
    font-size: 2rem;
    color: #fff;
  }
`;
