import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = ({ isHome }) => {
  return (
    <ListContainer isHome={isHome}>
      {nav.map((el) => {
        return (
          <Link to={el.endPoint}>
            <li>{el.name}</li>
          </Link>
        );
      })}
    </ListContainer>
  );
};

export default NavBar;
const nav = [
  // { name: "캘린더", endPoint: "/calendar" },
  { name: "일정만들기", endPoint: "/plan" },
  { name: "내 일정", endPoint: "/diary" },
  // { name: "모두의 무드", endPoint: "/everyonemood" },
];

const ListContainer = styled.ul`
  display: flex;
  margin: 0 3rem;
  gap: 3rem;

  & li {
    color: ${(props) => (props.isHome === "/" ? "#fff" : null)};
    letter-spacing: -1.5px;
    &:hover {
      cursor: pointer;
    }
  }
`;
