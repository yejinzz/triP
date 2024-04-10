import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export const getDayDiff = (startDate, endDate) => {
  return dayjs(endDate).diff(dayjs(startDate), "day") + 1;
};
export const getDday = (startDate) => {
  return dayjs(startDate).diff(dayjs(Date.now()), "day") + 1;
};
