import styled from "styled-components";
import PlaceItem from "@/components/plan/place/PlaceItem.jsx";
import { IoIosRemoveCircleOutline } from "@react-icons/all-files/io/IoIosRemoveCircleOutline";
import { IoReorderThreeOutline } from "@react-icons/all-files/io5/IoReorderThreeOutline";

const ScheduleItem = ({ place, isEdit, removeSchedule = null }) => {
  return (
    <PlaceItemWrapper>
      {isEdit && (
        <span>
          <ChangeListIcon />
        </span>
      )}
      <PlaceItem place={place} />
      {isEdit && (
        <span>
          <RemoveIcon onClick={removeSchedule} />
        </span>
      )}
    </PlaceItemWrapper>
  );
};

export default ScheduleItem;
const PlaceItemWrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 0.5px solid var(--color-gray);
  width: 100%;
`;

const RemoveIcon = styled(IoIosRemoveCircleOutline)`
  font-size: 1.3rem;
  cursor: pointer;
  color: var(--color-red);
`;
const ChangeListIcon = styled(IoReorderThreeOutline)`
  font-size: 1.2rem;
  cursor: pointer;
`;
