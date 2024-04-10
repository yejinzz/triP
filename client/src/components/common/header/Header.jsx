import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import Logo from "@/components/atom/Logo";
import AccountDropdown from "./AccountDropdown";
import Button from "@/components/atom/button/Button";

const Header = () => {
  const [headerColor, setHeaderColor] = useState("transparent");
  const scrollPosition = useScrollPosition();
  const location = useLocation();
  const path = location.pathname;
  const isLogin = localStorage.getItem("isLogin");
  useEffect(() => {
    if ((path === "/mypage" || path === "/") && scrollPosition < 500) {
      setHeaderColor("transparent");
    } else {
      setHeaderColor("#ffffff3a");
    }
  }, [scrollPosition, path]);

  return (
    <>
      <HeaderContainer path={path} headerColor={headerColor}>
        <Logo path={path} />
        {/* <div className="nav__wrapper"> */}
        {isLogin ? (
          <AccountDropdown path={path} />
        ) : (
          <Button width={"100px"} variant="outline">
            로그인
          </Button>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
  height: 80px;
  ${(props) =>
    props.path === "/mypage" || props.path === "/"
      ? ` width:100%;
          position: fixed;
          background-color: ${props.headerColor};
        `
      : ` 
          position: sticky;
          border-bottom: 1px solid var(--color-gray-50);
          background-color: #fff;
        `}
  top: 0;
  z-index: 99;
  transition: background-color 0.2s ease-out;

  & > button {
    color: ${(props) => props.path === "/" && "#fff"};
    border: ${(props) => props.path === "/" && "1px solid #fff"};
    &:hover {
      color: ${(props) => props.path === "/" && "var(--color-gray-50)"};
      border-color: ${(props) => props.path === "/" && "var(--color-gray-50)"};
    }
  }
  .header__sign_btn {
    display: flex;
    gap: 1rem;
    width: 170px;
  }
  .nav__wrapper {
    display: flex;
    align-items: center;
    z-index: 1;
  }
`;
