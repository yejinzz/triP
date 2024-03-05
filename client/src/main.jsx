import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@/styles/index.css";
import GlobalStyles from "@/styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalStyles />
    <App />
  </BrowserRouter>
);
