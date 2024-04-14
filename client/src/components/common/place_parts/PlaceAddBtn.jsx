import { IoIosAddCircle } from "@react-icons/all-files/io/IoIosAddCircle";
import { IoIosCheckmarkCircle } from "@react-icons/all-files/io/IoIosCheckmarkCircle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useSelectedPlace from "@/hooks/useSelectedPlace";
import { setSchedule } from "@/store/slice/scheduleSlice";

const PlaceAddBtn = ({ place, openDialog }) => {
  const dispatch = useDispatch();
  const handleClickPlace = useSelectedPlace();
  const schedules = useSelector((state) => state.schedule.schedules);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);

  const addSchedule = (place) => {
    const day = selectedDay;
    const schedule = place;
    if (!schedules[selectedDay] || schedules[day].length < 14) {
      handleClickPlace(place);
      dispatch(setSchedule({ day, schedule }));
    } else if (schedules[day].length >= 14) {
      openDialog();
    }
  };

  const isScheduled =
    schedules[selectedDay] && schedules[selectedDay].includes(place);
  return (
    <div>
      {!isScheduled ? (
        <AddIcon onClick={() => addSchedule(place)} />
      ) : (
        <CheckIcon />
      )}
    </div>
  );
};

export default PlaceAddBtn;

const AddIcon = styled(IoIosAddCircle)`
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-gray);
`;
const CheckIcon = styled(IoIosCheckmarkCircle)`
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-blue);
`;
