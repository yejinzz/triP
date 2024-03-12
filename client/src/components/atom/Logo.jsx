import styled from "styled-components";
import logo_black from "../../assets/logo/logo_black.png";
import logo_white from "../../assets/logo/logo_white.png";
import { Link } from "react-router-dom";

const Logo = ({ isHome }) => {
  return (
    <Link to="/">
      {isHome === "/" ? (
        <LogoImg src={logo_white} alt="logo" />
      ) : (
        <LogoImg src={logo_black} alt="logo" />
      )}
    </Link>
  );
};

export default Logo;
const LogoImg = styled.img`
  width: 60px;
`;
