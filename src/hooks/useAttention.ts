import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

export const useAttention = () => {
  useEffect(() => {
    WebApp.showPopup({
      title: "Attention!",
      message:
        "To avoid scams, do not make any advance payments for a vehicle in the mini-app. Only pay after personally inspecting the vehicle and confirming the deal with the seller.\n\nProtect your money and verify all information before making a payment!",
      buttons: [{ type: "default", text: "I understand" }],
    });
  }, []);
};
