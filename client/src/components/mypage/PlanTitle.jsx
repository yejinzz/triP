import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { patchPlan } from "@/api/api";

const PlanTitle = ({ plan }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(plan.planTitle);
  const { register, handleSubmit } = useForm();

  const patchPlanTitle = (data) => {
    patchPlan(plan._id, { planTitle: data.title }).then(() => {
      setTitle(data.title);
      return setIsEdit(false);
    });
  };
  return (
    <PlanTitleContainer>
      {isEdit ? (
        <form onSubmit={handleSubmit(patchPlanTitle)}>
          <input
            className="plan__title_input"
            id="title"
            type="text"
            maxLength="12"
            defaultValue={plan.planTitle}
            {...register("title")}
          />
          <div className="plan__title_save">
            <button onClick={() => setIsEdit(false)} className="cancel__btn">
              취소
            </button>
            <button type="submit" className="save__btn">
              저장
            </button>
          </div>
        </form>
      ) : (
        <h2>{title}</h2>
      )}

      {!isEdit && (
        <span className="plan__edit_btn">
          <FiEdit onClick={() => setIsEdit(true)} />
        </span>
      )}
    </PlanTitleContainer>
  );
};

export default PlanTitle;
const PlanTitleContainer = styled.div`
  display: flex;
  align-items: center;
  & > h2 {
    display: inline;
    font-size: 1.1rem;
  }
  .plan__title_input {
    width: 300px;
    border-bottom: 1px solid var(--color-gray);
  }
  .plan__title_save {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    .cancel__btn {
      color: var(--color-gray);
    }
    .save__btn {
      color: var(--color-blue);
    }
  }
  .plan__edit_btn {
    font-size: 1rem;
    margin-left: 0.5rem;
    color: var(--color-blue);
    cursor: pointer;
  }
`;
