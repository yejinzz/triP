import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../atom/button/Button";
import { setSelectDay } from "@/store/slice/scheduleSlice";
import { useParams } from "react-router-dom";
// import { setCloseModal } from "@/store/slice/modalSlice";

const PlanTabMenu = ({ dayDiff, savePlan, updatePlan }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  return (
    <TabMenuWrapper>
      <DayLists>
        {dayDiff &&
          // !modalOpen &&
          Array(dayDiff)
            .fill(null)
            .map((_, idx) => (
              <li key={idx}>
                <Button
                  onClick={() => dispatch(setSelectDay(idx + 1))}
                  selected={`day ${idx + 1}` === selectedDay}
                  radius="10px"
                  variant="outline"
                >
                  Day {idx + 1}
                </Button>
              </li>
            ))}
      </DayLists>
      {!id ? (
        <Button variant="primary" radius="10px" onClick={() => savePlan()}>
          저장
        </Button>
      ) : (
        <Button variant="primary" radius="10px" onClick={() => updatePlan()}>
          수정
        </Button>
      )}
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
  overflow: auto;
  & > button {
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
  }
`;
