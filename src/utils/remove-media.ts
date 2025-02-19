import WebApp from "@twa-dev/sdk";
import axios from "axios";

export const removeFile = async (advertisementId?: string, fileId?: number) => {
  const url = `${
    import.meta.env.VITE_APP_API_URL
  }/advertisements/${advertisementId}/files/${fileId}`;
  if (advertisementId && fileId) {
    try {
      await axios.delete(url);
    } catch (err) {
      WebApp.showAlert("Error when deleting a photo, please try again later");
      throw err;
    }
  }
};
