import { instance } from "./instance";
import { TourInstance } from "./tourInstance";

export const postLogout = () => {
  instance.post("/api/auth/logout").then((res) => {
    if (res.status === 200 && res.data === "로그아웃 완료")
      localStorage.clear();
    return location.replace("/");
  });
};

export const deleteUser = () => {
  instance.delete("/api/user").then((res) => {
    if (res.status === 200 && res.data === "계정 삭제 완료")
      localStorage.clear();
    return location.replace("/");
  });
};
// 장소정보 요청
export const getPlaceByCategory = (typeId, regionCode) => {
  return TourInstance.get(
    `/areaBasedList1?serviceKey=${import.meta.env.VITE_TOUR_API_KEY}&
numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&contentTypeId=${typeId}&areaCode=${regionCode}`
  );
};

export const getPlaceDetails = (contentId, typeId) => {
  return TourInstance.get(
    `/detailIntro1?serviceKey=${
      import.meta.env.VITE_TOUR_API_KEY
    }&contentId=${contentId}&contentTypeId=${typeId}&MobileOS=ETC&MobileApp=AppTest&_type=json`
  );
};

export const getSearchPlace = (regionCode, keyword) => {
  return TourInstance.get(
    `/searchKeyword1?serviceKey=${import.meta.env.VITE_TOUR_API_KEY}&
numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=O&areaCode=${regionCode}&keyword=${keyword}`
  );
};
