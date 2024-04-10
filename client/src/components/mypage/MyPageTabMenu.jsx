import styled from "styled-components";
import { MYPAGE_MENU } from "@/datas/menus";

const MyPageTabMenu = ({ selectedMenu, setSelectedMenu }) => {
  return (
    <TabMenu>
      <ul>
        {MYPAGE_MENU.map((menu, idx) => {
          return (
            <Menu
              key={idx}
              selectedMenu={selectedMenu === idx}
              onClick={() => setSelectedMenu(idx)}
            >
              {menu.name}
            </Menu>
          );
        })}
      </ul>
    </TabMenu>
  );
};

export default MyPageTabMenu;
const TabMenu = styled.div`
  ul {
    display: flex;
  }
`;

const Menu = styled.li`
  padding: 1rem 2rem;
  font-weight: bold;
  font-size: 1rem;
  color: ${({ selectedMenu }) =>
    selectedMenu ? "var(--color-primary)" : "var(--color-gray)"};
  border-bottom: ${({ selectedMenu }) =>
    selectedMenu
      ? "4px solid var(--color-primary)"
      : "4px solid var(--color-gray-50)"};
  cursor: pointer;
`;
