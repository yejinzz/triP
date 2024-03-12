import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../atom/button/Button";
import { setSelectDay } from "../../store/slice/scheduleSlice";

const PlanTabMenu = ({ dayDiff }) => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.isOpen);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);

  const handleClickButton = (day) => {
    dispatch(setSelectDay(`day ${day}`));
  };
  // console.log(isSelectedDay);

  return (
    <TabMenuWrapper>
      <DayLists>
        {dayDiff &&
          !modalOpen &&
          Array(dayDiff)
            .fill(null)
            .map((_, idx) => (
              <li key={idx}>
                <Button
                  onClick={() => handleClickButton(idx + 1)}
                  selected={`day ${idx + 1}` === selectedDay}
                  radius="10px"
                  variant="outline"
                >
                  Day {idx + 1}
                </Button>
              </li>
            ))}
      </DayLists>
      {/* <div> */}
      <Button variant="primary" radius="10px">
        저장
      </Button>
      {/* </div> */}
    </TabMenuWrapper>
  );
};

export default PlanTabMenu;

const TabMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 100%;
  /* padding: 1rem; */
  /* overflow: auto; */
  & > button {
    /* width: 100%; */
    margin-top: 30px;
  }
`;

const DayLists = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  & > li {
    width: 100%;
    /* padding: 0.5rem; */
  }
`;

// const MenuBtn = styled.button`
//   padding: 0.5rem;
//   /* border-radius: 10px; */
//   border-left: ${(props) =>
//     props.isSelectedDay === props.key + 1 && "7px solid var(--color-primary)"};
//   /* color: ${(props) => props.content === props.name && "#fff"}; */
//   &:hover {
//     background-color: ${(props) =>
//       props.content !== props.name && "var(--color-primary-20)"};
//   }
// `;
