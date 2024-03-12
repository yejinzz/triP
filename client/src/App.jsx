import { Route, Routes } from "react-router-dom";
import Header from "@/components/common/header/Header";
import MainPage from "@/pages/MainPage";
import PlanMapPage from "@/pages/PlanMapPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/plan" element={<PlanMapPage />} />
      </Routes>
    </>
  );
};

export default App;
