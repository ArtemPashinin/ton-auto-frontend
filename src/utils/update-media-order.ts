import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { MediaOrderDto } from "../interfaces/dto/media-order";

export const updateMediaOrder = async (order?: MediaOrderDto[]) => {
  const url = `${import.meta.env.VITE_APP_API_URL}/advertisements/reorder`;
  if (order) {
    try {
      await axios.put(url, order);
    } catch (err) {
      WebApp.showAlert("Error when reorder a photo, please try again later");
      throw err;
    }
  }
};
