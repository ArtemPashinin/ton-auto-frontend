import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { Media } from "../interfaces/vehicle-info.interface";

export const uploadOneMedia = async (
  file: File,
  order: number,
  advertisementId: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("data", JSON.stringify({ order }));

  const url = `${
    import.meta.env.VITE_APP_API_URL
  }/advertisements/${advertisementId}/files`;

  try {
    const { data } = await axios.post<Media>(url, formData);
    return data;
  } catch (err) {
    WebApp.showAlert("Error uploading image. Please try again.");
    throw err;
  }
};
