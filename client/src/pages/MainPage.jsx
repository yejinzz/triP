import styled from "styled-components";
import TypingText from "@/components/common/TypingText";
import backgroundImage from "../assets/images/bg2.jpg";

const MainPage = () => {
  return (
    <>
      <BackGroundImg>
        <Content>
          <p className="logo_style">MBTI, P의 여행.</p>

          <TypingText fontSize={"1.3rem"}>
            파워 P의 여행 계획을 쉽고 알차게 !
          </TypingText>
          {/* <Link to="/diary">
          <Button size={"7.5rem"}>무드 기록하기</Button>
        </Link> */}
        </Content>
      </BackGroundImg>
      <p className="logo_style">MBTI, P의 여행.</p>
      <p className="logo_style">MBTI, P의 여행.</p>
      <p className="logo_style">MBTI, P의 여행.</p>
      <p className="logo_style">MBTI, P의 여행.</p>
    </>
  );
};

export default MainPage;

const BackGroundImg = styled.div`
  position: relative;
  top: 0;
  background-image: url(${backgroundImage});
  height: 100vh;
  background-size: cover;
`;

const Content = styled.div`
  /* width: 100%; */
  min-width: 1200px;
  padding: 0 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;
