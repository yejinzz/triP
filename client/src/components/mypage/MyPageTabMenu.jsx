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
              className={selectedMenu === idx ? "active" : ""}
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
  /* margin: 3rem; */
  border-bottom: 0.5px solid var(--color-gray);

  ul {
    display: flex;
  }
`;

const Menu = styled.li`
  padding: 1rem 2rem;
  font-weight: bold;
  font-size: 1rem;
  color: var(--color-gray);
  border-bottom: 4px solid var(--color-gray-50);
  &.active {
    color: var(--color-primary);
    border-bottom: 4px solid var(--color-primary);
  }

  cursor: pointer;
`;
