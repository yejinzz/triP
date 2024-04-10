import { useState } from "react";
import styled from "styled-components";

import ProfileSection from "../components/mypage/ProfileSection";
import MyPageTabMenu from "../components/mypage/MyPageTabMenu";
import { MYPAGE_MENU } from "../datas/menus";

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  return (
    <>
      <MyPageLayout>
        <ProfileSection />

        <section className="content__section">
          <MyPageTabMenu
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
          {/* { === "myTrip"} */}
          <div className="content__wrap">
            <h2>{MYPAGE_MENU[selectedMenu].name}</h2>
            {MYPAGE_MENU[selectedMenu].content}
          </div>
        </section>
      </MyPageLayout>
    </>
  );
};

export default MyPage;

const MyPageLayout = styled.main`
  .content__section {
    max-width: 1200px;
    /* min-height: calc(100vh - 500px); */
    margin: 3rem auto;
    .content__wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 3rem 0;
      border: 0.5px solid var(--color-gray-50);
      h2 {
        font-weight: bold;
        text-align: center;
      }
    }
  }
`;
