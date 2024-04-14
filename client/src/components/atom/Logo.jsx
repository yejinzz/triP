import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = ({ path, scrollPosition }) => {
  return (
    <Link to="/">
      <LogoText
        className="logo_style"
        $path={path === "/" || path === "/mypage"}
        $scrollPosition={scrollPosition}
      >
        triP.
      </LogoText>
    </Link>
  );
};

export default Logo;

const LogoText = styled.h1`
  color: ${(props) => props.$path && props.$scrollPosition && "#fff"};
  font-size: 1.5rem;
`;
