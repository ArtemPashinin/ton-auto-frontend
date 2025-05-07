// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { YMInitializer } from "react-yandex-metrika";
// import TelegramAnalytics from "@telegram-apps/analytics";
import App from "./App.tsx";
import TelegramProvider from "./core/provider.tsx";
import store from "./redux/store.ts";

import "./assets/styles/buttons.css";
import "./assets/styles/forms.css";
import "./index.css";

// TelegramAnalytics.init({
//   token:
//     "eyJhcHBfbmFtZSI6ImRyaXZpb19hcHAiLCJhcHBfdXJsIjoiaHR0cHM6Ly90Lm1lL2RyaXZpb19ib3QiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly9kcml2aW8uc3BhY2UvIn0=!XOUXpPyE3nDqS18Zv9nZJ1K4QAbQNr/JPc7XHZu4yAg=",
//   appName: "drivio_app",
// });
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
