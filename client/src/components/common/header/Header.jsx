import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import Logo from "@/components/atom/Logo";
import AccountDropdown from "./AccountDropdown";
import Button from "@/components/atom/button/Button";

const Header = () => {
  const scrollPosition = useScrollPosition();
  const location = useLocation();
  const path = location.pathname;
  const isLogin = localStorage.getItem("isLogin");
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer
        path={path}
        $headerColor={
          (path === "/mypage" || path === "/") && scrollPosition < 450
        }
      >
        <Logo path={path} scrollPosition={scrollPosition < 450} />
        {isLogin ? (
          <AccountDropdown />
        ) : (
          <Button
            width={"100px"}
            variant="outline"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </Button>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: ${(props) => (props.path.startsWith("/plan") ? "none" : "flex")};

  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
  height: 80px;
  position: fixed;
  ${(props) =>
    props.$headerColor
      ? ` 
          background-color: transparent;
        `
      : ` 
          background-color: #fff;
          border-bottom: 1px solid var(--color-gray-50);
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
