import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export const getDateFormat = (date, format) => {
  let dateString;

  switch (format) {
    case "korean":
      dateString = dayjs(date).format("YYYY년 M월 D일 (ddd)");
      break;
    case "dot":
      dateString = dayjs(date).format("YYYY.MM.DD (ddd)");
      break;
    case "dash":
      dateString = dayjs(date).format("YYYY-MM-DD ddd");
      break;
    case "slash":
      dateString = dayjs(date).format("YYYY/MM/DD ddd");
      break;
    default:
  }

  return dateString;
};
