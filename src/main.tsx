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
import TelegramAnalytics from "@telegram-apps/analytics";
import { YMInitializer } from "react-yandex-metrika";

TelegramAnalytics.init({
  token:
    "eyJhcHBfbmFtZSI6InRvbl9hdXRvX21pbmlfYXBwIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS90b25hdXRvYXBwX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL3RvbmF1dG8uYXBwLyJ9!gP4pzknZEFtcejLe5g3Mf3QlqNIfzfZT4qVenObix2w=",
  appName: "ton_auto_mini_app",
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <TelegramProvider>
    <Provider store={store}>
      <YMInitializer accounts={[99933604]} />
      <App />
    </Provider>
  </TelegramProvider>
  // </StrictMode>
);
