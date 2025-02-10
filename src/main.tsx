// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Provider } from "react-redux";
import "./assets/styles/forms.css";
import "./assets/styles/buttons.css";
import App from "./App.tsx";
import TelegramProvider from "./core/provider.tsx";
import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <TelegramProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </TelegramProvider>
  // </StrictMode>
);
