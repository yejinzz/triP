import styled from "styled-components";
import { IoIosAddCircleOutline } from "@react-icons/all-files/io/IoIosAddCircleOutline";
import { IoIosRemoveCircleOutline } from "@react-icons/all-files/io/IoIosRemoveCircleOutline";
import { IoReorderThreeOutline } from "@react-icons/all-files/io5/IoReorderThreeOutline";
import useSelectedPlace from "@/hooks/useSelectedPlace";
import { useDispatch, useSelector } from "react-redux";
import { setSchedule } from "@/store/slice/scheduleSlice";

const PlaceItem = ({ place, isEdit, isAddEnabled }) => {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const handleClickPlace = useSelectedPlace();

  const getPlaceTypeLabel = () => {
    switch (place.contenttypeid) {
      case "12":
        return "관광명소";
      case "39":
        return "음식점";
      case "32":
        return "숙박";
      default:
        return null;
    }
  };

  const addSchedule = (schedule) => {
    const day = selectedDay;
    handleClickPlace(schedule);
    dispatch(setSchedule({ day, schedule }));
  };
  return (
    <PlaceItemWrapper>
      {isEdit && <RemoveIcon />}
      <PlaceInfoBox onClick={() => handleClickPlace(place)}>
        <img src={place.firstimage} alt="place_img" />
        <div className="place_info">
          <span>{getPlaceTypeLabel()}</span>
          <p className="place_name">{place.title}</p>

          <p className="place_address">{`${place.addr1} ${place.addr2}`}</p>
        </div>
      </PlaceInfoBox>
      {isAddEnabled && <AddIcon onClick={() => addSchedule(place)} />}
      {isEdit && <ChangeListIcon />}
    </PlaceItemWrapper>
  );
};

export default PlaceItem;
const PlaceItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 0;
  border-bottom: 0.5px solid var(--color-gray);
`;
const PlaceInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  & > img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 10px;
  }
  .place_info {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    & span {
      font-size: 0.75rem;
      color: #4568dc;
    }
    & .place_name {
      /* font-size: 1rem; */
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .place_address {
      color: #9f9f9f;
      font-size: 0.75rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const AddIcon = styled(IoIosAddCircleOutline)`
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-blue);
`;
const RemoveIcon = styled(IoIosRemoveCircleOutline)`
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-red);
`;
const ChangeListIcon = styled(IoReorderThreeOutline)`
  font-size: 1.5rem;
  cursor: pointer;
`;
