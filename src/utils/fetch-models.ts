import axios from "axios";
import { Model } from "../interfaces/model.interface";

export const fetchModels = async (
  makeId?: number | string
): Promise<Model[]> => {
  const url = `${import.meta.env.VITE_APP_API_URL}/vehicle/models/${makeId}`;
  if (!makeId) {
    return [];
  }
  try {
    const response = await axios.get<Model[]>(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch models:", error);
  }
  return [];
};
