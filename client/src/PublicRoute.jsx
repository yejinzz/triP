import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isLogin = localStorage.getItem("isLogin");

  return isLogin ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
