import { instance } from "./instance";
import { TourInstance } from "./tourInstance";

export const postLogin = (data) => {
  return instance.post(`${import.meta.env.VITE_API_AUTH}/login`, data);
};

export const postSignup = (data) => {
  return instance.post(`${import.meta.env.VITE_API_AUTH}/signup`, data);
};

export const postLogout = () => {
  instance.post(`${import.meta.env.VITE_API_AUTH}/logout`).then((res) => {
    if (res.status === 200 && res.data === "로그아웃 완료")
      localStorage.clear();
    return location.replace("/");
  });
};

export const getUserInfo = () => {
  return instance.get(`${import.meta.env.VITE_API_USER}`);
};

export const patchUserInfo = (userId, data) => {
  return instance.patch(`${import.meta.env.VITE_API_USER}/${userId}`, data);
};

export const deleteUser = () => {
  instance.delete(`${import.meta.env.VITE_API_USER}`).then((res) => {
    if (res.status === 200 && res.data === "계정 삭제 완료")
      localStorage.clear();
    return location.replace("/");
  });
};

export const getPlan = (planId) => {
  return instance.get(`${import.meta.env.VITE_API_PLAN}/${planId}`);
};

export const postPlan = (data) => {
  return instance.post(`${import.meta.env.VITE_API_PLAN}`, data);
};

export const patchPlan = (planId, data) => {
  return instance.patch(`${import.meta.env.VITE_API_PLAN}/${planId}`, data);
};

export const deletePlan = (planId) => {
  instance.delete(`${import.meta.env.VITE_API_PLAN}/${planId}`).then(() => {
    return location.reload();
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
