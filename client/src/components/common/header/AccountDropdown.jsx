import styled from "styled-components";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useCloseModal from "@/hooks/useCloseModal";
import useGetUserData from "@/hooks/useGetUserData";
import { useSelector } from "react-redux";
import { postLogout } from "@/api/api";

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const closeDropdown = () => {
    return setOpen(false);
  };
  useCloseModal(dropdownRef, closeDropdown);
  useGetUserData();

  return (
    <AccountWrapper ref={dropdownRef}>
      <AccountBtn onClick={() => setOpen(!open)} aria-label="계정 프로필 버튼">
        <img
          src={userInfo.thumbNail}
          alt="유저 이미지"
          className="Account__thumb"
        />
      </AccountBtn>

      {open && (
        <div className="drop__wrapper">
          <div className="drop__user">
            <img
              src={userInfo.thumbNail}
              alt="유저 이미지"
              className="Account__thumb"
            />
            <p>{userInfo.userName}</p>
          </div>
          <ul>
            <li onClick={() => setOpen(false)}>
              <Link to="/mypage">마이 페이지</Link>
            </li>
            <li onClick={() => postLogout()}>로그아웃</li>
          </ul>
        </div>
      )}
    </AccountWrapper>
  );
};

export default AccountDropdown;

const AccountWrapper = styled.div`
  .Account__thumb {
    height: 40px;
    width: 40px;
  }
  .drop__wrapper {
    position: absolute;
    right: 2rem;
    top: 80px;
    max-height: 600px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.2);
    background-color: #fff;
    padding: 0.3rem;
    .drop__user {
      display: flex;
      align-items: center;
      padding: 0 1rem;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid var(--color-gray);
      p {
        font-weight: bold;
      }
    }
    & > ul {
      display: flex;
      flex-direction: column;
      /* justify-content: center; */
      /* row-gap: 1rem; */

      & > li {
        padding: 1rem 1.5rem;
        width: 100%;
        text-align: center;
        &:hover {
          border-radius: 10px;
          background-color: var(--color-primary-20);
        }
      }
    }
  }
`;
const AccountBtn = styled.button`
  position: relative;
`;
