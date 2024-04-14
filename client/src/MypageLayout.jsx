import { Outlet } from "react-router-dom";
import MyPageTabMenu from "./components/mypage/MyPageTabMenu";
import styled from "styled-components";
import Profile from "./components/mypage/Profile";
import { useState } from "react";

const MypageLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <MyPageContainer>
      <Profile />

      <section className="content__section">
        <MyPageTabMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <Outlet />
      </section>
    </MyPageContainer>
  );
};
export default MypageLayout;
const MyPageContainer = styled.main`
  .content__section {
    max-width: 1200px;
    margin: 0 auto;
  }
`;
