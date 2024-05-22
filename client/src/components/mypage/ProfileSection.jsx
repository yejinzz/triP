import styled from "styled-components";

import { useSelector } from "react-redux";

const ProfileSection = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <Profile>
      <div className="thumb__wrap">
        {/* <DefaultThumbNail /> */}
        <img
          className="thumb__img"
          src={userInfo.thumbNail}
          alt="유저 프로필 이미지"
        />
      </div>
      <h2 className="user__name">
        <span>{userInfo.userName}</span>님
      </h2>
    </Profile>
  );
};

export default ProfileSection;
const Profile = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 500px;
  background-color: var(--color-primary-80);
  color: #fff;

  .thumb__wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 3px solid var(--color-primary); */
    background-color: #fff;
    border-radius: 50%;
    /* width: 100px;
    height: 100px; */
    padding: 1rem;
    box-shadow: 0px 0px 8px rgb(0, 0, 0, 0.2);
    .thumb__img {
      width: 100px;
      height: 100px;
      color: var(--color-primary);
    }
    .icon__wrap {
      position: absolute;
      right: -5px;
      bottom: -0px;
      padding: 0.5rem;
      background-color: #424242;
      border-radius: 50%;
      cursor: pointer;
      & > svg {
        color: #ffffff;
        font-size: 1.2rem;
      }
    }
  }
  .user__name {
    font-size: 1.2rem;
  }
`;
