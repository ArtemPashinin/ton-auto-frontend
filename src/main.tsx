import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/forms.css";
import "./styles/buttons.css";
import App from "./App";
import { MenuProvider } from "./components/Menu/MenuContext";
import WebApp from "@twa-dev/sdk";
WebApp.ready();
WebApp.disableVerticalSwipes();
WebApp.setBackgroundColor("secondary_bg_color");
WebApp.setHeaderColor("secondary_bg_color");
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MenuProvider>
      <App />
    </MenuProvider>
  </React.StrictMode>
);
