import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@/styles/index.css";
import GlobalStyles from "@/styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
