import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:4000",
  header: {
    // "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 cors 통신 설정
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers["authorization"] = accessToken;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      const newAccessToken = response?.headers?.authorization;
      localStorage.setItem("accessToken", newAccessToken);
      response.config.headers["authorization"] = newAccessToken;
    }
    return response;
    // return response;
  },
  (error) => {
    if (error.response.status === 403) {
      localStorage.clear();
      alert("토큰이 만료되었습니다.다시 로그인 해주세요!");
      location.replace("/login");
    }
    return Promise.reject(error);
  }
);
