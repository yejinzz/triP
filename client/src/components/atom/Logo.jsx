import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = ({ path }) => {
  return (
    <Link to="/">
      <LogoText
        className="logo_style"
        path={path === "/" || path === "/mypage"}
      >
        triP.
      </LogoText>
    </Link>
  );
};

export default Logo;

const LogoText = styled.h1`
  color: ${({ path }) => path && "#fff"};
`;
