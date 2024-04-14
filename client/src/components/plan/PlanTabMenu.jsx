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
          Array(dayDiff)
            .fill(null)
            .map((_, idx) => (
              <li key={idx}>
                <Button
                  onClick={() => dispatch(setSelectDay(idx + 1))}
                  className={selectedDay === `day ${idx + 1}` ? "active" : ""}
                  radius="10px"
                  variant="outline"
                >
                  Day {idx + 1}
                </Button>
              </li>
            ))}
      </DayLists>
      {!id ? (
        <Button
          variant="primary"
          // color="#000"
          radius="10px"
          onClick={() => savePlan()}
        >
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
  /* .button__wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-top: 1rem;
  } */
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
