import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@/styles/index.css";
import GlobalStyles from "@/styles/GlobalStyle";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyles />
    <App />
  </>
);
