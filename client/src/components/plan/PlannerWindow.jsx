import styled from "styled-components";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import PlanTabMenu from "./PlanTabMenu";
import { getDateFormat } from "@/utils/getFormatDate";
// import TripSchedule from "./schedule/TripSchedule";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ScheduleCard from "./ScheduleCard";
// import Button from "../atom/button/Button";
// import DateRangePicker from "../common/DateRangePicker";

const PlannerWindow = ({ menuView, setMenuView }) => {
  const modalOpen = useSelector((state) => state.modal.isOpen);
  const startDate = useSelector((state) => state.schedule.startDate);
  const endDate = useSelector((state) => state.schedule.endDate);
  const destination = useSelector((state) => state.place.destination);

  const dayDiff = dayjs(endDate).diff(dayjs(startDate), "day") + 1;
  return (
    <>
      <PlannerWrapper menuView={menuView}>
        {!modalOpen && (
          <PlannerContent>
            <PlanInfoCard destination={destination}>
              <div className="card_background" />
              <div className="plan_info">
                {/* <h1>Day {isSelectedDay}</h1> */}
                <h2 className="region_name">{destination.regionName}</h2>
                {startDate && endDate && (
                  <p className="selected_period">{`${getDateFormat(
                    startDate,
                    "korean"
                  )} - ${getDateFormat(endDate, "korean")}`}</p>
                )}
              </div>
            </PlanInfoCard>
            {/* <div className="total_period">{`${dayDiff} Days`}</div> */}
            <PlanDetail>
              <PlanTabMenu dayDiff={dayDiff} />
              <div className="info">
                <EditButton>일정 편집하기</EditButton>
                <ScheduleCard />
              </div>
            </PlanDetail>
          </PlannerContent>
        )}
      </PlannerWrapper>
      <ToggleBtn menuView={menuView} setMenuView={setMenuView} />
    </>
  );
};

export default PlannerWindow;

const ToggleBtn = ({ menuView, setMenuView }) => {
  return (
    <ToggleWrapper menuView={menuView}>
      {menuView ? (
        <MdKeyboardArrowLeft
          onClick={() => {
            setMenuView(!menuView);
          }}
        />
      ) : (
        <MdKeyboardArrowRight
          onClick={() => {
            setMenuView(!menuView);
          }}
        />
      )}
    </ToggleWrapper>
  );
};

const PlannerWrapper = styled.div`
  display: flex;
  width: 450px;
  height: calc(100vh - 80px);
  background-color: var(--color-bg-100);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  transform: ${({ menuView }) => !menuView && "translateX(-100%)"};
  transition: all 1s;
  box-shadow: 0 6px 6px 2px rgba(0, 0, 0, 0.15);
  .title {
    margin-bottom: 1rem;
  }
`;

const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2e2e2;
  padding: 0.7rem;
  border-radius: 10px;
`;
const PlanDetail = styled.div`
  display: flex;
  height: calc(100% - 200px);
  gap: 2rem;
  padding: 1rem;
  .info {
    width: 100%;
  }
`;
const PlannerContent = styled.div`
  flex: 1;
`;
const PlanInfoCard = styled.div`
  position: relative;

  .card_background {
    background-image: ${({ destination }) => `url(${destination.regionImg})`};
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.8;
    -webkit-filter: brightness(80%);
    filter: brightness(80%);
    height: 200px;
  }

  .plan_info {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    top: 0;
    padding: 2rem;
    color: #fff;
    /* bottom: 0; */
    .region_name {
      font-size: 1.25rem;
    }
    .selected_period {
      font-size: 0.875rem;
      font-family: "Montserrat", sans-serif;
      /* margin-bottom: 0.5rem; */
    }

    .total_period {
      font-size: 1rem;
    }
  }
`;
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-bg-100);
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.15);
  width: 24px;
  height: 48px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 1.6rem;
  position: absolute;
  top: 50%;
  left: ${({ menuView }) => (menuView ? "450px" : "0")};
  transition: all 1s;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
`;
