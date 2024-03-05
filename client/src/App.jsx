import { Route, Routes } from "react-router-dom";
import MainPage from "@/pages/MainPage";
import Header from "@/components/common/header/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
};

export default App;
