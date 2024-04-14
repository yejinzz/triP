import styled from "styled-components";
import { getDateFormat } from "@/utils/getFormatDate";
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";

import Button from "../atom/button/Button";
import PlanTitle from "./PlanTitle";
import { instance } from "@/api/instance";
import Confirm from "../common/dialog/Confirm";
import { getDday } from "@/utils/getDayDiff";
import useOpenDialog from "@/hooks/useOpenDialog";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  editSchedule,
  setDestination,
  setEndDate,
  setStartDate,
} from "@/store/slice/scheduleSlice";

const MyPlanItem = ({ plan }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpenDialog, openDialog, closeDialog] = useOpenDialog();

  const deletePlan = () => {
    instance.delete(`/api/plan/${plan._id}`).then(() => {
      return location.reload();
    });
  };

  const getPlan = () => {
    instance.get(`/api/plan/${plan._id}`).then((res) => {
      navigate(`/plan/${plan._id}`);

      dispatch(setDestination(res.data.destination));
      dispatch(editSchedule(res.data.schedules));
      dispatch(setStartDate(res.data.startDate));
      dispatch(setEndDate(res.data.endDate));
    });
  };
  return (
    <>
      {isOpenDialog && (
        <Confirm
          type="default"
          title="정말 삭제하시겠습니까?"
          content="삭제하면 해당 일정을 되돌릴 수 없습니다."
          primaryLabel="취소하기"
          secondaryLabel="삭제하기"
          onClickPrimaryButton={() => closeDialog()}
          onClickSecondaryButton={() => deletePlan()}
        />
      )}
      <PlanItemBox>
        <figure className="region__img">
          <img src={plan.destination.regionImg} alt="여행 목적지 이미지" />
        </figure>
        <div className="plan__item_wrap">
          <div className="plan__info_wrap">
            <span className="Dday__tag">
              {getDday(plan.startDate) === 1
                ? "D-day"
                : `D-${getDday(plan.startDate)}`}
            </span>
            <PlanTitle plan={plan} />
            <span> {plan.destination.regionName}</span>
            <span>{`${getDateFormat(plan.startDate, "dot")}-
            ${getDateFormat(plan.endDate, "dot")}`}</span>
          </div>
        </div>
        <div className="plan__delete_btn">
          <Button
            width="fit-content"
            onClick={() => {
              getPlan();
            }}
          >
            일정 보기
          </Button>

          <IoTrashOutline onClick={() => openDialog()} />
        </div>
      </PlanItemBox>
    </>
  );
};

export default MyPlanItem;
const PlanItemBox = styled.div`
  /* display: inline; */
  display: flex;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  gap: 1rem;
  .region__img {
    & > img {
      width: 200px;
      height: 150px;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .plan__item_wrap {
    width: 100%;
    display: flex;
    align-items: center;
    .plan__info_wrap {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      & > span {
        font-weight: 100;
      }
      .Dday__tag {
        width: fit-content;
        padding: 0.3rem;
        color: #fff;
        font-family: "Montserrat";
        background-color: #424242;
      }
    }
  }
  .plan__delete_btn {
    display: flex;
    align-items: center;

    & > svg {
      cursor: pointer;
      font-size: 20px;
      color: var(--color-red);
      margin-left: 1rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .region__img {
      & > img {
        width: 100%;
        height: 150px;
      }
    }

    .plan__delete_btn {
      justify-content: space-between;
    }
  }
`;
