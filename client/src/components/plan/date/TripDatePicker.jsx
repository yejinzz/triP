import DatePicker from "@/components/common/DatePicker";
import dayjs from "dayjs";
import { FaRegCalendarAlt } from "@react-icons/all-files/fa/FaRegCalendarAlt";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setEndDate, setStartDate } from "@/store/slice/scheduleSlice";

const TripDatePicker = () => {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.schedule.startDate);
  const endDate = useSelector((state) => state.schedule.endDate);

  return (
    <TripDateContainer>
      <DatePickerContainer>
        <FaRegCalendarAlt className="calendar_icon" />
        <DatePicker
          placeholderText="가는 날 선택"
          selected={startDate}
          onChange={(date) => {
            dispatch(setStartDate(date.toISOString()));
            if (!endDate || dayjs(date).isAfter(endDate)) {
              dispatch(setEndDate(date.toISOString()));
            }
          }}
          minDate={new Date()}
        />
        <span>~</span>
        <DatePicker
          placeholderText="오는 날 선택"
          selected={endDate}
          onChange={(date) => dispatch(setEndDate(date.toISOString()))}
          minDate={startDate || new Date()}
        />
      </DatePickerContainer>
    </TripDateContainer>
  );
};

export default TripDatePicker;
const TripDateContainer = styled.div``;

const DatePickerContainer = styled.div`
  /* padding: 0 1rem; */
  display: flex;
  align-items: center;
  width: 300px;
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  .calendar_icon {
    margin: 0 1rem;
  }
`;
