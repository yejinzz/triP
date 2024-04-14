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
  /* max-width: 1200px; */
  .content__section {
    max-width: 64rem;
    min-height: calc(100vh - 500px);
    margin: 3rem auto;
    padding: 1rem;
    /* background-color: var(--color-primary-30); */
    .content__wrap {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 3rem 0;

      h2 {
        font-weight: bold;
        text-align: center;
      }
    }
  }
`;
