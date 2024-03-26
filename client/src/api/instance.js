import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:4000",
  header: {
    // "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 cors 통신 설정
});

export const TourInstance = axios.create({
  baseURL: "https://apis.data.go.kr/B551011/KorService1",
});
//  default instance;

instance.interceptors.request.use(
  async (config) => {
    // const access_token = await getStorage("token");
    // const accessToken = localStorage.getItem('token');
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
      // console.log(newAccessToken);
      // localStorage.setItem('token', newAccessToken);
      // 새로운 토큰을 로컬 스토리지에 저장하거나 다른 방법으로 관리
      localStorage.setItem("accessToken", newAccessToken);
      // instance.defaults.headers.common["authorization"] = newAccessToken;
      response.config.headers["authorization"] = newAccessToken;
    }
    return response;
    // return response;
  },
  (error) => {
    if (error.response.status === 403) {
      //   const headers = error.response.headers;
      //   const accessToken = headers.authorization;
      //   const refreshToken = headers.refresh;
      //   validateTokens(accessToken, refreshToken);
      //   const originalRequestConfig = error.config;
      //   const newAccess = localStorage.getItem("token");
      //   const newRefresh = localStorage.getItem("refresh");
      //   originalRequestConfig.headers["authorization"] = newAccess;
      //   originalRequestConfig.headers["refresh"] = newRefresh;
      localStorage.clear();
      alert("토큰이 만료되었습니다.다시 로그인 해주세요!");
      //   return axios(originalRequestConfig);
    }
    return Promise.reject(error);
  }
);

// restApi.interceptors.response.use(
//   async (response) => {
//     const { config } = response;
//     const originalRequest = config;

//     if (response?.data?.code == 40300) {
//       const refresh_token = await getStorage("refreshToken");
//       return await restApi
//         .get(`/account/token?refreshToken=${refresh_token}`)
//         .then(async (res) => {
//           if (res.data.message === "OK") {
//             setStorage("token", res.data.payload.access_token);
//             originalRequest.headers.Authorization = `${res.data.payload.access_token}`;
//             return axios(originalRequest);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }

//     return response;
//   },
//   async (error) => {
//     console.log(error, "^^***");
//     throw error;
//   }
// );
