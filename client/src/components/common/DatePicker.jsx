import ko from "date-fns/locale/ko";
// import { useState } from 'react';
import Picker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

registerLocale("ko", ko);

const DatePicker = ({
  placeholderText,
  selected,
  onChange,
  minDate,
  maxDate,
}) => {
  //   const [startDate, setStartDate] = useState(null);

  return (
    <CustomPicker
      dateFormat={" MM월 dd일(eee)"}
      placeholderText={placeholderText}
      selected={selected}
      onChange={onChange}
      shouldCloseOnSelect={true}
      minDate={minDate}
      maxDate={maxDate}
      className="bg-transparent text-[#343539]"
      locale={ko}
      disabledKeyboardNavigation
      popperPlacement="bottom"
    />
  );
};

export default DatePicker;

const CustomPicker = styled(Picker)`
  width: 100%;
  height: 40px;
  font-weight: 400;
  /* font-size: 0.9rem; */
  background-color: transparent;
  /* color: var(--color-gray); */
  /* color: */
`;
