import { Route, Routes } from "react-router-dom";
import Header from "@/components/common/header/Header";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { Suspense, lazy } from "react";
import { Loading } from "./components/common/Loding";

const MainPage = lazy(() => import("@/pages/MainPage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const MyPage = lazy(() => import("@/pages/MyPage"));
const PlanMapPage = lazy(() => import("@/pages/PlanMapPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const App = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        {/* <MobileNav /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/Login" element={<AuthPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/plan/" element={<PlanMapPage />} />
            <Route path="/plan/:id" element={<PlanMapPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route element={<NotFound />} path="*" />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
