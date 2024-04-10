import axios from "axios";

export const TourInstance = axios.create({
  baseURL: "https://apis.data.go.kr/B551011/KorService1",
});
