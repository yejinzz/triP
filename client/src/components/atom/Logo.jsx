import styled from "styled-components";
import logo_black from "../../assets/logo/logo_black.png";
import logo_white from "../../assets/logo/logo_white.png";

const Logo = ({ isHome }) => {
  return (
    <>
      {isHome === "/" ? (
        <LogoImg src={logo_white} alt="logo" />
      ) : (
        <LogoImg src={logo_black} alt="logo" />
      )}
    </>
  );
};

export default Logo;
const LogoImg = styled.img`
  width: 60px;
`;
