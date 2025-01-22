import WebApp from "@twa-dev/sdk";
import axios from "axios";

export const updateMain = async (
  advertisementId?: string,
  newMainMediaId?: number
) => {
  const url = `${
    import.meta.env.VITE_APP_API_URL
  }/advertisements/${advertisementId}/files/${newMainMediaId}`;
  if (advertisementId && newMainMediaId) {
    try {
      await axios.put(url);
    } catch (err) {
      console.log(err);
      WebApp.showAlert("Error when deleting a photo, please try again later");
    }
  }
};
