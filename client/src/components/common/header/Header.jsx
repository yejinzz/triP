import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import NavBar from "./NavBar";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import Logo from "@/components/atom/Logo";

const Header = () => {
  const [headerColor, setHeaderColor] = useState("transparent");
  const scrollPosition = useScrollPosition();
  const location = useLocation();
  const isHome = location.pathname;

  useEffect(() => {
    if (isHome === "/" && scrollPosition < 100) {
      setHeaderColor("transparent");
    } else {
      setHeaderColor("#ffffff3a");
    }
  }, [scrollPosition, isHome]);

  return (
    <>
      <HeaderContainer isHome={isHome} headerColor={headerColor}>
        <HeaderWrapper>
          <Link to="/">
            <Logo isHome={isHome} />
          </Link>
          <NavBox>
            <NavBar isHome={isHome} />
            <Link to="/login">
              <AccountBtn />
            </Link>
          </NavBox>
        </HeaderWrapper>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  height: 80px;
  ${(props) =>
    props.isHome === "/"
      ? ` width:100%;
          position: fixed;
          background-color: ${props.headerColor};
        `
      : ` 
          position: sticky;
          border-bottom: 1px solid var(--color-gray-50);
          background-color: var(--color-bg-100);
        `}
  top: 0;
  z-index: 99;
  transition: background-color 0.2s ease-out;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  /* max-width: 1200px; */
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBox = styled.div`
  display: flex;
  align-items: center;
`;

// const Logo = styled.img`
//   width: 80px;
// `;
const AccountBtn = styled(FaUser)`
  font-size: 1.4rem;
  color: var(--color-primary);
`;
