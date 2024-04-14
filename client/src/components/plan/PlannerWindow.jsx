import styled from "styled-components";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import PlanTabMenu from "./PlanTabMenu";
import { getDateFormat } from "@/utils/getFormatDate";
import { useSelector } from "react-redux";
import ScheduleList from "./ScheduleList";
import { instance } from "@/api/instance";
import { getDayDiff } from "@/utils/getDayDiff";
import useOpenDialog from "@/hooks/useOpenDialog";
import Confirm from "../common/dialog/Confirm";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "@/components/atom/Logo";

const PlannerWindow = ({ menuView, setMenuView }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const startDate = useSelector((state) => state.schedule.startDate);
  const endDate = useSelector((state) => state.schedule.endDate);
  const destination = useSelector((state) => state.schedule.destination);
  const schedules = useSelector((state) => state.schedule.schedules);

  const dayDiff = getDayDiff(startDate, endDate) || null;
  const [isOpenDialog, openDialog, closeDialog] = useOpenDialog();

  const handleSavePlan = () => {
    instance
      .post("/api/plan", {
        startDate: startDate,
        endDate: endDate,
        destination: destination,
        schedules: schedules,
      })
      .then(() => {
        openDialog();
      });
  };

  const handleUpdatePlan = () => {
    instance.patch(`/api/plan/${id}`, { schedules: schedules }).then(() => {
      return navigate("/mypage");
    });
  };

  return (
    <>
      {isOpenDialog && (
        <Confirm
          title="즐거운 여행 되세요!"
          content="일정이 성공적으로 저장되었습니다."
          primaryLabel="일정 목록 가기"
          onClickPrimaryButton={() => {
            closeDialog();
            return navigate("/mypage");
          }}
        />
      )}

      <PlannerContent $menuView={menuView}>
        <PlannerWrapper>
          <PlanInfoCard destination={destination}>
            <div className="card_background" />

            <div className="plan_info">
              <Logo />
              <div>
                <h2 className="region_name">{destination.regionName}</h2>
                {startDate && endDate && (
                  <p className="selected_period">{`${getDateFormat(
                    startDate,
                    "korean"
                  )} - ${getDateFormat(endDate, "korean")}`}</p>
                )}
              </div>
            </div>
          </PlanInfoCard>
          <PlanDetail>
            <PlanTabMenu
              dayDiff={dayDiff}
              savePlan={handleSavePlan}
              updatePlan={handleUpdatePlan}
            />
            <ScheduleList />
          </PlanDetail>
        </PlannerWrapper>
      </PlannerContent>
      <ToggleBtn menuView={menuView} setMenuView={setMenuView} />
    </>
  );
};

export default PlannerWindow;

const ToggleBtn = ({ menuView, setMenuView }) => {
  return (
    <ToggleWrapper $menuView={menuView}>
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

const PlannerContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 450px;
  min-width: 450px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transform: ${({ $menuView }) => !$menuView && "translateX(-100%)"};
  transition: all 1s;
  box-shadow: 0 6px 6px 2px rgba(0, 0, 0, 0.15);

  @media (max-width: 425px) {
    /* width: 90%; */
    max-width: 90%;
    min-width: 90%;
  }
`;
const PlannerWrapper = styled.div`
  /* flex: 1;
  -ms-flex: 1; */
  flex-grow: 1;
  background-color: #fff;
  .title {
    margin-bottom: 1rem;
  }
`;

const PlanDetail = styled.div`
  display: flex;
  height: calc(100% - 200px);
  gap: 1rem;
  padding: 1rem;
`;

const PlanInfoCard = styled.div`
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
    height: 200px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
      margin-top: 0.5rem;
    }

    .total_period {
      font-size: 1rem;
    }
  }
`;
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.15);
  width: 24px;
  height: 48px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 1.6rem;
  position: absolute;
  top: 50%;
  left: ${({ $menuView }) => ($menuView ? "450px" : "0")};
  transition: all 1s;
  transform: translateY(-50%);
  z-index: 9;
  cursor: pointer;

  @media (max-width: 425px) {
    /* width: 90%; */
    /* height: 48px; */
    /* top: 0; */
    /* z-index: 9999; */
    left: ${({ $menuView }) => ($menuView ? "90%" : "0")};
    /* left: 90%; */
  }
`;
