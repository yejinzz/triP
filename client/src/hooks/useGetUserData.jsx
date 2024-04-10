import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { instance } from "../api/instance";
import { setUserInfo } from "../store/slice/userSlice";

const useGetUserData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    instance.get("/api/user").then((res) => {
      dispatch(
        setUserInfo({
          userId: res.data.userid,
          userName: res.data.username,
          thumbNail: res.data.thumbnail,
          email: res.data.email,
          createdAt: res.data.createdAt,
        })
      );
    });
  }, []); // dispatch 함수를 의존성 배열에 추가합니다.
};

export default useGetUserData;
