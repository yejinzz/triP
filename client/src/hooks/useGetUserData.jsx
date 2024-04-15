import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/slice/userSlice";
import { getUserInfo } from "../api/api";

const useGetUserData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfo().then((res) => {
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
  }, []);
};

export default useGetUserData;
