import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLogin = localStorage.getItem("isLogin");

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" {...alert("로그인이 필요합니다.")} />
  );
};

export default PrivateRoute;
